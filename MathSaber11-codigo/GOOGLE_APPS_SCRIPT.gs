/**
 * ============================================
 * Google Apps Script para MathSaber 11
 * ============================================
 * 
 * INSTRUCCIONES DE CONFIGURACION:
 * 
 * 1. Crear un nuevo Google Sheet en tu cuenta de Google Drive
 * 2. Ir a Extensiones > Apps Script
 * 3. Borrar el código por defecto y pegar TODO este archivo
 * 4. Guardar (Ctrl+S) con el nombre "MathSaber11"
 * 5. Hacer clic en "Desplegar" > "Nuevo despliegue"
 * 6. Tipo: Aplicación web
 * 7. Ejecutar como: Yo
 * 8. Acceso: Cualquiera (o restringido según prefieras)
 * 9. Copiar la URL generada
 * 10. Pegar la URL en src/services/googleSheets.ts (reemplazar APPS_SCRIPT_URL)
 */

const SHEET_NAME = 'Resultados';
const DETAIL_SHEET_NAME = 'Detalle';

function doPost(e) {
  try {
    // Parsear datos JSON
    const data = JSON.parse(e.postData.contents);
    
    // Obtener o crear hojas
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    let detailSheet = ss.getSheetByName(DETAIL_SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Crear encabezados
      sheet.getRange(1, 1, 1, 9).setValues([[
        'Fecha', 'Estudiante', 'Prueba ID', 'Prueba Nombre', 
        'Total Preguntas', 'Correctas', 'Incorrectas', 'Porcentaje', 'Detalles'
      ]]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }
    
    if (!detailSheet) {
      detailSheet = ss.insertSheet(DETAIL_SHEET_NAME);
      detailSheet.getRange(1, 1, 1, 7).setValues([[
        'Fecha', 'Estudiante', 'Prueba', 'Pregunta ID', 
        'Enunciado', 'Respuesta Estudiante', 'Es Correcta', 'Competencia'
      ]]);
      detailSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Insertar fila de resultados
    const fecha = new Date();
    const row = [
      fecha,
      data.nombreEstudiante || 'Sin nombre',
      data.pruebaId || '',
      data.pruebaNombre || '',
      data.totalPreguntas || 0,
      data.correctas || 0,
      data.incorrectas || 0,
      data.porcentaje + '%' || '0%',
      JSON.stringify(data.detalles || [])
    ];
    
    sheet.appendRow(row);
    
    // Insertar detalles
    if (data.detalles && data.detalles.length > 0) {
      data.detalles.forEach(function(detalle) {
        detailSheet.appendRow([
          fecha,
          data.nombreEstudiante || 'Sin nombre',
          data.pruebaNombre || '',
          detalle.preguntaId || '',
          detalle.preguntaEnunciado || '',
          detalle.respuestaEstudiante || '',
          detalle.esCorrecta ? 'Sí' : 'No',
          detalle.competencia || ''
        ]);
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Resultados guardados correctamente en Google Sheets' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'MathSaber 11 - Apps Script activo' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
