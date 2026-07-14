export interface MaterialDocente {
  id: string;
  titulo: string;
  descripcion: string;
  asignatura: string;
  temaPrincipal: string;
  subtema: string;
  tipo: 'PDF' | 'Video' | 'Enlace' | 'Imagen' | 'Documento' | 'Audio';
  url: string;
  fechaSubida: string;
  archivoNombre?: string;
}

export interface Subtema {
  id: string;
  nombre: string;
  temaPrincipalId: string;
}

export const temasPrincipales = [
  {
    id: 'algebra',
    nombre: 'Álgebra y Cálculo',
    color: 'from-purple-600 to-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    dot: 'bg-purple-500',
    icono: '🔢'
  },
  {
    id: 'geometria',
    nombre: 'Geometría',
    color: 'from-teal-600 to-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-300',
    dot: 'bg-teal-500',
    icono: '📐'
  },
  {
    id: 'estadistica',
    nombre: 'Estadística',
    color: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    dot: 'bg-blue-500',
    icono: '📊'
  }
];

export const tiposMaterial = [
  { value: 'PDF', label: 'PDF', icono: '📄' },
  { value: 'Video', label: 'Video', icono: '🎬' },
  { value: 'Enlace', label: 'Enlace web', icono: '🔗' },
  { value: 'Imagen', label: 'Imagen', icono: '🖼️' },
  { value: 'Documento', label: 'Documento de texto', icono: '📝' },
  { value: 'Audio', label: 'Audio / Podcast', icono: '🎧' }
];

// Cargar materiales desde localStorage
export function cargarMateriales(): MaterialDocente[] {
  try {
    const data = localStorage.getItem('mathsaber_materiales_docente');
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return [];
}

// Guardar materiales en localStorage
export function guardarMateriales(materiales: MaterialDocente[]) {
  localStorage.setItem('mathsaber_materiales_docente', JSON.stringify(materiales));
}

// Cargar subtemas desde localStorage
export function cargarSubtemas(): Subtema[] {
  try {
    const data = localStorage.getItem('mathsaber_subtemas');
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  // Subtemas por defecto
  return [
    // Algebra y Calculo
    { id: 'sub-1', nombre: 'Ecuaciones e inecuaciones', temaPrincipalId: 'algebra' },
    { id: 'sub-2', nombre: 'Funciones (lineal, cuadrática, exponencial)', temaPrincipalId: 'algebra' },
    { id: 'sub-3', nombre: 'Sistemas de ecuaciones', temaPrincipalId: 'algebra' },
    { id: 'sub-4', nombre: 'Sucesiones y progresiones', temaPrincipalId: 'algebra' },
    { id: 'sub-5', nombre: 'Operaciones con polinomios', temaPrincipalId: 'algebra' },
    // Geometria
    { id: 'sub-6', nombre: 'Teorema de Pitágoras', temaPrincipalId: 'geometria' },
    { id: 'sub-7', nombre: 'Semejanza y congruencia', temaPrincipalId: 'geometria' },
    { id: 'sub-8', nombre: 'Áreas y perímetros', temaPrincipalId: 'geometria' },
    { id: 'sub-9', nombre: 'Volumen y cuerpos geométricos', temaPrincipalId: 'geometria' },
    { id: 'sub-10', nombre: 'Transformaciones geométricas', temaPrincipalId: 'geometria' },
    { id: 'sub-11', nombre: 'Coordenadas y vectores', temaPrincipalId: 'geometria' },
    // Estadistica
    { id: 'sub-12', nombre: 'Medidas de tendencia central', temaPrincipalId: 'estadistica' },
    { id: 'sub-13', nombre: 'Interpretación de tablas y gráficas', temaPrincipalId: 'estadistica' },
    { id: 'sub-14', nombre: 'Probabilidad', temaPrincipalId: 'estadistica' },
    { id: 'sub-15', nombre: 'Combinatoria y conteo', temaPrincipalId: 'estadistica' },
    { id: 'sub-16', nombre: 'Inferencia estadística', temaPrincipalId: 'estadistica' },
  ];
}

// Guardar subtemas en localStorage
export function guardarSubtemas(subtemas: Subtema[]) {
  localStorage.setItem('mathsaber_subtemas', JSON.stringify(subtemas));
}
