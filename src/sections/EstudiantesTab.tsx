import { useState, Fragment } from 'react';
import {
  Play, CheckCircle, XCircle, RotateCcw, GraduationCap, User, Users,
  BookOpen, Target, Lightbulb, Award, ArrowLeft, Clock, BarChart3, TrendingUp, FileText,
  ClipboardList, Lock
} from 'lucide-react';
import ResultadosPrueba from '@/components/ResultadosPrueba';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { questions, competencias, categorias, mezclarPreguntas } from '@/data/questions';
import type { Question, PreguntaMezclada } from '@/data/questions';
import EnunciadoMatematico from '@/components/EnunciadoMatematico';
import GraficoCircular from '@/components/GraficoCircular';

/* ═══════════════════════════════════════════
   DEFINICION DE PRUEBAS
   ═══════════════════════════════════════════ */
const interpretacionQs = questions.filter(q => q.competencia === 'interpretacion');
const formulacionQs = questions.filter(q => q.competencia === 'formulacion');
const argumentacionQs = questions.filter(q => q.competencia === 'argumentacion');

/* Simulacro 1: preguntas nuevas */
const simulacro1Ids = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
  210, 211, 212, 213, 214, 215, 216, 217, 218, 219
];
const simulacro1Qs = questions.filter(q => simulacro1Ids.includes(q.id));

/* Simulacro 2: 26 preguntas de la Segunda Sesión ICFES */
const simulacro2Ids = [
  220, 221, 222, 223, 224, 225, 226, 227, 228, 229,
  230, 231, 232, 233, 234, 235, 236, 237
];
const simulacro2Qs = questions.filter(q => simulacro2Ids.includes(q.id));

interface Prueba {
  id: string;
  nombre: string;
  competencia: string;
  descripcion: string;
  preguntas: Question[];
  color: string;
  colorBg: string;
  icono: React.ReactNode;
}

const pruebas: Prueba[] = [
  {
    id: 'prueba-1',
    nombre: 'Prueba 1: Interpretación y Representación',
    competencia: 'interpretacion',
    descripcion: 'Preguntas sobre comprensión y transformación de información en diferentes formatos.',
    preguntas: interpretacionQs.slice(0, 15),
    color: 'from-blue-600 to-blue-700',
    colorBg: 'bg-blue-50 border-blue-200',
    icono: <BookOpen className="h-6 w-6" />
  },
  {
    id: 'prueba-2',
    nombre: 'Prueba 2: Interpretación Avanzada',
    competencia: 'interpretacion',
    descripcion: 'Preguntas para profundizar en Interpretación y Representación.',
    preguntas: interpretacionQs.filter(q => [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].includes(q.id)),
    color: 'from-sky-600 to-sky-700',
    colorBg: 'bg-sky-50 border-sky-200',
    icono: <BookOpen className="h-6 w-6" />
  },
  {
    id: 'prueba-3',
    nombre: 'Prueba 3: Formulación y Ejecución',
    competencia: 'formulacion',
    descripcion: 'Preguntas sobre planteamiento y resolución de problemas matemáticos.',
    preguntas: formulacionQs.filter(q => [10, 21, 12, 20, 7, 4, 60, 61, 62, 65].includes(q.id)),
    color: 'from-emerald-600 to-emerald-700',
    colorBg: 'bg-emerald-50 border-emerald-200',
    icono: <Target className="h-6 w-6" />
  },
  {
    id: 'prueba-4',
    nombre: 'Prueba 4: Formulación Avanzada',
    competencia: 'formulacion',
    descripcion: 'Preguntas adicionales sobre estrategias de solución y ejecución de problemas.',
    preguntas: formulacionQs.filter(q => [49, 50, 51, 53, 54, 55, 56, 57, 58, 59, 63, 64].includes(q.id)),
    color: 'from-teal-600 to-teal-700',
    colorBg: 'bg-teal-50 border-teal-200',
    icono: <Target className="h-6 w-6" />
  },
  {
    id: 'prueba-5',
    nombre: 'Prueba 5: Argumentación',
    competencia: 'argumentacion',
    descripcion: 'Preguntas sobre validación de procedimientos y estrategias.',
    preguntas: argumentacionQs.filter(q => [5, 9, 66, 67, 68, 69, 70, 71, 72, 73].includes(q.id)),
    color: 'from-amber-600 to-amber-700',
    colorBg: 'bg-amber-50 border-amber-200',
    icono: <Lightbulb className="h-6 w-6" />
  },
  {
    id: 'prueba-6',
    nombre: 'Prueba 6: Argumentación Avanzada',
    competencia: 'argumentacion',
    descripcion: 'Preguntas sobre justificación y validez de soluciones matemáticas.',
    preguntas: argumentacionQs.filter(q => [14, 17].includes(q.id)),
    color: 'from-orange-600 to-orange-700',
    colorBg: 'bg-orange-50 border-orange-200',
    icono: <Lightbulb className="h-6 w-6" />
  }
].filter(p => p.preguntas.length > 0);

