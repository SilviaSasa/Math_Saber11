import React from 'react';

interface Segmento {
  label: string;
  porcentaje: number;
  color: string;
}

const segmentos: Segmento[] = [
  { label: 'Candidato A', porcentaje: 35, color: '#3b82f6' },   // blue-500
  { label: 'Candidato B', porcentaje: 25, color: '#10b981' },   // emerald-500
  { label: 'Candidato C', porcentaje: 20, color: '#f59e0b' },  // amber-500
  { label: 'Indecisos', porcentaje: 20, color: '#9ca3af' },     // gray-400
];

export default function GraficoCircular() {
  const cx = 100;
  const cy = 85;
  const radius = 70;
  let anguloAcumulado = -90; // Empezar desde arriba (12 en punto)

  const paths: React.ReactNode[] = [];
  const leyendas: React.ReactNode[] = [];

  segmentos.forEach((seg, i) => {
    const angulo = (seg.porcentaje / 100) * 360;
    const inicioRad = (anguloAcumulado * Math.PI) / 180;
    const finRad = ((anguloAcumulado + angulo) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(inicioRad);
    const y1 = cy + radius * Math.sin(inicioRad);
    const x2 = cx + radius * Math.cos(finRad);
    const y2 = cy + radius * Math.sin(finRad);

    const largeArc = angulo > 180 ? 1 : 0;
    const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Etiqueta en el centro del segmento
    const midAngle = anguloAcumulado + angulo / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelRadius = radius * 0.65;
    const lx = cx + labelRadius * Math.cos(midRad);
    const ly = cy + labelRadius * Math.sin(midRad);

    paths.push(
      <path
        key={`seg-${i}`}
        d={pathD}
        fill={seg.color}
        stroke="#ffffff"
        strokeWidth={2}
        className="drop-shadow-sm"
      />
    );

    paths.push(
      <text
        key={`txt-${i}`}
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize="13"
        fontWeight="bold"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)', pointerEvents: 'none' }}
      >
        {seg.porcentaje}%
      </text>
    );

    // Leyenda
    leyendas.push(
      <div key={`ley-${i}`} className="flex items-center gap-2 text-sm">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
        <span className="text-gray-700">
          {seg.label}: <strong>{seg.porcentaje}%</strong>
        </span>
      </div>
    );

    anguloAcumulado += angulo;
  });

  return (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-500">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
        </svg>
        <span className="font-medium">Gráfico circular: Intención de voto para alcalde</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <svg
          viewBox="0 0 200 180"
          className="w-48 h-44 sm:w-56 sm:h-52 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths}
        </svg>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {leyendas}
        </div>
      </div>
    </div>
  );
}
