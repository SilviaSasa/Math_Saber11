import React from 'react';
import { Table } from 'lucide-react';

/**
 * Componente que renderiza enunciados matemáticos con soporte para:
 * - Tablas markdown (formato | col1 | col2 |)
 * - Fórmulas con exponentes (2⁰, 3², etc.)
 * - Pasos enumerados
 * - Texto normal con saltos de línea
 */
export default function EnunciadoMatematico({ enunciado }: { enunciado: string }) {
  const lineas = enunciado.split('\n');
  const elementos: React.ReactNode[] = [];
  let i = 0;
  let keyIndex = 0;

  const getKey = () => `em-${keyIndex++}`;

  while (i < lineas.length) {
    const linea = lineas[i];

    // Detectar inicio de tabla markdown
    if (linea.trim().startsWith('|')) {
      const tablaLineas: string[] = [];
      while (i < lineas.length && lineas[i].trim().startsWith('|')) {
        tablaLineas.push(lineas[i]);
        i++;
      }
      elementos.push(renderTabla(tablaLineas, getKey()));
      continue;
    }

    // Línea vacía → salto
    if (linea.trim() === '') {
      elementos.push(<div key={getKey()} className="h-2" />);
      i++;
      continue;
    }

    // Línea normal con formato matemático
    elementos.push(
      <p key={getKey()} className="text-gray-800 leading-relaxed mb-1">
        <FormatoMatematico texto={linea} />
      </p>
    );
    i++;
  }

  return <div className="enunciado-matematico">{elementos}</div>;
}

/** Renderiza una tabla markdown como HTML estilizado */
function renderTabla(lineas: string[], key: string): React.ReactNode {
  // Filtrar línea separadora (|---|)
  const filas = lineas.filter(l => !/^\s*\|[\s\-:|]+\|\s*$/.test(l));

  if (filas.length === 0) return null;

  // Parsear celdas
  const parsedRows = filas.map(linea =>
    linea
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(c => c.trim())
  );

  const headers = parsedRows[0];
  const dataRows = parsedRows.slice(1);

  return (
    <div key={key} className="my-4 overflow-x-auto -mx-1 px-1">
      <div className="inline-flex items-center gap-2 mb-2 text-xs text-gray-500">
        <Table className="h-3.5 w-3.5" />
        <span>Datos de la pregunta</span>
      </div>
      <table className="w-full min-w-[280px] border-collapse rounded-lg overflow-hidden shadow-sm border border-gray-200 text-xs sm:text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            {headers.map((h, idx) => (
              <th key={idx} className="px-2 sm:px-4 py-2 sm:py-2.5 text-left font-semibold border-r border-white/20 last:border-r-0 whitespace-nowrap">
                <FormatoMatematico texto={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ridx) => (
            <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'}>
              {row.map((cell, cidx) => (
                <td key={cidx} className="px-2 sm:px-4 py-2 sm:py-2.5 text-gray-700 border-r border-gray-100 last:border-r-0 border-t border-gray-100 whitespace-nowrap">
                  <FormatoMatematico texto={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Formatea texto matemático: exponentes, fracciones simples, etc. */
function FormatoMatematico({ texto }: { texto: string }) {
  if (!texto) return null;

  // Reemplazar exponentes unicode: ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁰
  const conSuperscripts = texto
    .replace(/\^\{?0\}?/g, '⁰')
    .replace(/\^\{?1\}?/g, '¹')
    .replace(/\^\{?2\}?/g, '²')
    .replace(/\^\{?3\}?/g, '³')
    .replace(/\^\{?4\}?/g, '⁴')
    .replace(/\^\{?5\}?/g, '⁵')
    .replace(/\^\{?6\}?/g, '⁶')
    .replace(/\^\{?7\}?/g, '⁷')
    .replace(/\^\{?8\}?/g, '⁸')
    .replace(/\^\{?9\}?/g, '⁹')
    .replace(/\^\{?x\}?/gi, 'ˣ')
    .replace(/\^\{?n\}?/gi, 'ⁿ')
    .replace(/x\^2/g, 'x²')
    .replace(/x\^3/g, 'x³');

  // Detectar y resaltar fórmulas tipo "Valor = ...", "Longitud = ..."
  const partes = conSuperscripts.split(/(Valor\s*=\s*[^\n]+|Longitud\s*=\s*[^\n]+|h\s*=\s*[^\n]+|3\²\s*×\s*3\⁴\s*÷\s*3\³)/g);

  if (partes.length <= 1) {
    return <span dangerouslySetInnerHTML={{ __html: aplicarFormatoInline(conSuperscripts) }} />;
  }

  return (
    <>
      {partes.map((parte, idx) => {
        if (parte.match(/^Valor\s*=|^Longitud\s*=|^h\s*=|3\²\s*×\s*3\⁴/)) {
          return (
            <span key={idx} className="inline-block bg-indigo-50 border border-indigo-200 rounded-md px-2 py-0.5 mx-0.5 font-mono text-sm font-semibold text-indigo-800">
              {parte}
            </span>
          );
        }
        return <span key={idx} dangerouslySetInnerHTML={{ __html: aplicarFormatoInline(parte) }} />;
      })}
    </>
  );
}

function aplicarFormatoInline(texto: string): string {
  return texto
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-indigo-700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<u>$1</u>')
    .replace(/\$([\d.,]+)/g, '<span class="font-semibold text-emerald-700">$$$1</span>');
}
