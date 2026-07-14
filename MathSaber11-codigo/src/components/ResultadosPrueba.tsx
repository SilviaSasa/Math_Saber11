import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, ArrowLeft, Send, FileSpreadsheet, FileText, Lock, Check } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { enviarResultadosASheets } from '@/services/googleSheets';

interface DetalleRespuesta {
  preguntaId: number;
  enunciado: string;
  opcionSeleccionada: number;
  respuestaCorrecta: number;
  esCorrecta: boolean;
  retroalimentacion: string;
  competencia: string;
  categoria: string;
}

interface ResultadosPruebaProps {
  nombreEstudiante: string;
  nombrePrueba: string;
  detalles: DetalleRespuesta[];
  pruebaCerrada?: boolean;
  mensajeEnviado?: boolean;
  onCerrar: () => void;
  onReiniciar: () => void;
}

const competenciaLabels: Record<string, string> = {
  interpretacion: 'Interpretación y Representación',
  formulacion: 'Formulación y Ejecución',
  argumentacion: 'Argumentación',
};

const categoriaLabels: Record<string, string> = {
  algebra: 'Álgebra',
  geometria: 'Geometría',
  estadistica: 'Estadística',
};

export default function ResultadosPrueba({
  nombreEstudiante,
  nombrePrueba,
  detalles,
  pruebaCerrada = false,
  mensajeEnviado = false,
  onCerrar,
  onReiniciar,
}: ResultadosPruebaProps) {
  const resultadosRef = useRef<HTMLDivElement>(null);
  const total = detalles.length;
  const correctas = detalles.filter((d) => d.esCorrecta).length;
  const incorrectas = total - correctas;
  const porcentaje = Math.round((correctas / total) * 100);

  // Análisis por competencia
  const porCompetencia = detalles.reduce((acc, d) => {
    if (!acc[d.competencia]) acc[d.competencia] = { total: 0, correctas: 0 };
    acc[d.competencia].total++;
    if (d.esCorrecta) acc[d.competencia].correctas++;
    return acc;
  }, {} as Record<string, { total: number; correctas: number }>);

  // Análisis por categoría
  const porCategoria = detalles.reduce((acc, d) => {
    if (!acc[d.categoria]) acc[d.categoria] = { total: 0, correctas: 0 };
    acc[d.categoria].total++;
    if (d.esCorrecta) acc[d.categoria].correctas++;
    return acc;
  }, {} as Record<string, { total: number; correctas: number }>);

  // Categorías débiles para recomendaciones
  const categoriasDebil = Object.entries(porCategoria)
    .filter(([, v]) => (v.correctas / v.total) < 0.6)
    .map(([k]) => k);

  const handleExportarExcel = () => {
    const wsData = [
      ['MathSaber 11 - Resultados de Prueba'],
      [],
      ['Estudiante:', nombreEstudiante],
      ['Prueba:', nombrePrueba],
      ['Fecha:', new Date().toLocaleDateString('es-CO')],
      [],
      ['Resumen General'],
      ['Total Preguntas', total],
      ['Correctas', correctas],
      ['Incorrectas', incorrectas],
      ['Porcentaje', `${porcentaje}%`],
      [],
      ['Resultados por Competencia'],
      ['Competencia', 'Correctas', 'Total', 'Porcentaje'],
      ...Object.entries(porCompetencia).map(([k, v]) => [
        competenciaLabels[k] || k,
        v.correctas,
        v.total,
        `${Math.round((v.correctas / v.total) * 100)}%`,
      ]),
      [],
      ['Resultados por Categoría'],
      ['Categoría', 'Correctas', 'Total', 'Porcentaje'],
      ...Object.entries(porCategoria).map(([k, v]) => [
        categoriaLabels[k] || k,
        v.correctas,
        v.total,
        `${Math.round((v.correctas / v.total) * 100)}%`,
      ]),
      [],
      ['Detalle por Pregunta'],
      ['#', 'Competencia', 'Categoría', 'Resultado', 'Enunciado'],
      ...detalles.map((d, i) => [
        i + 1,
        competenciaLabels[d.competencia] || d.competencia,
        categoriaLabels[d.categoria] || d.categoria,
        d.esCorrecta ? 'Correcta' : 'Incorrecta',
        d.enunciado.substring(0, 80) + '...',
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    XLSX.writeFile(wb, `MathSaber11_${nombrePrueba.replace(/\s+/g, '_')}_${nombreEstudiante.replace(/\s+/g, '_')}.xlsx`);
  };

  const handleExportarPDF = async () => {
    if (!resultadosRef.current) return;
    const canvas = await html2canvas(resultadosRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`MathSaber11_${nombrePrueba.replace(/\s+/g, '_')}_${nombreEstudiante.replace(/\s+/g, '_')}.pdf`);
  };

  const handleEnviarSheets = async () => {
    const resultado = {
      nombreEstudiante,
      pruebaId: nombrePrueba,
      pruebaNombre: nombrePrueba,
      totalPreguntas: total,
      correctas,
      incorrectas,
      porcentaje,
      fecha: new Date().toISOString(),
      detalles: detalles.map((d) => ({
        preguntaId: d.preguntaId,
        preguntaEnunciado: d.enunciado.substring(0, 100),
        respuestaEstudiante: `Opción ${String.fromCharCode(65 + d.opcionSeleccionada)}`,
        respuestaCorrecta: `Opción ${String.fromCharCode(65 + d.respuestaCorrecta)}`,
        esCorrecta: d.esCorrecta,
        competencia: d.competencia,
      })),
    };
    const result = await enviarResultadosASheets(resultado);
    alert(result.message);
  };

  return (
    <div className="space-y-6">
      {/* Mensaje de Enviado */}
      {mensajeEnviado && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-1">¡Resultados Enviados!</h3>
          <p className="text-emerald-700 text-sm">
            Tu prueba ha sido registrada exitosamente. A continuación puedes ver tus resultados detallados, 
            exportarlos y revisar las recomendaciones para mejorar.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Resultados de la Prueba</h2>
        <p className="text-gray-600">
          Estudiante: <strong>{nombreEstudiante}</strong> | Prueba: <strong>{nombrePrueba}</strong>
        </p>
        {pruebaCerrada && (
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">Prueba Cerrada — No se puede repetir</span>
          </div>
        )}
      </div>

      {/* Resumen General */}
      <div ref={resultadosRef} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{total}</p>
            <p className="text-sm text-blue-600">Total Preguntas</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{correctas}</p>
            <p className="text-sm text-green-600">Correctas</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-700">{incorrectas}</p>
            <p className="text-sm text-red-600">Incorrectas</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-purple-700">{porcentaje}%</p>
            <p className="text-sm text-purple-600">Acierto</p>
          </div>
        </div>

        {/* Por Competencia */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Desempeño por Competencia</h3>
          <div className="space-y-3">
            {Object.entries(porCompetencia).map(([comp, datos]) => {
              const pct = Math.round((datos.correctas / datos.total) * 100);
              return (
                <div key={comp} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      {competenciaLabels[comp] || comp}
                    </span>
                    <span className={`font-bold ${pct >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                      {datos.correctas}/{datos.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${pct >= 60 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recomendaciones */}
        {categoriasDebil.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Recomendaciones para Mejorar
            </h3>
            <p className="text-amber-700 mb-3">
              Basado en tus resultados, te sugerimos profundizar en las siguientes áreas:
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              {categoriasDebil.map((cat) => (
                <li key={cat}>
                  <strong>{categoriaLabels[cat] || cat}</strong>: Practica más ejercicios de esta
                  categoría para fortalecer tus habilidades.
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detalle por Pregunta */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Detalle por Pregunta</h3>
          <div className="space-y-3">
            {detalles.map((d, i) => (
              <div
                key={d.preguntaId}
                className={`rounded-lg p-4 border ${
                  d.esCorrecta ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {d.esCorrecta ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      Pregunta {i + 1}: {d.enunciado.substring(0, 120)}...
                    </p>
                    <div className="flex gap-2 mt-1 text-sm">
                      <span className="px-2 py-0.5 bg-gray-200 rounded text-gray-600">
                        {competenciaLabels[d.competencia] || d.competencia}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-200 rounded text-gray-600">
                        {categoriaLabels[d.categoria] || d.categoria}
                      </span>
                    </div>
                    {!d.esCorrecta && (
                      <p className="mt-2 text-sm text-gray-600 italic">
                        {d.retroalimentacion}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleExportarExcel} variant="outline" className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Exportar Excel
        </Button>
        <Button onClick={handleExportarPDF} variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Exportar PDF
        </Button>
        <Button onClick={handleEnviarSheets} className="gap-2 bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4" />
          Enviar a Sheets
        </Button>
        {!pruebaCerrada && (
          <Button onClick={onReiniciar} variant="secondary" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Intentar de Nuevo
          </Button>
        )}
        <Button onClick={onCerrar} variant="default" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <ArrowLeft className="h-4 w-4" />
          Volver al Menú
        </Button>
      </div>
    </div>
  );
}
