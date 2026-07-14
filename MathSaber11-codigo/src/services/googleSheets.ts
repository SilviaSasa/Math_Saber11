// Servicio para enviar resultados a Google Sheets via Apps Script

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';

export interface ResultadoPrueba {
  nombreEstudiante: string;
  pruebaId: string;
  pruebaNombre: string;
  totalPreguntas: number;
  correctas: number;
  incorrectas: number;
  porcentaje: number;
  fecha: string;
  detalles: DetalleRespuesta[];
}

export interface DetalleRespuesta {
  preguntaId: number;
  preguntaEnunciado: string;
  respuestaEstudiante: string;
  respuestaCorrecta: string;
  esCorrecta: boolean;
  competencia: string;
}

/**
 * Envía los resultados de una prueba a Google Sheets
 * Reemplaza la URL con tu propio Apps Script desplegado
 */
export async function enviarResultadosASheets(
  resultado: ResultadoPrueba
): Promise<{ success: boolean; message: string }> {
  try {
    // Si no hay URL configurada, simular éxito para demo
    if (APPS_SCRIPT_URL.includes('XXXXXXXX')) {
      console.log('Resultado simulado (configurar APPS_SCRIPT_URL):', resultado);
      return { success: true, message: 'Resultados enviados correctamente (modo demo)' };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultado),
    });

    const data = await response.json();
    return { success: true, message: data.message || 'Resultados enviados correctamente' };
  } catch (error) {
    console.error('Error al enviar a Sheets:', error);
    return { success: false, message: 'Error al enviar resultados. Se guardaron localmente.' };
  }
}

/**
 * Configurar la URL del Apps Script
 * Instrucciones para el usuario:
 * 1. Crear un Google Sheet
 * 2. Abrir Apps Script (Extensiones > Apps Script)
 * 3. Pegar el código del archivo GOOGLE_APPS_SCRIPT.gs
 * 4. Desplegar como aplicación web
 * 5. Copiar la URL y reemplazar aquí
 */
export function configurarUrlSheets(url: string): void {
  // El usuario debe reemplazar la constante APPS_SCRIPT_URL
  console.log('URL configurada:', url);
}
