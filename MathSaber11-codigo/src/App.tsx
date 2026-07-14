import { useState } from 'react';
import { BookOpen, GraduationCap, Library, BarChart3, Calculator, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocenteTab from '@/sections/DocenteTab';
import EstudiantesTab from '@/sections/EstudiantesTab';
import RecursosTab from '@/sections/RecursosTab';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('docente');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 sm:p-3 rounded-xl backdrop-blur-sm">
                <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate">
                  MathSaber 11
                </h1>
                <p className="text-blue-200 text-xs sm:text-sm md:text-base truncate">
                  Preparación Prueba de Matemáticas — ICFES
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-sm">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <span className="text-xs sm:text-sm font-medium block">IED Los Rosales</span>
                <span className="text-[10px] sm:text-xs text-blue-300 block">Docente: Silvia Salas Salas</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-2xl p-1 sm:p-1.5 h-auto">
            <TabsTrigger 
              value="docente" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold text-[10px] sm:text-sm md:text-base">Para el Docente</span>
            </TabsTrigger>
            <TabsTrigger 
              value="estudiantes"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold text-[10px] sm:text-sm md:text-base">Estudiantes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recursos"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Library className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold text-[10px] sm:text-sm md:text-base">Recursos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="docente" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DocenteTab />
          </TabsContent>

          <TabsContent value="estudiantes" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <EstudiantesTab />
          </TabsContent>

          <TabsContent value="recursos" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RecursosTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-950 text-blue-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5" />
            <span className="font-semibold text-white">MathSaber 11</span>
          </div>
          <p className="text-sm">
            Aplicación diseñada para fortalecer las competencias matemáticas del Saber 11 — ICFES
          </p>
          <p className="text-xs mt-2 text-blue-400">
            IED Los Rosales — Secretaría Distrital de Educación de Barranquilla — Docente: Silvia Salas Salas
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
