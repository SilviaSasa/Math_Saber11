import { useState } from 'react';
import { 
  Target, BookOpen, Lightbulb, CheckCircle, BarChart3, TrendingUp, 
  AlertTriangle, Award, ChevronDown, ChevronUp, FileText, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { competencias, categorias } from '@/data/questions';

const resultadosIED = {
  puntajes: [
    { año: 2022, global: 229, lectura: 49, matematicas: 45, sociales: 43, naturales: 46, ingles: 44 },
    { año: 2023, global: 229, lectura: 49, matematicas: 47, sociales: 42, naturales: 46, ingles: 45 },
    { año: 2024, global: 230, lectura: 49, matematicas: 48, sociales: 41, naturales: 46, ingles: 46 },
    { año: 2025, global: 220, lectura: 47, matematicas: 45, sociales: 40, naturales: 44, ingles: 45 },
  ],
  clasificacion: [
    { año: 2022, categoria: 'D', indice: 0.616 },
    { año: 2023, categoria: 'C', indice: 0.620 },
    { año: 2024, categoria: 'C', indice: 0.623 },
    { año: 2025, categoria: 'D', indice: 0.615 },
  ],
  desempeno2025: {
    matematicas: { nivel1: 10, nivel2: 30, nivel3: 48, nivel4: 12 },
    lectura: { nivel1: 5, nivel2: 35, nivel3: 58, nivel4: 2 },
  },
  priorizacionMatematicas: [
    { aprendizaje: 'Valida procedimientos y estrategias matemáticas utilizadas para dar solución a problemas', pri: '72%', prioridad: 1 },
    { aprendizaje: 'Comprende y transforma la información cuantitativa y esquemática presentada en distintos formatos', pri: '60%', prioridad: 2 },
    { aprendizaje: 'Frente a un problema que involucre información cuantitativa, plantea e implementa estrategias que lleven a soluciones adecuadas', pri: '49%', prioridad: 3 },
  ]
};

function CompetenciaCard({ data, index }: { data: typeof competencias.interpretacion; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colors = [
    { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    { bg: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    { bg: 'from-amber-500 to-amber-600', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  ];
  const c = colors[index];

  return (
    <Card className={`overflow-hidden border-2 ${c.border} hover:shadow-xl transition-all duration-300`}>
      <div className={`bg-gradient-to-r ${c.bg} p-3 sm:p-4 text-white`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
              {index === 0 && <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />}
              {index === 1 && <Target className="h-5 w-5 sm:h-6 sm:w-6" />}
              {index === 2 && <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base sm:text-lg truncate">{data.nombre}</h3>
              <p className="text-white/80 text-xs sm:text-sm">Competencia {index + 1} de 3</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-white hover:bg-white/20 flex-shrink-0 h-8 w-8 p-0"
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <CardContent className="p-4 sm:p-5">
        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">{data.descripcion}</p>
        
        {expanded && (
          <div className={`${c.light} rounded-xl p-3 sm:p-4 mt-3 animate-in fade-in duration-300`}>
            <h4 className={`font-semibold ${c.text} mb-3 flex items-center gap-2 text-sm sm:text-base`}>
              <CheckCircle className="h-4 w-4" />
              Evidencias que el estudiante debe mostrar:
            </h4>
            <ul className="space-y-2">
              {data.evidencias.map((ev, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${c.bg} flex-shrink-0`} />
                  {ev}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {!expanded && (
          <p className="text-xs sm:text-sm text-gray-500 italic">Haz clic para ver las evidencias de esta competencia</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DocenteTab() {
  const [showResultados, setShowResultados] = useState(false);

  return (
    <div className="space-y-8">
      {/* Introducción */}
      <section>
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Introducción</h2>
                <p className="text-gray-600">Marco de referencia de la prueba de matemáticas Saber 11.°</p>
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                La prueba de matemáticas del examen Saber 11.° evalúa la competencia matemática de los estudiantes 
                que están finalizando el grado undécimo. Esta competencia se define como 
                <strong> la relación entre el uso flexible y comprensivo del conocimiento matemático escolar y la diversidad de contextos</strong>, 
                de la vida diaria, de la matemática misma y de otras ciencias.
              </p>
              <p>
                El objetivo principal es determinar si el estudiante es matemáticamente competente, es decir, 
                si es capaz de emplear de manera flexible los contenidos matemáticos en situaciones diversas. 
                La prueba está alineada con los Estándares Básicos de Competencias del MEN y evalúa tres competencias específicas.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg my-4">
                <p className="text-indigo-800 font-medium mb-2">¿Qué se evalúa en la prueba?</p>
                <p className="text-indigo-700 text-sm">
                  La prueba evalúa el saber hacer en diferentes contextos, a través del uso del conocimiento 
                  matemático escolar. Las formas flexibles de proceder, asociadas al uso de los conceptos y 
                  estructuras matemáticas, son el centro de la evaluación.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competencias */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Las Tres Competencias Matemáticas</h2>
        </div>
        
        <div className="grid gap-6">
          {Object.entries(competencias).map(([key, data], index) => (
            <CompetenciaCard key={key} data={data} index={index} />
          ))}
        </div>
      </section>

      {/* Contenidos */}
      <section>
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-6 w-6" />
              Contenidos Evaluados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">
              Los conocimientos básicos se organizan en tres categorías que propician que el estudiante 
              evidencie el pensamiento matemático:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(categorias).map(([key, cat]) => (
                <div key={key} className={`${cat.color}/10 border-2 border-${cat.color.split('-')[1]}-200 rounded-xl p-5 text-center hover:shadow-lg transition-all`}>
                  <div className={`w-12 h-12 ${cat.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {key === 'estadistica' ? 'S' : key === 'geometria' ? 'G' : 'A'}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{cat.nombre}</h4>
                  <p className="text-sm text-gray-600">
                    {key === 'estadistica' && 'Pensamiento aleatorio: representación, lectura e interpretación de datos; medidas de tendencia central y dispersión.'}
                    {key === 'geometria' && 'Pensamiento geométrico: espacio, figuras, transformaciones, congruencia, semejanza y medidas.'}
                    {key === 'algebra' && 'Pensamientos numérico y variacional: números, operaciones, patrones, funciones y ecuaciones.'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resultados IED Los Rosales */}
      <section>
        <Button 
          onClick={() => setShowResultados(!showResultados)}
          variant="outline"
          className="w-full py-6 text-lg font-semibold border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
        >
          <BarChart3 className="h-5 w-5 mr-2" />
          {showResultados ? 'Ocultar' : 'Ver'} Resultados IED Los Rosales 2022-2025
          {showResultados ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
        </Button>
        
        {showResultados && (
          <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Puntajes Globales */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Puntaje Global y por Áreas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-semibold">Año</th>
                        <th className="p-3 text-center font-semibold">Global</th>
                        <th className="p-3 text-center font-semibold">Lectura</th>
                        <th className="p-3 text-center font-semibold text-blue-700 bg-blue-50">Matemáticas</th>
                        <th className="p-3 text-center font-semibold">Sociales</th>
                        <th className="p-3 text-center font-semibold">Naturales</th>
                        <th className="p-3 text-center font-semibold">Inglés</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultadosIED.puntajes.map((p, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{p.año}</td>
                          <td className="p-3 text-center font-bold">{p.global}</td>
                          <td className="p-3 text-center">{p.lectura}</td>
                          <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/50">{p.matematicas}</td>
                          <td className="p-3 text-center">{p.sociales}</td>
                          <td className="p-3 text-center">{p.naturales}</td>
                          <td className="p-3 text-center">{p.ingles}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Priorización */}
            <Card className="shadow-lg border-red-200">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Priorización de Aprendizajes — Matemáticas 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Según el análisis del ICFES, estos son los aprendizajes de matemáticas que requieren mayor atención 
                  en la IED Los Rosales (ordenados de mayor a menor porcentaje de respuestas incorrectas):
                </p>
                <div className="space-y-3">
                  {resultadosIED.priorizacionMatematicas.map((item, i) => (
                    <div key={i} className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${i === 0 ? 'bg-red-50 border-2 border-red-200' : i === 1 ? 'bg-orange-50 border-2 border-orange-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-sm sm:text-base ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                        {item.prioridad}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">{item.aprendizaje}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="destructive" className="text-[10px] sm:text-xs">
                            {item.pri} respuestas incorrectas
                          </Badge>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {i === 0 ? 'Alta prioridad' : i === 1 ? 'Media prioridad' : 'Prioridad moderada'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Clasificación */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Clasificación del Plantel
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {resultadosIED.clasificacion.map((c, i) => (
                    <div key={i} className={`text-center p-4 rounded-xl border-2 ${c.categoria <= 'C' ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                      <p className="text-2xl font-bold text-gray-800">{c.año}</p>
                      <div className={`w-12 h-12 rounded-full mx-auto my-2 flex items-center justify-center text-white font-bold text-lg ${c.categoria <= 'C' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {c.categoria}
                      </div>
                      <p className="text-sm text-gray-600">Índice: {c.indice}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Niveles de Desempeño */}
      <section>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Niveles de Desempeño en Matemáticas (2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { nivel: 'Nivel 4 (Sobresaliente)', desc: 'Resuelve problemas y justifica afirmaciones que requieren conceptos de probabilidad, propiedades algebraicas y funciones.', pct: resultadosIED.desempeno2025.matematicas.nivel4, color: 'bg-emerald-500' },
                { nivel: 'Nivel 3 (Adecuado)', desc: 'Selecciona información, señala errores y hace transformaciones aritméticas y algebraicas sencillas.', pct: resultadosIED.desempeno2025.matematicas.nivel3, color: 'bg-blue-500' },
                { nivel: 'Nivel 2 (Mínimo)', desc: 'Compara y establece relaciones entre datos presentados en contextos familiares.', pct: resultadosIED.desempeno2025.matematicas.nivel2, color: 'bg-yellow-500' },
                { nivel: 'Nivel 1 (Insuficiente)', desc: 'Puede leer información puntual pero tiene dificultades al comparar conjuntos de datos.', pct: resultadosIED.desempeno2025.matematicas.nivel1, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <div className="w-full sm:w-32 md:w-48 text-sm font-medium text-gray-700 shrink-0">
                    <span className="sm:hidden text-xs text-gray-500 block mb-0.5">{item.desc}</span>
                    {item.nivel}
                  </div>
                  <div className="flex-1 w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-1000`}
                      style={{ width: `${item.pct}%` }}
                    >
                      {item.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
