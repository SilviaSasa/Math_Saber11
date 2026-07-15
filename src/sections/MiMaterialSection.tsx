import { useState, useRef, useCallback } from 'react';
import {
  ExternalLink, FileText, Headphones, Video,
  Trash2, FolderOpen, Plus, Link2, FileUp, CheckCircle,
  AlertCircle, Search, Filter, ChevronRight, Upload,
  BookOpen, X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  temasPrincipales,
  tiposMaterial,
  cargarMateriales,
  guardarMateriales,
  cargarSubtemas,
  guardarSubtemas,
  type MaterialDocente,
  type Subtema
} from '@/data/materiales';

function getTipoIcono(tipo: string) {
  switch (tipo) {
    case 'PDF': return <FileText className="h-4 w-4 text-red-500" />;
    case 'Video': return <Video className="h-4 w-4 text-red-400" />;
    case 'Enlace': return <Link2 className="h-4 w-4 text-blue-500" />;
    case 'Imagen': return <FileText className="h-4 w-4 text-purple-500" />;
    case 'Documento': return <FileText className="h-4 w-4 text-gray-500" />;
    case 'Audio': return <Headphones className="h-4 w-4 text-amber-500" />;
    default: return <FileText className="h-4 w-4 text-gray-400" />;
  }
}

