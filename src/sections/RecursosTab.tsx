import { useState } from 'react';
import {
  Video, BookOpen, ExternalLink, Calculator, Brain,
  TrendingUp, FileText, Headphones, Award, Lightbulb,
  ChevronRight, Youtube, Globe, Library, Target, FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MiMaterialSection from './MiMaterialSection';

/* ═══════════════════════════════════════════
   DATA ESTATICA: Videos, Docs, Enlaces
   ═══════════════════════════════════════════ */
const recursosVideos = [
  { titulo: 'Competencia: Interpretación y Representación', descripcion: 'Aprende a interpretar tablas, gráficas y diagramas.', categoria: 'Interpretación', duracion: '15 min', tipo: 'Explicación', url: 'https://www.youtube.com/results?search_query=saber+11+matematicas+interpretacion+representacion+icfes' },
  { titulo: 'Competencia: Formulación y Ejecución', descripcion: 'Estrategias para plantear y resolver problemas matemáticos.', categoria: 'Formulación', duracion: '18 min', tipo: 'Ejercicios', url: 'https://www.youtube.com/results?search_query=saber+11+matematicas+formulacion+ejecucion+icfes' },
  { titulo: 'Competencia: Argumentación', descripcion: 'Validar y refutar procedimientos y soluciones matemáticas.', categoria: 'Argumentación', duracion: '12 min', tipo: 'Explicación', url: 'https://www.youtube.com/results?search_query=saber+11+matematicas+argumentacion+icfes' },
  { titulo: 'Estadística para el Saber 11', descripcion: 'Medidas de tendencia central, probabilidad e interpretación de datos.', categoria: 'Estadística', duracion: '25 min', tipo: 'Repaso', url: 'https://www.youtube.com/results?search_query=estadistica+saber+11+icfes+prueba' },
  { titulo: 'Geometría y Coordenadas', descripcion: 'Pitágoras, semejanza, congruencia, áreas, volúmenes.', categoria: 'Geometría', duracion: '22 min', tipo: 'Repaso', url: 'https://www.youtube.com/results?search_query=geometria+saber+11+icfes+pitagoras+areas' },
  { titulo: 'Álgebra y Funciones', descripcion: 'Ecuaciones, funciones lineales, cuadráticas, exponenciales.', categoria: 'Álgebra', duracion: '30 min', tipo: 'Repaso', url: 'https://www.youtube.com/results?search_query=algebra+funciones+saber+11+icfes+ecuaciones' }
];

const recursosDocumentos = [
  { titulo: 'Marco de Referencia Matemáticas Saber 11', descripcion: 'Documento oficial del ICFES con la estructura completa de la prueba.', tipo: 'PDF Oficial', icono: <FileText className="h-5 w-5" />, url: 'https://www.icfes.gov.co/pruebas/saber-11' },
  { titulo: 'Guía de Orientación Saber 11', descripcion: 'Guía completa para la presentación del examen con consejos.', tipo: 'Guía', icono: <BookOpen className="h-5 w-5" />, url: 'https://www.icfes.gov.co/guias-orientacion' },
  { titulo: 'Banco de Preguntas ICFES', descripcion: 'Accede al banco de preguntas oficiales del ICFES.', tipo: 'Práctica', icono: <Calculator className="h-5 w-5" />, url: 'https://www.icfes.gov.co/banco-preguntas' },
  { titulo: 'Resultados por Institución', descripcion: 'Consulta los resultados históricos de tu institución.', tipo: 'Consulta', icono: <TrendingUp className="h-5 w-5" />, url: 'https://www.icfes.gov.co/resultados' }
];

const enlacesUtiles = [
  { titulo: 'ICFES - Portal Oficial', url: 'https://www.icfes.gov.co', descripcion: 'Instituto Colombiano para la Evaluación de la Educación.', icono: <Globe className="h-5 w-5 text-blue-600" /> },
  { titulo: 'MEN - Estándares de Competencias', url: 'https://www.mineducacion.gov.co', descripcion: 'Estándares Básicos de Competencias del Ministerio.', icono: <Library className="h-5 w-5 text-green-600" /> },
  { titulo: 'Simulacros en Línea', url: 'https://www.icfes.gov.co/simulacros', descripcion: 'Simulacros oficiales del examen Saber 11 en línea.', icono: <Award className="h-5 w-5 text-amber-600" /> },
  { titulo: 'Khan Academy - Matemáticas', url: 'https://es.khanacademy.org/math', descripcion: 'Cursos gratuitos de matemáticas.', icono: <Lightbulb className="h-5 w-5 text-purple-600" /> }
];

const consejosPractica = [
  { titulo: 'Lee cuidadosamente el enunciado', descripcion: 'Identifica los datos proporcionados y lo que te piden.', icono: <BookOpen className="h-6 w-6 text-blue-600" /> },
  { titulo: 'Identifica la competencia', descripcion: 'Reconoce si evalúa interpretación, formulación o argumentación.', icono: <Brain className="h-6 w-6 text-purple-600" /> },
  { titulo: 'Verifica tus respuestas', descripcion: 'Revisa si tu respuesta tiene sentido en el contexto.', icono: <Calculator className="h-6 w-6 text-emerald-600" /> },
  { titulo: 'Practica con tiempo', descripcion: 'Simula condiciones del examen con límite de tiempo.', icono: <Headphones className="h-6 w-6 text-amber-600" /> }
];

/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════ */
export default function RecursosTab() {
  const [subtab, setSubtab] = useState<'mimaterial' | 'videos' | 'documentos' | 'enlaces' | 'consejos'>('mimaterial');

  const subtabs = [
    { id: 'mimaterial' as const, label: 'Mi Material', icon: <FolderOpen className="h-4 w-4" /> },
    { id: 'videos' as const, label: 'Videos ICFES', icon: <Video className="h-4 w-4" /> },
    { id: 'documentos' as const, label: 'Documentos Oficiales', icon: <FileText className="h-4 w-4" /> },
    { id: 'enlaces' as const, label: 'Enlaces Útiles', icon: <Globe className="h-4 w-4" /> },
    { id: 'consejos' as const, label: 'Consejos', icon: <Lightbulb className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header principal */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Library className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recursos de Matemáticas</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Explora videos, documentos, enlaces y el material que la docente <strong>Silvia Salas Salas</strong> va subiendo 
                paulatinamente organizado por tema de matemáticas del ICFES.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-tabs de Recursos */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-white p-2 rounded-xl shadow-md">
        {subtabs.map((s) => (
          <Button
            key={s.id}
            variant={subtab === s.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSubtab(s.id)}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 ${
              subtab === s.id
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s.icon}
            <span className="font-medium text-xs sm:text-sm">{s.label}</span>
          </Button>
        ))}
      </div>

      {/* Contenido según subtab */}
      {subtab === 'mimaterial' && <MiMaterialSection />}
      {subtab === 'videos' && <VideosSection />}
      {subtab === 'documentos' && <DocumentosSection />}
      {subtab === 'enlaces' && <EnlacesSection />}
      {subtab === 'consejos' && <ConsejosSection />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECCIONES EXISTENTES
   ═══════════════════════════════════════════ */
function VideosSection() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-lg"><Video className="h-5 w-5 text-white" /></div>
        <h2 className="text-xl font-bold text-gray-900">Videos Explicativos de Matemáticas</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recursosVideos.map((video, i) => (
          <Card key={i} className="shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">{video.tipo}</Badge>
                <span className="text-sm text-white/80">{video.duracion}</span>
              </div>
              <h3 className="font-bold text-sm leading-tight">{video.titulo}</h3>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">{video.descripcion}</p>
              <Badge variant="outline" className="mb-3 text-xs">{video.categoria}</Badge>
              <Button variant="outline" size="sm" className="w-full group-hover:bg-red-50 group-hover:border-red-300 transition-all"
                onClick={() => window.open(video.url, '_blank')}>
                <Youtube className="h-4 w-4 mr-2 text-red-600" />
                Ver en YouTube
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function DocumentosSection() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg"><FileText className="h-5 w-5 text-white" /></div>
        <h2 className="text-xl font-bold text-gray-900">Documentos Oficiales ICFES</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {recursosDocumentos.map((doc, i) => (
          <Card key={i} className="shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600">{doc.icono}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{doc.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3">{doc.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{doc.tipo}</Badge>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => window.open(doc.url, '_blank')}>
                      Ver documento
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EnlacesSection() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
        <h2 className="text-xl font-bold text-gray-900">Enlaces Útiles</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {enlacesUtiles.map((enlace, i) => (
          <Card key={i} className="shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => window.open(enlace.url, '_blank')}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  {enlace.icono}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{enlace.titulo}</h3>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{enlace.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-2 truncate">{enlace.url}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ConsejosSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg"><Lightbulb className="h-5 w-5 text-white" /></div>
        <h2 className="text-xl font-bold text-gray-900">Consejos para la Prueba de Matemáticas</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {consejosPractica.map((consejo, i) => (
          <Card key={i} className="shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-t-amber-400">
            <CardContent className="p-5 text-center">
              <div className="bg-amber-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                {consejo.icono}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{consejo.titulo}</h3>
              <p className="text-sm text-gray-600">{consejo.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-xl bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"><Award className="h-6 w-6 text-yellow-300" />Estrategias por Competencia</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3"><BookOpen className="h-5 w-5 text-blue-300" /><h3 className="font-bold">Interpretación</h3></div>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Lee gráficas y tablas de abajo hacia arriba</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Identifica ejes, escalas y unidades</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Compara datos antes de responder</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3"><Target className="h-5 w-5 text-emerald-300" /><h3 className="font-bold">Formulación</h3></div>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Identifica qué te piden encontrar</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Selecciona la operación adecuada</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Verifica que tu respuesta sea lógica</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3"><Lightbulb className="h-5 w-5 text-amber-300" /><h3 className="font-bold">Argumentación</h3></div>
              <ul className="space-y-2 text-sm text-amber-100">
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Analiza cada procedimiento paso a paso</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Busca errores en las operaciones</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />Justifica por qué una solución es válida</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