type Pantalla = 'registro' | 'menu' | 'prueba' | 'resultado' | 'simulacro';

interface ResultadoPrueba {
  pruebaId: string;
  respuestas: Record<number, number>;
  correctas: number;
  total: number;
  porcentaje: number;
  tiempoInicio: number;
  tiempoFin: number;
}

/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════ */
export default function EstudiantesTab() {
  const [pantalla, setPantalla] = useState<Pantalla>('registro');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [curso, setCurso] = useState('');
  const [pruebaActual, setPruebaActual] = useState<Prueba | null>(null);
  const [preguntasActivas, setPreguntasActivas] = useState<PreguntaMezclada[]>([]);
  const [respuestasActuales, setRespuestasActuales] = useState<Record<number, number>>({});
  const [mostrarRetro, setMostrarRetro] = useState<Record<number, boolean>>({});
  const [resultados, setResultados] = useState<Record<string, ResultadoPrueba>>({});
  const [pruebasCerradas, setPruebasCerradas] = useState<Record<string, boolean>>({});
  const [detallesPorPrueba, setDetallesPorPrueba] = useState<Record<string, any[]>>({});
  const [tiempoInicio, setTiempoInicio] = useState<number>(0);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleRegistro = () => {
    if (nombreEstudiante.trim() && curso) setPantalla('menu');
  };

  const iniciarPrueba = (prueba: Prueba) => {
    const mezcladas = mezclarPreguntas(prueba.preguntas);
    setPreguntasActivas(mezcladas);
    setPruebaActual(prueba);
    setRespuestasActuales({});
    setMostrarRetro({});
    setTiempoInicio(Date.now());
    setPantalla('prueba');
  };

  const iniciarSimulacro = (numero: 1 | 2 = 1) => {
    const simulacroPrueba: Prueba = numero === 1 ? {
      id: 'simulacro-1',
      nombre: 'Simulacro 1: Prueba ICFES Completa',
      competencia: 'mixta',
      descripcion: '35 preguntas de Interpretación, Formulación y Argumentación.',
      preguntas: simulacro1Qs,
      color: 'from-rose-600 to-pink-700',
      colorBg: 'bg-rose-50 border-rose-200',
      icono: <ClipboardList className="h-6 w-6" />
    } : {
      id: 'simulacro-2',
      nombre: 'Simulacro 2: Segunda Sesión ICFES',
      competencia: 'mixta',
      descripcion: 'Preguntas de matemáticas para practicar las competencias del ICFES Saber 11.',
      preguntas: simulacro2Qs,
      color: 'from-violet-600 to-purple-700',
      colorBg: 'bg-violet-50 border-violet-200',
      icono: <ClipboardList className="h-6 w-6" />
    };
    iniciarPrueba(simulacroPrueba);
  };

  const handleRespuesta = (questionId: number, opcionIndex: number) => {
    if (mostrarRetro[questionId]) return;
    setRespuestasActuales(prev => ({ ...prev, [questionId]: opcionIndex }));
  };

  const verificarRespuesta = (questionId: number) => {
    setMostrarRetro(prev => ({ ...prev, [questionId]: true }));
  };

  const finalizarPrueba = () => {
    if (!pruebaActual) return;
    const todasRetro: Record<number, boolean> = {};
    preguntasActivas.forEach(q => { todasRetro[q.id] = true; });
    setMostrarRetro(todasRetro);
    const correctas = preguntasActivas.filter(q => respuestasActuales[q.id] === q.respuestaCorrecta).length;
    const total = preguntasActivas.length;
    const porcentaje = total > 0 ? Math.round((correctas / total) * 100) : 0;
    
    // Preparar detalles para ResultadosPrueba
    const detalles = preguntasActivas.map(q => ({
      preguntaId: q.id,
      enunciado: q.enunciado.substring(0, 150),
      opcionSeleccionada: respuestasActuales[q.id] ?? -1,
      respuestaCorrecta: q.respuestaCorrecta,
      esCorrecta: respuestasActuales[q.id] === q.respuestaCorrecta,
      retroalimentacion: q.retroalimentacion.substring(0, 200),
      competencia: q.competencia,
      categoria: q.categoria,
    }));
    setDetallesPorPrueba(prev => ({ ...prev, [pruebaActual.id]: detalles }));
    
    setResultados(prev => ({
      ...prev,
      [pruebaActual.id]: { pruebaId: pruebaActual.id, respuestas: { ...respuestasActuales }, correctas, total, porcentaje, tiempoInicio, tiempoFin: Date.now() }
    }));
    setPruebasCerradas(prev => ({ ...prev, [pruebaActual.id]: true }));
    setMensajeEnviado(true);
    setPantalla('resultado');
  };

  const reiniciarTodo = () => {
    setRespuestasActuales({});
    setMostrarRetro({});
    setResultados({});
    setPreguntasActivas([]);
    setPruebaActual(null);
  };

  const volverMenu = () => {
    setPruebaActual(null);
    setPreguntasActivas([]);
    setRespuestasActuales({});
    setMostrarRetro({});
    setMensajeEnviado(false);
    setPantalla('menu');
  };

  const verResultadosPrueba = (prueba: Prueba) => {
    setPruebaActual(prueba);
    setPantalla('resultado');
  };

  /* ═══════════════════════════════════════════
     PANTALLA DE REGISTRO
     ═══════════════════════════════════════════ */
  if (pantalla === 'registro') {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-8 text-white text-center">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Bienvenido, Estudiante</h2>
            <p className="text-blue-100">Ingresa tus datos para comenzar a practicar</p>
          </div>
          <CardContent className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-600" />Tu nombre completo
              </label>
              <Input placeholder="Ej: Juan Pérez García" value={nombreEstudiante} onChange={e => setNombreEstudiante(e.target.value)} className="h-12 text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />Selecciona tu curso
              </label>
              <Select value={curso} onValueChange={setCurso}>
                <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Elige tu curso..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="11A">Grado 11° A</SelectItem>
                  <SelectItem value="11B">Grado 11° B</SelectItem>
                  <SelectItem value="11C">Grado 11° C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleRegistro} disabled={!nombreEstudiante.trim() || !curso} className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600">
              <Play className="h-5 w-5 mr-2" />Comenzar a Practicar
            </Button>
            <p className="text-center text-sm text-gray-500">Docente: Silvia Salas Salas — IED Los Rosales</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     PANTALLA DE MENU
     ═══════════════════════════════════════════ */
  if (pantalla === 'menu') {
    const pruebasCompletadas = Object.keys(resultados).length;
    const totalCorrectas = Object.values(resultados).reduce((s, r) => s + r.correctas, 0);
    const totalRespondidas = Object.values(resultados).reduce((s, r) => s + r.total, 0);
    const promedioGeneral = totalRespondidas > 0 ? Math.round((totalCorrectas / totalRespondidas) * 100) : 0;

    return (
      <div className="space-y-6">
        <Card className="shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-indigo-600 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">{nombreEstudiante.charAt(0).toUpperCase()}</div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate">{nombreEstudiante}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 text-xs">Grado {curso}</Badge>
                    <span className="text-xs text-gray-500">{pruebasCompletadas} de {pruebas.length} pruebas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {pruebasCompletadas > 0 && (
                  <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow-sm flex-1 sm:flex-initial">
                    <BarChart3 className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500">Promedio general</p>
                      <p className={`text-lg sm:text-xl font-bold ${promedioGeneral >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{promedioGeneral}%</p>
                    </div>
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => { setPantalla('registro'); setNombreEstudiante(''); setCurso(''); reiniciarTodo(); }} className="flex-shrink-0">
                  <RotateCcw className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Cambiar usuario</span><span className="sm:hidden">Salir</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SIMULACROS */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2"><ClipboardList className="h-6 w-6 text-violet-600" />Simulacros ICFES</h2>
          <p className="text-gray-600 mb-5 text-sm">Pruebas completas tipo Saber 11. Docente: Silvia Salas Salas</p>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Simulacro 1 */}
            <Card className={`shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${pruebasCerradas['simulacro-1'] ? 'border-gray-300 bg-gray-50' : 'border-rose-200 hover:border-rose-400'}`}>
              <div className={`bg-gradient-to-r ${pruebasCerradas['simulacro-1'] ? 'from-gray-500 to-gray-600' : 'from-rose-600 to-pink-700'} p-5 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-white/20 p-2 rounded-lg"><ClipboardList className="h-6 w-6" /></div>
                  {pruebasCerradas['simulacro-1'] ? (
                    <Badge className="bg-white/30 text-white border-0"><Lock className="h-3 w-3 mr-1" />Enviado</Badge>
                  ) : resultados['simulacro-1'] ? (
                    <Badge className="bg-white/30 text-white border-0"><CheckCircle className="h-3 w-3 mr-1" />Completado</Badge>
                  ) : null}
                </div>
                <h3 className="font-bold text-lg">Simulacro 1</h3>
                <p className={`text-sm ${pruebasCerradas['simulacro-1'] ? 'text-gray-200' : 'text-rose-100'}`}>Prueba ICFES en construcción</p>
              </div>
              <CardContent className="p-5">
                <p className="text-sm text-gray-600 mb-4">Preguntas de matemáticas para practicar las competencias del ICFES Saber 11.</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
                  <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><BookOpen className="h-3 w-3" />{simulacro1Qs.length} preguntas</Badge>
                  <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><Clock className="h-3 w-3" />~60 min</Badge>
                </div>
                {pruebasCerradas['simulacro-1'] ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${resultados['simulacro-1']?.porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Resultado:</span>
                        <p className={`font-bold text-lg ${resultados['simulacro-1']?.porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{resultados['simulacro-1']?.porcentaje ?? 0}%</p>
                      </div>
                      <Progress value={resultados['simulacro-1']?.porcentaje ?? 0} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">{resultados['simulacro-1']?.correctas ?? 0} correctas de {resultados['simulacro-1']?.total ?? 0}</p>
                    </div>
                    <Button onClick={() => verResultadosPrueba({ id: 'simulacro-1', nombre: 'Simulacro 1: Prueba ICFES Completa', competencia: 'mixta', descripcion: '', preguntas: simulacro1Qs, color: 'from-rose-600 to-pink-700', colorBg: '', icono: null })} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-xs sm:text-sm">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Ver Resultados
                    </Button>
                  </div>
                ) : resultados['simulacro-1'] ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${resultados['simulacro-1'].porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Resultado:</span>
                        <p className={`font-bold text-lg ${resultados['simulacro-1'].porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{resultados['simulacro-1'].porcentaje}%</p>
                      </div>
                      <Progress value={resultados['simulacro-1'].porcentaje} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">{resultados['simulacro-1'].correctas} correctas de {resultados['simulacro-1'].total}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={() => iniciarSimulacro()} variant="outline" className="flex-1 text-xs sm:text-sm"><RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Reintentar</Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => iniciarSimulacro()} className="w-full bg-gradient-to-r from-rose-600 to-pink-700 hover:opacity-90 text-xs sm:text-sm">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />Iniciar Simulacro
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Simulacro 2 */}
            <Card className={`shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${pruebasCerradas['simulacro-2'] ? 'border-gray-300 bg-gray-50' : 'border-violet-200 hover:border-violet-400'}`}>
              <div className={`bg-gradient-to-r ${pruebasCerradas['simulacro-2'] ? 'from-gray-500 to-gray-600' : 'from-violet-600 to-purple-700'} p-5 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-white/20 p-2 rounded-lg"><ClipboardList className="h-6 w-6" /></div>
                  {pruebasCerradas['simulacro-2'] ? (
                    <Badge className="bg-white/30 text-white border-0"><Lock className="h-3 w-3 mr-1" />Enviado</Badge>
                  ) : resultados['simulacro-2'] ? (
                    <Badge className="bg-white/30 text-white border-0"><CheckCircle className="h-3 w-3 mr-1" />Completado</Badge>
                  ) : null}
                </div>
                <h3 className="font-bold text-lg">Simulacro 2</h3>
                <p className={`text-sm ${pruebasCerradas['simulacro-2'] ? 'text-gray-200' : 'text-violet-100'}`}>Practica competencias ICFES Saber 11</p>
              </div>
              <CardContent className="p-5">
                <p className="text-sm text-gray-600 mb-4">Preguntas de matemáticas para practicar las competencias del ICFES Saber 11.</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
                  <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><BookOpen className="h-3 w-3" />{simulacro2Qs.length} preguntas</Badge>
                  <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><Clock className="h-3 w-3" />~90 min</Badge>
                </div>
                {pruebasCerradas['simulacro-2'] ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${resultados['simulacro-2']?.porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Resultado:</span>
                        <p className={`font-bold text-lg ${resultados['simulacro-2']?.porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{resultados['simulacro-2']?.porcentaje ?? 0}%</p>
                      </div>
                      <Progress value={resultados['simulacro-2']?.porcentaje ?? 0} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">{resultados['simulacro-2']?.correctas ?? 0} correctas de {resultados['simulacro-2']?.total ?? 0}</p>
                    </div>
                    <Button onClick={() => verResultadosPrueba({ id: 'simulacro-2', nombre: 'Simulacro 2: Segunda Sesión ICFES', competencia: 'mixta', descripcion: '', preguntas: simulacro2Qs, color: 'from-violet-600 to-purple-700', colorBg: '', icono: null })} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-xs sm:text-sm">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Ver Resultados
                    </Button>
                  </div>
                ) : resultados['simulacro-2'] ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${resultados['simulacro-2'].porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Resultado:</span>
                        <p className={`font-bold text-lg ${resultados['simulacro-2'].porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{resultados['simulacro-2'].porcentaje}%</p>
                      </div>
                      <Progress value={resultados['simulacro-2'].porcentaje} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">{resultados['simulacro-2'].correctas} correctas de {resultados['simulacro-2'].total}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={() => iniciarSimulacro(2)} variant="outline" className="flex-1 text-xs sm:text-sm"><RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Reintentar</Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => iniciarSimulacro(2)} className="w-full bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-xs sm:text-sm">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />Iniciar Simulacro 2
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2"><Award className="h-6 w-6 text-indigo-600" />Pruebas Disponibles</h2>
          <p className="text-gray-600 mb-5 text-sm">Cada prueba es independiente. Docente: Silvia Salas Salas</p>
          <div className="grid md:grid-cols-2 gap-5">
            {pruebas.map(prueba => {
              const res = resultados[prueba.id];
              const completa = !!res;
              const cerrada = !!pruebasCerradas[prueba.id];
              return (
                <Card key={prueba.id} className={`shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${cerrada ? 'border-gray-300 bg-gray-50' : completa ? 'border-emerald-300' : 'border-gray-200 hover:border-indigo-300'}`}>
                  <div className={`bg-gradient-to-r ${cerrada ? 'from-gray-500 to-gray-600' : prueba.color} p-5 text-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-white/20 p-2 rounded-lg">{prueba.icono}</div>
                      {cerrada ? (
                        <Badge className="bg-white/30 text-white border-0"><Lock className="h-3 w-3 mr-1" />Enviado</Badge>
                      ) : completa ? (
                        <Badge className="bg-white/30 text-white border-0"><CheckCircle className="h-3 w-3 mr-1" />Completada</Badge>
                      ) : null}
                    </div>
                    <h3 className="font-bold text-lg">{prueba.nombre}</h3>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-sm text-gray-600 mb-4">{prueba.descripcion}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
                      <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><BookOpen className="h-3 w-3" />{prueba.preguntas.length} preguntas</Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1"><Clock className="h-3 w-3" />~{prueba.preguntas.length * 3} min</Badge>
                    </div>
                    {cerrada ? (
                      <div className="space-y-3">
                        <div className={`p-3 rounded-lg ${res.porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Resultado:</span>
                            <p className={`font-bold text-lg ${res.porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{res.porcentaje}%</p>
                          </div>
                          <Progress value={res.porcentaje} className="h-2" />
                          <p className="text-xs text-gray-500 mt-2">{res.correctas} correctas de {res.total}</p>
                        </div>
                        <Button onClick={() => verResultadosPrueba(prueba)} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-xs sm:text-sm">
                          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Ver Resultados
                        </Button>
                      </div>
                    ) : completa ? (
                      <div className="space-y-3">
                        <div className={`p-3 rounded-lg ${res.porcentaje >= 60 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Resultado:</span>
                            <p className={`font-bold text-lg ${res.porcentaje >= 60 ? 'text-emerald-600' : 'text-orange-600'}`}>{res.porcentaje}%</p>
                          </div>
                          <Progress value={res.porcentaje} className="h-2" />
                          <p className="text-xs text-gray-500 mt-2">{res.correctas} correctas de {res.total}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button onClick={() => iniciarPrueba(prueba)} variant="outline" className="flex-1 text-xs sm:text-sm"><RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Reintentar</Button>
                          <Button onClick={() => verResultadosPrueba(prueba)} className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-xs sm:text-sm">Ver detalle</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => iniciarPrueba(prueba)} className={`w-full bg-gradient-to-r ${prueba.color} hover:opacity-90 text-xs sm:text-sm`}>
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />Iniciar Prueba
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     PANTALLA DE PRUEBA
     ═══════════════════════════════════════════ */
  if (pantalla === 'prueba' && pruebaActual) {
    const respondidas = Object.keys(respuestasActuales).length;
    const total = preguntasActivas.length;
    const puedeFinalizar = respondidas === total;

    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-md rounded-xl p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Button variant="ghost" size="sm" onClick={volverMenu} className="flex-shrink-0"><ArrowLeft className="h-4 w-4" /></Button>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">{pruebaActual.nombre}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{nombreEstudiante} — {curso}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Badge variant="outline" className="flex items-center gap-1 text-xs flex-shrink-0"><CheckCircle className="h-3 w-3" />{respondidas}/{total}</Badge>
              {puedeFinalizar && <Button onClick={finalizarPrueba} size="sm" className="bg-gradient-to-r from-emerald-600 to-green-600 text-xs sm:text-sm flex-1 sm:flex-initial"><Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />Finalizar</Button>}
            </div>
          </div>
          <Progress value={(respondidas / total) * 100} className="h-2 mt-2 sm:mt-3" />
        </div>

        <div className="space-y-6">
          {preguntasActivas.map((question, index) => (
            <PreguntaCard key={question.id} question={question} index={index}
              respuestaSeleccionada={respuestasActuales[question.id]}
              mostrarRetro={mostrarRetro[question.id] || false}
              onSelectRespuesta={o => handleRespuesta(question.id, o)}
              onVerificar={() => verificarRespuesta(question.id)} />
          ))}
        </div>

        <div className="sticky bottom-2 sm:bottom-4">
          <Button onClick={finalizarPrueba} disabled={!puedeFinalizar}
            className={`w-full h-12 sm:h-14 text-sm sm:text-lg font-semibold shadow-xl ${puedeFinalizar ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gray-400'}`}>
            <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {puedeFinalizar ? 'Finalizar Prueba y Ver Resultados' : `Responde todas (${respondidas}/${total})`}
          </Button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     PANTALLA DE RESULTADO
     ═══════════════════════════════════════════ */
  if (pantalla === 'resultado' && pruebaActual) {
    const detallesActuales = detallesPorPrueba[pruebaActual.id] || [];
    const estaCerrada = !!pruebasCerradas[pruebaActual.id];
    return (
      <ResultadosPrueba
        nombreEstudiante={nombreEstudiante}
        nombrePrueba={pruebaActual.nombre}
        detalles={detallesActuales}
        pruebaCerrada={estaCerrada}
        mensajeEnviado={mensajeEnviado}
        onCerrar={volverMenu}
        onReiniciar={() => iniciarPrueba(pruebaActual)}
      />
    );
  }

  return null;
}

/* ═══════════════════════════════════════════
   COMPONENTE PREGUNTA CARD
   ═══════════════════════════════════════════ */

/** Renderiza una opción de respuesta con soporte para saltos de línea y negrita */
function RenderOpcion({ texto }: { texto: string }) {
  const lineas = texto.split('\n');
  return (
    <span>
      {lineas.map((linea, idx) => {
        // Procesar negrita **texto**
        const partes = linea.split(/(\*\*.+?\*\*)/g);
        return (
          <span key={idx}>
            {idx > 0 && <br />}
            {partes.map((parte, pidx) => {
              if (parte.startsWith('**') && parte.endsWith('**')) {
                return <strong key={pidx} className="font-bold text-gray-900">{parte.slice(2, -2)}</strong>;
              }
              return <span key={pidx}>{parte}</span>;
            })}
          </span>
        );
      })}
    </span>
  );
}

function PreguntaCard({
  question, index, respuestaSeleccionada, mostrarRetro,
  onSelectRespuesta, onVerificar
}: {
  question: PreguntaMezclada; index: number;
  respuestaSeleccionada: number | undefined; mostrarRetro: boolean;
  onSelectRespuesta: (opcionIndex: number) => void;
  onVerificar: () => void;
}) {
  const esCorrecta = respuestaSeleccionada === question.respuestaCorrecta;
  const compName = competencias[question.competencia].nombre;
  const catName = categorias[question.categoria].nombre;

  const getCompColor = (comp: string) => {
    switch(comp) {
      case 'interpretacion': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'formulacion': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'argumentacion': return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return '';
    }
  };

  return (
    <Card className={`shadow-lg transition-all duration-300 border-l-4 ${mostrarRetro ? esCorrecta ? 'border-l-emerald-500' : 'border-l-red-500' : 'border-l-indigo-500'}`}>
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-sm sm:text-base ${mostrarRetro ? esCorrecta ? 'bg-emerald-500' : 'bg-red-500' : 'bg-indigo-600'}`}>
              {mostrarRetro ? esCorrecta ? <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" /> : <XCircle className="h-5 w-5 sm:h-6 sm:w-6" /> : index + 1}
            </div>
            <Badge variant="outline" className={`inline-flex items-center gap-1 text-[10px] sm:text-xs py-0.5 px-1.5 ${getCompColor(question.competencia)}`}>
              {question.competencia === 'interpretacion' && <BookOpen className="h-3 w-3" />}
              {question.competencia === 'formulacion' && <Target className="h-3 w-3" />}
              {question.competencia === 'argumentacion' && <Lightbulb className="h-3 w-3" />}
              <span className="truncate">{compName}</span>
            </Badge>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-[10px] sm:text-xs w-fit">{catName}</Badge>
        </div>

        {/* Enunciado con gráficos insertados */}
        {(() => {
          const enunciado = question.enunciado;
          if (enunciado.includes('[GRAFICO_CIRCULAR]')) {
            const [parte1, parte2] = enunciado.split('[GRAFICO_CIRCULAR]');
            return (
              <>
                <div className="mb-3 sm:mb-4"><EnunciadoMatematico enunciado={parte1.trim()} /></div>
                <div className="mb-3 sm:mb-4"><GraficoCircular /></div>
                <div className="mb-4 sm:mb-5"><EnunciadoMatematico enunciado={parte2.trim()} /></div>
              </>
            );
          }
          if (enunciado.includes('[GRAFICO]')) {
            const [parte1, parte2] = enunciado.split('[GRAFICO]');
            return (
              <>
                <div className="mb-3 sm:mb-4"><EnunciadoMatematico enunciado={parte1.trim()} /></div>
                {question.imagen && (
                  <div className="mb-3 sm:mb-4 bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-500">
                      <TrendingUp className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">{question.imagen?.includes('ventas') ? 'Gráfico: Ventas' : question.imagen?.includes('calorias') ? 'Gráfico: Aplicación' : question.imagen?.includes('acierto') ? 'Gráfico: Aciertos' : question.imagen?.includes('pacientes') ? 'Gráfico: Pacientes' : 'Gráfico: Incidencia de la pobreza por el IPM — DANE'}</span>
                    </div>
                    <img src={question.imagen} alt="Gráfico" className="w-full rounded-lg shadow-sm" loading="lazy" />
                  </div>
                )}
                <div className="mb-4 sm:mb-5"><EnunciadoMatematico enunciado={parte2.trim()} /></div>
              </>
            );
          }
          if (enunciado.includes('[IMAGEN]')) {
            const parts = enunciado.split('[IMAGEN]');
            return (
              <>
                {parts.map((part, idx) => {
                  if (idx === 0) {
                    return part.trim() && <div key={idx} className="mb-3 sm:mb-4"><EnunciadoMatematico enunciado={part.trim()} /></div>;
                  }
                  const trimmed = part.trim();
                  if (trimmed.startsWith('/')) {
                    const lines = trimmed.split('\n');
                    const imgPath = lines[0].trim();
                    const textAfter = lines.slice(1).join('\n').trim();
                    return (
                      <Fragment key={idx}>
                        {imgPath && (
                          <div className="mb-3 sm:mb-4 bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-500">
                              <FileText className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">{imgPath.includes('diag-transp') ? 'Diagrama de Venn - Transportes' : imgPath.includes('diag-nevad') ? 'Diagrama de Venn' : imgPath.includes('diag-bailes') ? 'Diagrama de Venn - Bailes' : 'Figura de la pregunta'}</span>
                            </div>
                            <img src={imgPath} alt="Figura" className="w-full rounded-lg shadow-sm" loading="lazy" />
                          </div>
                        )}
                        {textAfter && <div className="mb-3 sm:mb-4"><EnunciadoMatematico enunciado={textAfter} /></div>}
                      </Fragment>
                    );
                  }
                  return <div key={idx} className="mb-3 sm:mb-4"><EnunciadoMatematico enunciado={trimmed} /></div>;
                })}
              </>
            );
          }
          return (
            <div className="mb-4 sm:mb-5">
              <EnunciadoMatematico enunciado={enunciado} />
            </div>
          );
        })()}

        {/* Opciones */}
        <div className="space-y-2 mb-4">
          {question.opciones.map((opcion, i) => {
            let opcionClass = 'border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
            if (mostrarRetro) {
              if (i === question.respuestaCorrecta) opcionClass = 'border-2 border-emerald-500 bg-emerald-50';
              else if (i === respuestaSeleccionada && i !== question.respuestaCorrecta) opcionClass = 'border-2 border-red-500 bg-red-50';
              else opcionClass = 'border-2 border-gray-200 opacity-50';
            } else if (respuestaSeleccionada === i) opcionClass = 'border-2 border-indigo-500 bg-indigo-50';

            return (
              <button key={i} onClick={() => onSelectRespuesta(i)} disabled={mostrarRetro}
                className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 flex items-start gap-2 sm:gap-3 ${opcionClass}`}>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm flex-shrink-0 mt-0.5 ${mostrarRetro && i === question.respuestaCorrecta ? 'bg-emerald-500 text-white' : mostrarRetro && i === respuestaSeleccionada && i !== question.respuestaCorrecta ? 'bg-red-500 text-white' : respuestaSeleccionada === i ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-gray-800 text-sm sm:text-base break-words min-w-0 leading-relaxed">{opcion.startsWith('[IMAGEN]') ? <img src={opcion.replace('[IMAGEN]', '')} alt={`Gráfica ${String.fromCharCode(65 + i)}`} className="w-full max-w-md rounded-lg shadow-sm border border-gray-200 mt-1" loading="lazy" /> : <RenderOpcion texto={opcion} />}</span>
              </button>
            );
          })}
        </div>

        {/* Botón Verificar */}
        {!mostrarRetro && respuestaSeleccionada !== undefined && (
          <Button onClick={onVerificar} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-sm sm:text-base">
            <CheckCircle className="h-4 w-4 mr-2" />Verificar Respuesta
          </Button>
        )}

        {/* Retroalimentación */}
        {mostrarRetro && (
          <div className={`mt-3 sm:mt-4 p-4 sm:p-5 rounded-xl ${esCorrecta ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-orange-50 border-2 border-orange-200'} animate-in fade-in duration-300`}>
            <div className="flex items-center gap-2 mb-3">
              {esCorrecta ? <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" /> : <XCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />}
              <h4 className={`font-bold text-sm sm:text-base ${esCorrecta ? 'text-emerald-700' : 'text-orange-700'}`}>{esCorrecta ? '¡Correcto!' : 'Respuesta Incorrecta'}</h4>
            </div>
            <div className="mb-3">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">La respuesta correcta es:</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">{String.fromCharCode(65 + question.respuestaCorrecta)}. {question.opciones[question.respuestaCorrecta]}</p>
            </div>
            <div className={`p-3 sm:p-4 rounded-lg ${esCorrecta ? 'bg-emerald-100/50' : 'bg-orange-100/50'}`}>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4" />Retroalimentación:</p>
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{question.retroalimentacion}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