export default function MiMaterialSection() {
  const [materiales, setMateriales] = useState<MaterialDocente[]>(() => cargarMateriales());
  const [subtemas, setSubtemas] = useState<Subtema[]>(() => cargarSubtemas());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSubtemaOpen, setDialogSubtemaOpen] = useState(false);
  const [temaFiltro, setTemaFiltro] = useState<string>('todos');
  const [subtemaFiltro, setSubtemaFiltro] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [expandedTema, setExpandedTema] = useState<string | null>(null);

  // Formulario material
  const [nuevoMaterial, setNuevoMaterial] = useState<Partial<MaterialDocente>>({
    asignatura: 'Matemáticas',
    temaPrincipal: '',
    subtema: '',
    tipo: 'PDF'
  });
  const [archivoBase64, setArchivoBase64] = useState<string>('');
  const [archivoNombre, setArchivoNombre] = useState<string>('');
  const [inputMode, setInputMode] = useState<'url' | 'archivo'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formulario subtema
  const [nuevoSubtema, setNuevoSubtema] = useState('');
  const [subtemaTemaPrincipal, setSubtemaTemaPrincipal] = useState('');

  const subtemasDisponibles = subtemas.filter(s => s.temaPrincipalId === nuevoMaterial.temaPrincipal);

  const handleAgregar = () => {
    if (!nuevoMaterial.titulo || !nuevoMaterial.temaPrincipal || !nuevoMaterial.subtema) return;

    const material: MaterialDocente = {
      id: Date.now().toString(),
      titulo: nuevoMaterial.titulo || '',
      descripcion: nuevoMaterial.descripcion || '',
      asignatura: 'Matemáticas',
      temaPrincipal: nuevoMaterial.temaPrincipal || '',
      subtema: nuevoMaterial.subtema || '',
      tipo: nuevoMaterial.tipo as MaterialDocente['tipo'] || 'PDF',
      url: inputMode === 'archivo' && archivoBase64 ? archivoBase64 : (nuevoMaterial.url || '#'),
      fechaSubida: new Date().toLocaleDateString('es-CO'),
      archivoNombre: inputMode === 'archivo' ? archivoNombre : undefined
    };

    const actualizados = [...materiales, material];
    setMateriales(actualizados);
    guardarMateriales(actualizados);

    // Reset
    setNuevoMaterial({ asignatura: 'Matemáticas', temaPrincipal: '', subtema: '', tipo: 'PDF' });
    setArchivoBase64('');
    setArchivoNombre('');
    setInputMode('url');
    setDialogOpen(false);
  };

  const handleEliminar = (id: string) => {
    const actualizados = materiales.filter(m => m.id !== id);
    setMateriales(actualizados);
    guardarMateriales(actualizados);
  };

  const handleAgregarSubtema = () => {
    if (!nuevoSubtema.trim() || !subtemaTemaPrincipal) return;
    const nuevo: Subtema = {
      id: `sub-${Date.now()}`,
      nombre: nuevoSubtema.trim(),
      temaPrincipalId: subtemaTemaPrincipal
    };
    const actualizados = [...subtemas, nuevo];
    setSubtemas(actualizados);
    guardarSubtemas(actualizados);
    setNuevoSubtema('');
    setSubtemaTemaPrincipal('');
    setDialogSubtemaOpen(false);
  };

  const handleEliminarSubtema = (subtemaId: string) => {
    const actualizados = subtemas.filter(s => s.id !== subtemaId);
    setSubtemas(actualizados);
    guardarSubtemas(actualizados);
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('El archivo es muy grande. Máximo 2MB para almacenamiento local.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setArchivoBase64(reader.result as string);
      setArchivoNombre(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  // Filtrar materiales
  const materialesFiltrados = materiales
    .filter(m => temaFiltro === 'todos' || m.temaPrincipal === temaFiltro)
    .filter(m => subtemaFiltro === 'todos' || m.subtema === subtemaFiltro)
    .filter(m => !busqueda ||
      m.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

  const totalMateriales = materiales.length;

  return (
    <div className="space-y-5">
      {/* Stats y botones */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-2.5 sm:p-3 rounded-xl text-white flex-shrink-0">
            <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">Material de Matemáticas — Silvia Salas Salas</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {totalMateriales} recurso{totalMateriales !== 1 ? 's' : ''} — 3 áreas temáticas
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={dialogSubtemaOpen} onOpenChange={setDialogSubtemaOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Crear Subtema
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Nuevo Subtema
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Tema principal</Label>
                  <Select value={subtemaTemaPrincipal} onValueChange={setSubtemaTemaPrincipal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona área..." />
                    </SelectTrigger>
                    <SelectContent>
                      {temasPrincipales.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.icono} {t.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nombre del subtema</Label>
                  <Input
                    placeholder="Ej: Funciones cuadráticas"
                    value={nuevoSubtema}
                    onChange={e => setNuevoSubtema(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAgregarSubtema}
                  disabled={!nuevoSubtema.trim() || !subtemaTemaPrincipal}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Subtema
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg text-xs sm:text-sm">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Agregar Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-5 w-5 text-indigo-600" />
                  Subir Material de Matemáticas
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    placeholder="Ej: Guía de Funciones Lineales"
                    value={nuevoMaterial.titulo || ''}
                    onChange={e => setNuevoMaterial(prev => ({ ...prev, titulo: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    placeholder="Breve descripción del contenido..."
                    rows={2}
                    value={nuevoMaterial.descripcion || ''}
                    onChange={e => setNuevoMaterial(prev => ({ ...prev, descripcion: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Tema principal <span className="text-red-500">*</span></Label>
                  <Select
                    value={nuevoMaterial.temaPrincipal}
                    onValueChange={v => setNuevoMaterial(prev => ({ ...prev, temaPrincipal: v, subtema: '' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona área de matemáticas..." />
                    </SelectTrigger>
                    <SelectContent>
                      {temasPrincipales.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.icono} {t.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subtema <span className="text-red-500">*</span></Label>
                  <Select
                    value={nuevoMaterial.subtema}
                    onValueChange={v => setNuevoMaterial(prev => ({ ...prev, subtema: v }))}
                    disabled={!nuevoMaterial.temaPrincipal}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={nuevoMaterial.temaPrincipal ? "Selecciona subtema..." : "Primero elige el tema principal"} />
                    </SelectTrigger>
                    <SelectContent>
                      {subtemasDisponibles.map(s => (
                        <SelectItem key={s.id} value={s.nombre}>{s.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo de recurso</Label>
                  <Select
                    value={nuevoMaterial.tipo}
                    onValueChange={v => setNuevoMaterial(prev => ({ ...prev, tipo: v as MaterialDocente['tipo'] }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {tiposMaterial.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.icono} {t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>¿Cómo quieres agregar el recurso?</Label>
                  <div className="flex gap-2 mt-1">
                    <Button type="button" variant={inputMode === 'url' ? 'default' : 'outline'} size="sm"
                      onClick={() => setInputMode('url')} className={inputMode === 'url' ? 'bg-indigo-600' : ''}>
                      <Link2 className="h-4 w-4 mr-1" />Pegar URL
                    </Button>
                    <Button type="button" variant={inputMode === 'archivo' ? 'default' : 'outline'} size="sm"
                      onClick={() => setInputMode('archivo')} className={inputMode === 'archivo' ? 'bg-indigo-600' : ''}>
                      <FileUp className="h-4 w-4 mr-1" />Subir Archivo
                    </Button>
                  </div>
                </div>
                {inputMode === 'url' ? (
                  <div>
                    <Label>URL del recurso</Label>
                    <Input placeholder="https://..."
                      value={nuevoMaterial.url || ''}
                      onChange={e => setNuevoMaterial(prev => ({ ...prev, url: e.target.value }))} />
                  </div>
                ) : (
                  <div>
                    <Label>Seleccionar archivo (máx. 2MB)</Label>
                    <div className="mt-1">
                      <input type="file" ref={fileInputRef} className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mp3" />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        {archivoNombre || 'Seleccionar archivo...'}
                      </Button>
                      {archivoNombre && (
                        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />{archivoNombre} listo
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleAgregar}
                  disabled={!nuevoMaterial.titulo || !nuevoMaterial.temaPrincipal || !nuevoMaterial.subtema || (inputMode === 'url' && !nuevoMaterial.url) || (inputMode === 'archivo' && !archivoBase64)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600"
                >
                  <Upload className="h-4 w-4 mr-2" />Guardar Material
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <Card className="shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar material..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="pl-9 text-sm" />
            </div>
            <div className="flex gap-2">
              <Select value={temaFiltro} onValueChange={v => { setTemaFiltro(v); setSubtemaFiltro('todos'); }}>
                <SelectTrigger className="w-full sm:w-[180px] text-sm"><Filter className="h-4 w-4 mr-1" /><SelectValue placeholder="Área" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las áreas</SelectItem>
                  {temasPrincipales.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.icono} {t.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={subtemaFiltro} onValueChange={setSubtemaFiltro}>
                <SelectTrigger className="w-full sm:w-[180px] text-sm"><SelectValue placeholder="Subtema" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los subtemas</SelectItem>
                  {subtemas
                    .filter(s => temaFiltro === 'todos' || s.temaPrincipalId === temaFiltro)
                    .map(s => (
                      <SelectItem key={s.id} value={s.nombre}>{s.nombre}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temas principales con subtemas */}
      {temasPrincipales
        .filter(t => temaFiltro === 'todos' || t.id === temaFiltro)
        .map(tema => {
          const matsDeTema = materialesFiltrados.filter(m => m.temaPrincipal === tema.id);
          if (matsDeTema.length === 0 && temaFiltro !== 'todos') return null;

          const subtemasDeTema = subtemas.filter(s => s.temaPrincipalId === tema.id);
          const isExpanded = expandedTema === tema.id;

          return (
            <Card key={tema.id} className={`shadow-md overflow-hidden border-l-4 ${tema.border}`}>
              {/* Header del tema principal */}
              <button
                onClick={() => setExpandedTema(isExpanded ? null : tema.id)}
                className={`w-full p-4 flex items-center justify-between text-left hover:brightness-95 transition-all ${tema.bg}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{tema.icono}</span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-lg truncate">{tema.nombre}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {subtemasDeTema.length} subtema(s) · {matsDeTema.length} recurso(s)
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100">
                  {subtemasDeTema.map(sub => {
                    const matsDeSubtema = matsDeTema.filter(m => m.subtema === sub.nombre);
                    return (
                      <div key={sub.id} className="border-b border-gray-50 last:border-0">
                        {/* Header del subtema */}
                        <div className="px-4 py-2.5 bg-gray-50/60 flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${tema.dot} flex-shrink-0`} />
                            <h5 className="font-semibold text-gray-700 text-xs sm:text-sm truncate">{sub.nombre}</h5>
                            {matsDeSubtema.length > 0 && (
                              <Badge variant="secondary" className="text-[10px] px-1.5">{matsDeSubtema.length}</Badge>
                            )}
                          </div>
                          <Button
                            size="sm" variant="ghost"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            onClick={() => handleEliminarSubtema(sub.id)}
                            title="Eliminar subtema"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {/* Materiales del subtema */}
                        {matsDeSubtema.length > 0 && (
                          <div className="p-2 sm:p-3 space-y-2">
                            {matsDeSubtema.map(m => (
                              <div key={m.id} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                                <div className="bg-gray-50 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                  {getTipoIcono(m.tipo)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h6 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{m.titulo}</h6>
                                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">{m.descripcion}</p>
                                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5">
                                    <Badge variant="outline" className="text-[9px] sm:text-[10px] px-1 py-0">{m.tipo}</Badge>
                                    <span className="text-[9px] sm:text-[10px] text-gray-400">{m.fechaSubida}</span>
                                    {m.archivoNombre && (
                                      <span className="text-[9px] sm:text-[10px] text-emerald-600 flex items-center gap-0.5">
                                        <CheckCircle className="h-2.5 w-2.5" />Archivo
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-0.5 flex-shrink-0">
                                  {m.url && m.url !== '#' && (
                                    <a href={m.url} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors"
                                      title="Abrir en nueva pestaña">
                                      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </a>
                                  )}
                                  <Button size="sm" variant="ghost"
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleEliminar(m.id)}>
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}

      {/* Info del docente */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-800 text-sm">Información para la docente</h4>
              <p className="text-xs text-indigo-600 mt-1">
                Usa "Crear Subtema" para agregar nuevos subtemas dentro de Álgebra y Cálculo, Geometría o Estadística.
                Luego usa "Agregar Material" para subir recursos organizados por tema y subtema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
