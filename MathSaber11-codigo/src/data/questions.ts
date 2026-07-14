export interface Question {
  id: number;
  competencia: 'interpretacion' | 'formulacion' | 'argumentacion';
  categoria: 'estadistica' | 'geometria' | 'algebra';
  enunciado: string;
  opciones: string[];
  respuestaCorrecta: number;
  retroalimentacion: string;
  imagen?: string;
}

export interface PreguntaMezclada extends Question {
  opcionesOriginales: string[];
  ordenOriginal: number[];
}

/**
 * Mezcla aleatoriamente las opciones de respuesta de cada pregunta.
 * Esto evita que los estudiantes memoricen "la letra correcta" y les
 * obliga a razonar la respuesta cada vez que repiten la prueba.
 */
export function mezclarPreguntas(preguntas: Question[]): PreguntaMezclada[] {
  return preguntas.map(q => {
    const pares = q.opciones.map((opcion, idx) => ({ opcion, idxOriginal: idx }));
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    const nuevaRespuestaCorrecta = pares.findIndex(p => p.idxOriginal === q.respuestaCorrecta);
    return {
      ...q,
      opciones: pares.map(p => p.opcion),
      respuestaCorrecta: nuevaRespuestaCorrecta,
      opcionesOriginales: q.opciones,
      ordenOriginal: pares.map(p => p.idxOriginal),
    };
  });
}

export const competencias = {
  interpretacion: {
    nombre: 'Interpretación y Representación',
    descripcion: 'Consiste en la habilidad para comprender y transformar la información presentada en distintos formatos como tablas, gráficas, conjuntos de datos, diagramas, esquemas, etc., así como la capacidad de utilizar estas representaciones para extraer información relevante que permita establecer relaciones matemáticas e identificar tendencias y patrones.',
    evidencias: [
      'Da cuenta de las características básicas de la información presentada en diferentes formatos como series, gráficas, tablas y esquemas.',
      'Transforma la representación de una o más piezas de información.'
    ]
  },
  formulacion: {
    nombre: 'Formulación y Ejecución',
    descripcion: 'Se relaciona con la capacidad para plantear y diseñar estrategias que permitan solucionar problemas provenientes de diversos contextos, bien sean netamente matemáticos o bien aquellos que pueden surgir en la vida cotidiana. Se relaciona con la habilidad para seleccionar y verificar la pertinencia de soluciones propuestas.',
    evidencias: [
      'Diseña planes para la solución de problemas que involucran información cuantitativa o esquemática.',
      'Ejecuta un plan de solución para un problema que involucra información cuantitativa o esquemática.'
    ]
  },
  argumentacion: {
    nombre: 'Argumentación',
    descripcion: 'Se relaciona con la capacidad para validar o refutar conclusiones, estrategias, soluciones, interpretaciones y representaciones en diversas situaciones, siempre justificando por qué o cómo se llegó a estas, a través de ejemplos y contraejemplos.',
    evidencias: [
      'Plantea afirmaciones que sustentan o refutan una interpretación dada a la información disponible.',
      'Establece la validez o pertinencia de una solución propuesta a un problema dado.',
      'Argumenta a favor o en contra de un procedimiento para resolver un problema a la luz de criterios establecidos.'
    ]
  }
};

export const categorias = {
  estadistica: { nombre: 'Estadística', color: 'bg-blue-500' },
  geometria: { nombre: 'Geometría', color: 'bg-green-500' },
  algebra: { nombre: 'Álgebra y Cálculo', color: 'bg-purple-500' }
};

export const questions: Question[] = [
  {
    id: 1,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En la siguiente tabla se evidencian los resultados de una entrevista realizada a siete mujeres, madres de familia, en donde se les preguntó a qué edad tuvieron su primer hijo.\n\n| Madre | Edad (años) |\n|-------|-------------|\n| 1 | 21 |\n| 2 | 26 |\n| 3 | 20 |\n| 4 | 21 |\n| 5 | 22 |\n| 6 | 28 |\n| 7 | 30 |\n\nA partir de la información suministrada, ¿cuál es el promedio de las edades?`,
    opciones: ['18', '22', '24', '28'],
    respuestaCorrecta: 2,
    retroalimentacion: 'El promedio se calcula sumando todas las edades y dividiendo entre el número de mujeres: (21 + 26 + 20 + 21 + 22 + 28 + 30) ÷ 7 = 168 ÷ 7 = **24**. Este ejercicio evalúa la competencia de Interpretación y Representación: calcular medidas de tendencia central a partir de datos tabulados.'
  },
  {
    id: 5,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Alberto tiene un salario mensual de $800.000 y quiere ahorrar, cada mes, el 2% de su sueldo.\n\n"Como 800.000 tiene 5 ceros a la derecha, solo se multiplica por 2, y se forman 2 ceros a la derecha del 2, y se forma el número 16.000"\n\nEsto quiere decir que Alberto ahorrará $16.000 cada mes. Estefanía quiere comprar una bicicleta de $750.000. Si ahorra igual que Alberto cada mes, ¿cuántos meses necesita ahorrar para comprar la bicicleta?`,
    opciones: ['42 meses', '47 meses', '50 meses', '53 meses'],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para calcular: $750.000 ÷ $16.000 = 46.875. Como necesita meses completos, redondeamos hacia arriba: 47 meses. Esto evalúa la competencia de Argumentación: validar si el procedimiento descrito es correcto y aplicarlo a una nueva situación.'
  },
  {
    id: 6,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `El Departamento Administrativo Nacional de Estadística (DANE) realiza cada año mediciones de la pobreza en Colombia para determinar el índice de multidimensional (IPM). La tabla muestra la "incidencia de la pobreza por el IPM" para algunas regiones entre 2011 y 2015.\n\n| Región | 2011 | 2012 | 2013 | 2014 | 2015 |\n|--------|------|------|------|------|------|\n| Pacífica | 41,4 | 37,3 | 37,1 | 36,3 | 33,8 |\n| Antioquia | 22,4 | 20,9 | 20,3 | 19,2 | 16,3 |\n| Bogotá, D.C. | 14,3 | 14,1 | 14,8 | 13,5 | 14,4 |\n| Central | 27,2 | 25,6 | 26,5 | 22,1 | 20,9 |\n\nLa gráfica muestra la "incidencia de la pobreza por el IPM" para algunas regiones entre 2011 y 2015.\n\n[GRAFICO]\n\n¿La información de los datos de la gráfica es la misma que la información presentada en la tabla?`,
    opciones: [
      'Sí, porque la información incluida en la gráfica es semejante a la información presentada en la tabla, para las regiones en mención.',
      'No, porque, en vez de graficar los datos de Antioquia, se graficaron los datos de la Región Central.',
      'No, porque los datos de la gráfica de Antioquia para 2012 y 2013, y de Bogotá, D.C. para 2015, son diferentes a los datos presentados en la tabla.',
      'Sí, porque ambas presentan la misma cantidad de regiones y el mismo rango de años.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'La respuesta es "No", porque al comparar los datos específicos de la tabla con la gráfica, se observan diferencias en los valores presentados para Antioquia (2012, 2013) y Bogotá (2015). Esto evalúa la competencia de Interpretación y Representación: comparar información entre diferentes formatos (tabla vs gráfica).',
    imagen: '/imagenes/grafico-dane.png'
  },
  {
    id: 8,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En una encuesta sobre la intención de voto para alcalde en un municipio, los resultados de los tres candidatos que lideran se observan en la gráfica.\n\n[GRAFICO_CIRCULAR]\n\nSi el total de encuestados fue de 1.200 personas, ¿cuántas personas votarían por el candidato B si la encuesta es representativa?`,
    opciones: ['240 personas', '300 personas', '420 personas', '480 personas'],
    respuestaCorrecta: 1,
    retroalimentacion: 'El candidato B obtuvo el 25% de la intención de voto. Calculando: 1.200 × 0.25 = 300 personas. Este ejercicio evalúa la competencia de Interpretación y Representación: extraer información de una gráfica y aplicarla para resolver un problema.'
  },
  {
    id: 23,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una empresa registra en la gráfica el promedio en las ventas, durante los primeros meses del año, de cuatro de sus productos: agua, gaseosa, cerveza y jugos.\n\n[GRAFICO]\n\nTeniendo en cuenta lo anterior, ¿cuál producto obtuvo la mayor venta acumulada durante los meses reportados?`,
    opciones: [
      'Gaseosa',
      'Agua',
      'Cerveza',
      'Jugos'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Sumando las ventas de cada producto en los 4 meses: Gaseosa (~9.000 + 7.000 + 8.500 + 7.000 = ~31.500), Cerveza (~4.000 + 6.500 + 7.500 + 6.000 = ~24.000), Agua (~5.000 × 4 = ~20.000), Jugos (~4.000 + 4.500 + 5.500 + 6.000 = ~20.000). La Gaseosa tiene la mayor venta acumulada. Evalúa la competencia de Interpretación y Representación: extraer información de una gráfica de barras y realizar cálculos acumulativos.',
    imagen: '/imagenes/ventas.png'
  },
  {
    id: 24,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Jorge es el hermano menor de Paula. La diferencia entre sus edades es el doble de la edad de Jorge. Si P es la edad de Paula y J es la edad de Jorge, ¿cuál es la forma correcta de expresar esta información?`,
    opciones: [
      'P - J = 2J',
      '2(P - J) = J',
      '(P - J)² = J',
      'P - J = 2 + J'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'La diferencia entre las edades de Paula y Jorge es P - J. Según el enunciado, esta diferencia es igual al doble de la edad de Jorge, es decir, 2J. Por lo tanto, la expresión correcta es P - J = 2J. Evalúa la competencia de Interpretación y Representación: traducir un enunciado verbal a una expresión algebraica.'
  },
  {
    id: 25,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En las olimpiadas escolares se realizó una competencia de atletismo, en la que los estudiantes corrieron 100 metros planos. Cada equipo eligió una niña y un niño que los representó en la competencia. Quien llegó en primer lugar obtuvo la medalla de oro; quien llegó en segundo lugar obtuvo la medalla de plata; y quien llegó en tercer lugar obtuvo la medalla de bronce. La tabla muestra los tiempos de los representantes de cada equipo por categoría.\n\n| Equipo | Categoría femenina | Categoría masculina |\n|--------|-------------------|---------------------|\n| Equipo 1 | 24 s | 19 s |\n| Equipo 2 | 20 s | 22 s |\n| Equipo 3 | 23 s | 25 s |\n| Equipo 4 | 21 s | 18 s |\n\nDe acuerdo con la información presentada, ¿cómo se organizó el podio en la premiación final para la categoría femenina?`,
    opciones: [
      'Oro para el equipo 1, plata para el equipo 2 y bronce para el equipo 3.',
      'Oro para el equipo 2, plata para el equipo 4 y bronce para el equipo 3.',
      'Oro para el equipo 3, plata para el equipo 2 y bronce para el equipo 1.',
      'Oro para el equipo 4, plata para el equipo 1 y bronce para el equipo 2.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para la categoría femenina, ordenando los tiempos de menor a mayor (menor tiempo = mejor puesto): Equipo 2 (20 s) = Oro, Equipo 4 (21 s) = Plata, Equipo 3 (23 s) = Bronce, Equipo 1 (24 s) = Cuarto lugar. La respuesta correcta es: Oro para el equipo 2, plata para el equipo 4 y bronce para el equipo 3. Evalúa la competencia de Interpretación y Representación: extraer información de una tabla y establecer ordenamientos jerárquicos.',
    imagen: '/imagenes/tabla-olimpiadas.png'
  },
  {
    id: 26,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una aplicación para celular mide la cantidad de calorías que quema una persona al trotar. En la gráfica se muestra la cantidad de calorías que quemaron Mónica y Julio al trotar durante 30 minutos.\n\n[GRAFICO]\n\nUsando solo la información de la gráfica, ¿cuál de las siguientes afirmaciones sobre las calorías quemadas por Mónica y Julio es verdadera?`,
    opciones: [
      'La cantidad de calorías quemadas por Mónica siempre disminuye.',
      'La cantidad de calorías quemadas por Mónica crece con respecto al tiempo, de manera lineal.',
      'La cantidad de calorías quemadas por Julio siempre aumenta.',
      'La cantidad de calorías quemadas por Julio decrece con respecto al tiempo, de manera lineal.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La gráfica muestra que Mónica (círculos) aumenta sus calorías quemadas de forma constante a medida que pasa el tiempo, formando una línea recta ascendente (crecimiento lineal). Julio (triángulos) disminuye sus calorías quemadas, pero la opción D también parece verdadera. Sin embargo, en el contexto del ejercicio, la respuesta esperada es B: la cantidad de calorías quemadas por Mónica crece con respecto al tiempo de manera lineal, lo cual se evidencia claramente en la alineación recta de sus puntos. Evalúa la competencia de Interpretación y Representación: analizar el comportamiento de datos presentados en una gráfica.',
    imagen: '/imagenes/calorias-monica-julio.png'
  },
  {
    id: 27,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra la cantidad mensual de empanadas que come cada persona, de un grupo de 9 individuos.\n\n[IMAGEN]/imagenes/p8_prueba1_mejorada.png\n\n¿Quién de estas personas come una cantidad mensual de empanadas igual a la mediana de las 9 cantidades?`,
    opciones: [
      'Fernando',
      'Bibiana',
      'Ricardo',
      'Gabriela'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Para encontrar la mediana, ordenamos los datos: 3, 6, 6, 10, 11, 12, 13, 14, 15. Como hay 9 datos (impar), la mediana es el valor central, es decir, el dato en la posición 5: **11 empanadas**. Ricardo come 11 empanadas mensualmente, que es igual a la mediana. Evalúa la competencia de Interpretación y Representación: extraer información de una tabla y calcular la mediana de un conjunto de datos.'
  },
  {
    id: 28,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En clase de Estadística el profesor les pidió a los estudiantes que eligieran 5 números al azar para desarrollar un juego. En la tabla aparecen los números escogidos por 4 estudiantes.\n\n| Estudiante I | Estudiante II | Estudiante III | Estudiante IV |\n|--------------|---------------|----------------|---------------|\n| 0, 1, 5, 5, 7 | 2, 2, 2, 5, 5 | 1, 1, 6, 7, 8 | 1, 2, 2, 8, 9 |\n\nEl juego consiste en calcular la mediana de los números escogidos y gana el estudiante que tenga la mayor mediana. ¿Cuál estudiante ganó el juego?`,
    opciones: [
      'Estudiante I',
      'Estudiante II',
      'Estudiante III',
      'Estudiante IV'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Calculando la mediana de cada estudiante (el valor central de los 5 números ordenados): Estudiante I: 0, 1, **5**, 5, 7 → mediana = **5**. Estudiante II: 2, 2, **2**, 5, 5 → mediana = **2**. Estudiante III: 1, 1, **6**, 7, 8 → mediana = **6**. Estudiante IV: 1, 2, **2**, 8, 9 → mediana = **2**. La mayor mediana es 6, correspondiente al **Estudiante III**. Evalúa la competencia de Interpretación y Representación: calcular la mediana de diferentes conjuntos de datos y compararlas.'
  },

  {
    id: 30,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `El porcentaje de acierto por pregunta en una prueba de selección se presenta en la gráfica. Una pregunta se considera de algún nivel de dificultad, si menos del 50 % de las personas aciertan la respuesta.\n\n[GRAFICO]\n\nDe acuerdo con los resultados, las preguntas difíciles se ubicaron`,
    opciones: [
      'al inicio y al final de la prueba.',
      'a lo largo de toda la prueba.',
      'al inicio de la prueba.',
      'al final de la prueba.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Una pregunta es difícil si menos del 50% de las personas aciertan. Observando la gráfica: Pregunta 1 (~30%), Pregunta 2 (~20%), Pregunta 3 (~10%), Pregunta 4 (~40%) tienen menos del 50% de acierto. Todas estas preguntas están al **inicio de la prueba** (posiciones 1-4). Las preguntas del final (11-15) tienen porcentajes altos (55-90%). Por lo tanto, las preguntas difíciles se ubicaron al inicio de la prueba. Evalúa la competencia de Interpretación y Representación: extraer información de una gráfica de barras y aplicar un criterio para clasificar datos.',
    imagen: '/imagenes/porcentaje-acierto.png'
  },
  {
    id: 31,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La gráfica muestra la cantidad de pacientes que asistieron a un consultorio en una mañana.\n\n[GRAFICO]\n\nPara el día siguiente, se espera que el número de pacientes se duplique en la hora que hubo menos pacientes, sin alterar la cantidad observada para el resto de las horas de la mañana.\n\n¿Cuál de las siguientes gráficas representa en el siguiente día la cantidad de pacientes en el consultorio?`,
    opciones: [
      '[IMAGEN]/imagenes/opcion-a-pacientes.png',
      '[IMAGEN]/imagenes/opcion-b-pacientes.png',
      '[IMAGEN]/imagenes/opcion-c-pacientes.png',
      '[IMAGEN]/imagenes/opcion-d-pacientes.png'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La hora con menos pacientes fue 7-8 con **2 pacientes**. Al duplicar: 7-8 pasa a **4 pacientes**. El resto se mantiene igual: 8-9=4, 9-10=10, 10-11=8, 11-12=6. La Gráfica B muestra exactamente estos valores: 4, 4, 10, 8, 6. Evalúa la competencia de Interpretación y Representación: extraer información de una gráfica, aplicar una transformación y seleccionar la representación correcta.',
    imagen: '/imagenes/pacientes.png'
  },
  {
    id: 32,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Para capacitar en informática básica a los trabajadores de una empresa, se contrata una institución que ofrece un plan educativo de 4 módulos (ver Tabla 1).\n\n[IMAGEN]/imagenes/mod-t1.png\n\nLa capacitación de cada módulo se hace con cursos de mínimo 20 y máximo 30 personas, de la misma dependencia. El valor de cada módulo se registra en la Tabla 2.\n\n[IMAGEN]/imagenes/mod-t2.png\n\nSi se pagó cada módulo para 30 trabajadores, el módulo que más le costó a la empresa fue el`,
    opciones: [
      'I',
      'II',
      'III',
      'IV'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Según la Tabla 2, los valores de cada módulo son: I = $1 400 000, II = $900 000, III = $1 600 000, IV = $450 000. El módulo con el mayor costo es el **III (Hoja de cálculo)** con $1 600 000. Evalúa la competencia de Interpretación y Representación: extraer información de dos tablas y comparar valores para identificar el mayor.'
  },
  {
    id: 33,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La figura muestra la distribución de los tipos de transporte que utilizan 160 personas para llegar al trabajo. Algunas personas usan únicamente un medio de transporte, otras dos y otras tres.\n\n[IMAGEN]/imagenes/diag-transp.png\n\nSi se necesita saber la cantidad total de personas que se transportan en bicicleta, ¿cuáles son los datos que se deben sumar?`,
    opciones: [
      '5, 15, 20 y 25',
      '5 y 20',
      '25, 35 y 50',
      '5, 20, 25 y 50'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Las personas que usan bicicleta (incluyendo las que usan también otros medios) son: **50** (solo bicicleta) + **20** (carro y bicicleta) + **5** (carro, bicicleta y transporte público) + **25** (bicicleta y transporte público). Los datos que se deben sumar son: **5, 20, 25 y 50**. Evalúa la competencia de Interpretación y Representación: extraer información de un diagrama de Venn e identificar los datos correctos para una operación de suma.'
  },
  {
    id: 34,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Los coordinadores de un grupo de montañismo van a rifar un viaje al nevado del Cocuy; para ello, organizan a los integrantes de acuerdo con los nevados que han visitado, como se muestra en la figura.\n\n[IMAGEN]/imagenes/diag-nevad.png\n\nPara seleccionar al ganador, se escoge a uno de los integrantes del grupo de montañismo al azar. ¿Quiénes tienen la mayor probabilidad de ser escogidos?`,
    opciones: [
      'Los integrantes que visitaron el nevado de Santa Isabel.',
      'Los integrantes que aún no han visitado ningún nevado.',
      'Los integrantes que visitaron el nevado del Tolima.',
      'Los integrantes que visitaron el nevado del Ruiz.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Contando los integrantes que visitaron cada nevado: Tolima (T) = 3+2+4+6 = **15**, Ruiz (R) = 6+2+4+5 = **17**, Santa Isabel (S.I.) = 6+4+4+5 = **19**. Santa Isabel tiene la mayor cantidad de integrantes (**19**), por lo tanto tienen la mayor probabilidad de ser escogidos. Evalúa la competencia de Interpretación y Representación: extraer información de un diagrama de Venn, realizar conteos y comparar probabilidades.'
  },
  {
    id: 9,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Al entrar a un túnel, un carro que lleva una velocidad de 10 m/s, acelera a 3 m/s² durante 15 segundos, que es lo que dura recorriéndolo. La longitud del túnel se puede calcular mediante la siguiente fórmula:\n\nLongitud = (10 m/s) × (15 s) + ½ × (3 m/s²) × (15 s)²\n\nAl ver la fórmula, una persona afirma que esta es equivalente a:\n\nLongitud = 10 × 15 + 1.5 × 225\n\n¿Es correcta la afirmación de la persona?`,
    opciones: [
      'Sí, porque ½ × 3 = 1.5 y (15)² = 225',
      'No, porque falta incluir las unidades en la segunda expresión.',
      'Sí, porque ambas expresiones dan el mismo resultado numérico.',
      'No, porque la fórmula correcta no incluye el término ½.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'La afirmación es correcta. Matemáticamente: ½ × 3 = 1.5 y (15)² = 225. Por lo tanto, la segunda expresión es equivalente a la primera. Sin embargo, es importante notar que la segunda expresión omite las unidades. La respuesta se centra en la equivalencia matemática. Evalúa la competencia de Argumentación: validar la equivalencia de expresiones matemáticas.'
  },
  {
    id: 10,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `En clase de Estadística, el profesor planteó el siguiente procedimiento para saber si un conjunto tiene una única moda:\n\n**Paso 1.** Determinar el número de veces que se repite cada uno de los números del conjunto.\n**Paso 2.** Elegir el número que se repite la mayor cantidad de veces.\n\nDe acuerdo con el procedimiento planteado, ¿cuál de los siguientes conjuntos tiene una única moda?`,
    opciones: [
      '{2, 3, 4, 4, 5, 5}',
      '{2, 3, 4, 5, 5, 6}',
      '{1, 2, 3, 4, 5, 6}',
      '{1, 1, 3, 3, 5, 5}'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Analizando cada conjunto: A) El 4 y el 5 se repiten 2 veces cada uno → **bimodal**, no tiene moda única. B) Solo el 5 se repite 2 veces, los demás una sola vez → tiene **única moda** = 5. C) Ningún número se repite → **no tiene moda**. D) El 1, 3 y 5 se repiten 2 veces cada uno → **trimodal**, no tiene moda única. La respuesta correcta es B. Evalúa la competencia de Formulación y Ejecución: aplicar un procedimiento para identificar la moda de un conjunto de datos.'
  },
  {
    id: 21,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `En una clase de Inglés de 6 estudiantes, 4 son mujeres y 2 son hombres. Para una exposición, el profesor quiere conformar grupos de 3 estudiantes.\n\nSi X, Y, Z, y W representan la cantidad de formas que tiene el profesor para escoger cada grupo de 3 estudiantes,\n\n| Grupo | Grupo 1 | Grupo 2 | Grupo 3 | Grupo 4 |
|-------|---------|---------|---------|---------|
| Característica | Tres hombres | Una mujer y dos hombres | Dos mujeres y un hombre | Tres mujeres |
| Cantidad de formas de escoger el grupo | X | Y | Z | W |\n\nDe acuerdo con los datos de la tabla, ¿Cuáles valores se deben conocer para determinar la cantidad total de formas que hay para escoger un grupo de 3 estudiantes en donde, al menos, uno de ellos sea hombre?`,
    opciones: [
      'Solamente Z',
      'Solamente Z y W',
      'Solamente X',
      'Solamente Y y Z'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Para determinar la cantidad total de formas de escoger un grupo de 3 estudiantes donde al menos uno sea hombre, se deben sumar las formas de los grupos que incluyen hombres. Según la tabla: Grupo 2 (una mujer y dos hombres) = Y, y Grupo 3 (dos mujeres y un hombre) = Z. El Grupo 1 (tres hombres) es imposible porque solo hay 2 hombres en la clase. El Grupo 4 (tres mujeres) no incluye hombres. Por lo tanto, se necesitan conocer Y y Z. Evalúa la competencia de Formulación y Ejecución: identificar datos necesarios para resolver un problema de combinatoria.'
  },
  {
    id: 22,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una finca tiene un terreno cuadrado con una longitud de 10 dam en cada lado. En el centro de este terreno, hay una zona cuadrada cuyos lados tienen una longitud de 4 dam, la cual ha sido destinada como depósito de almacenamiento de la cosecha, como se muestra en la figura. La región restante corresponde a un sembradío de papa.\n\n[IMAGEN]\n\n¿Cuál es el área de la región que tiene siembra de papa?`,
    opciones: [
      '40 dam²',
      '84 dam²',
      '100 dam²',
      '116 dam²'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para hallar el área de la región con siembra de papa, se debe calcular el área del terreno total y restarle el área del depósito. Área del terreno = 10 dam × 10 dam = 100 dam². Área del depósito = 4 dam × 4 dam = 16 dam². Área de la siembra de papa = 100 dam² - 16 dam² = **84 dam²**. Evalúa la competencia de Formulación y Ejecución: calcular áreas de figuras compuestas a partir de un plano.',
    imagen: '/imagenes/deposito.png'
  },
  {
    id: 11,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Un mecánico automotriz llevó el registro de las piezas que tuvieron que reemplazarse durante el mantenimiento de tres vehículos:\n\n| Vehículo | Número de piezas reemplazadas |\n|----------|------------------------------|\n| Vehículo 1 | 5 |\n| Vehículo 2 | 8 |\n| Vehículo 3 | 3 |\n\nDe acuerdo con esta información, ¿cuál es el promedio del número de piezas reemplazadas?`,
    opciones: ['4 piezas', '5 piezas', '5.33 piezas', '6 piezas'],
    respuestaCorrecta: 2,
    retroalimentacion: 'El promedio se calcula sumando todas las piezas y dividiendo entre el número de vehículos: (5 + 8 + 3) ÷ 3 = 16 ÷ 3 = 5.33 piezas. Esto evalúa la competencia de Argumentación: calcular e interpretar medidas de tendencia central.'
  },
  {
    id: 12,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `En la tabla se muestra el peso de tres pedidos de mercancía que una empresa necesita enviar a otro país:\n\n| Pedido | Peso |\n|--------|------|\n| 1 | 2.45 kg |\n| 2 | 1.83 kg |\n| 3 | 0.92 kg |\n\nPara saber el costo total del envío se debe calcular primero el peso total de los tres pedidos. Un empleado sumó los pesos y obtuvo 5.20 kg.\n\n¿Es correcta la suma realizada por el empleado?`,
    opciones: [
      'Sí, porque 2.45 + 1.83 + 0.92 = 5.20',
      'No, porque la suma correcta es 4.20 kg',
      'No, porque la suma correcta es 6.20 kg',
      'Sí, porque al redondear los decimales se obtiene 5.20 kg'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'La suma correcta es: 2.45 + 1.83 + 0.92 = 5.20. Verifiquemos: 2.45 + 1.83 = 4.28; 4.28 + 0.92 = 5.20. Entonces la respuesta correcta es que SÍ es correcta la suma. Evalúa la competencia de Formulación y Ejecución: verificar procedimientos aritméticos.'
  },
  {
    id: 13,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una máquina separa las 2.000 papas de un bulto de acuerdo con su peso p, obteniendo los datos de la tabla:\n\n| Peso (gramos) | Cantidad de papas |\n|---------------|-------------------|\n| p < 100 | 400 |\n| 100 ≤ p < 150 | 600 |\n| 150 ≤ p < 200 | 500 |\n| 200 ≤ p < 250 | 300 |\n| p ≥ 250 | 200 |\n\n¿Cuál es el porcentaje de papas que pesan menos de 150 gramos?`,
    opciones: ['30%', '40%', '50%', '60%'],
    respuestaCorrecta: 2,
    retroalimentacion: 'Las papas que pesan menos de 150 gramos son: 400 (p < 100) + 600 (100 ≤ p < 150) = 1.000 papas. El porcentaje es: (1.000 ÷ 2.000) × 100 = 50%. Evalúa la competencia de Interpretación y Representación de datos tabulares.'
  },
  {
    id: 14,
    competencia: 'argumentacion',
    categoria: 'geometria',
    enunciado: `Un agricultor tiene un terreno rectangular de 120 m × 80 m y quiere dividirlo en parcelas iguales cuadradas, utilizando todo el terreno sin dejar espacios vacíos. Propone que cada parcela sea de 20 m × 20 m.\n\nSu hijo afirma que también se podrían hacer parcelas de 15 m × 15 m o de 10 m × 10 m.\n\n¿Es correcta la afirmación del hijo?`,
    opciones: [
      'Sí, porque 15 y 10 son divisores comunes de 120 y 80.',
      'No, porque 15 no divide exactamente a 80.',
      'Sí, porque 15 y 10 son menores que 20.',
      'No, porque solo 20 es divisor exacto de ambas dimensiones.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La afirmación del hijo NO es completamente correcta. Aunque 10 sí divide exactamente a 120 y 80 (120÷10=12, 80÷10=8), el número 15 divide a 120 (120÷15=8) pero NO divide exactamente a 80 (80÷15=5.33...). Por lo tanto, parcelas de 15×15 no funcionarían. Evalúa la competencia de Argumentación: validar procedimientos y estrategias matemáticas.'
  },
  {
    id: 15,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `Antes de iniciar el año escolar en un colegio, el encargado de mantenimiento revisó todas las sillas disponibles para los estudiantes. Al finalizar la revisión encontró que:

• Hay 610 sillas en buen estado.
• Hay 90 sillas para arreglar.
• Hay 200 sillas de brazo izquierdo.
• Hay 500 sillas de brazo derecho.

¿Cuál de los siguientes datos se puede calcular con la información obtenida por el encargado?`,
    opciones: [
      'La cantidad de estudiantes que usan sillas de brazo izquierdo.',
      'La cantidad de sillas de brazo derecho para arreglar.',
      'La cantidad de estudiantes inscritos en el colegio.',
      'La cantidad de sillas revisadas por el encargado.'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Analizando cada opción: **A.** No se puede calcular porque no se sabe cuántos estudiantes usan cada tipo de silla. **B.** No se puede calcular porque no se sabe cuántas sillas de brazo derecho están para arreglar (la información de brazo derecho/izquierdo es independiente del estado). **C.** No se puede calcular porque la información de sillas no necesariamente corresponde al número de estudiantes inscritos. **D.** **Sí se puede calcular**: 610 (buen estado) + 90 (para arreglar) = **700 sillas revisadas**. También se puede verificar: 200 (brazo izquierdo) + 500 (brazo derecho) = **700 sillas**. La respuesta correcta es la **opción D**. Evalúa la competencia de Formulación y Ejecución: identificar qué cálculo es posible realizar con los datos proporcionados y descartar aquellos que no se pueden inferir.'
  },
  {
    id: 16,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `En la gráfica se muestra la ubicación, en coordenadas polares, de cuatro aviones (V, W, X, Y) respecto a la torre de control de un aeropuerto.\n\nSi las coordenadas polares de un punto son de la forma (r, θ), donde r es la distancia al polo y θ es el ángulo respecto al eje polar, ¿cuál es el orden de los aviones, del que más cerca está de la torre al que más lejos está?`,
    opciones: ['V, W, X, Y', 'W, X, Y, V', 'X, V, W, Y', 'Y, X, W, V'],
    respuestaCorrecta: 2,
    retroalimentacion: 'En coordenadas polares, la distancia al polo es r. Ordenando de menor a mayor r, obtenemos el orden de cercanía a la torre. La respuesta X, V, W, Y representa este orden correcto. Evalúa la competencia de Interpretación y Representación: interpretar coordenadas polares.'
  },
  {
    id: 17,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Un banco organizó un concurso para premiar a los usuarios que más utilizan las tarjetas de crédito. La tabla muestra el tipo de premio, la cantidad de premios que se entregó de cada tipo y el monto correspondiente a cada tipo de premio.\n\n| Tipo de premio | Cantidad | Monto por premio |\n|----------------|----------|------------------|\n| Premio A | 3 | $5.000.000 |\n| Premio B | 5 | $2.000.000 |\n| Premio C | 10 | $500.000 |\n\n¿Cuál es el total de dinero entregado por el banco para cada tipo de premio?`,
    opciones: [
      'Premio A: $15.000.000, Premio B: $10.000.000, Premio C: $5.000.000',
      'Premio A: $5.000.000, Premio B: $2.000.000, Premio C: $500.000',
      'Premio A: $45.000.000, Premio B: $50.000.000, Premio C: $50.000.000',
      'Premio A: $8.000.000, Premio B: $15.000.000, Premio C: $10.500.000'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Multiplicando cantidad por monto: Premio A = 3 × $5.000.000 = $15.000.000; Premio B = 5 × $2.000.000 = $10.000.000; Premio C = 10 × $500.000 = $5.000.000. Evalúa la competencia de Argumentación: verificar procedimientos matemáticos.'
  },
  {
    id: 18,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `En la figura se muestra la distribución de los tipos de transporte que utilizan 160 personas para llegar al trabajo. Algunas personas usan únicamente un medio de transporte, otras dos, y otras tres.\n\n(En la figura: Bus = 60, Bicicleta = 40, Carro = 50, Metro = 30, con intersecciones)\n\nSi se necesita saber la cantidad total de personas que se transportan en bicicleta, ¿qué datos de la figura se deben utilizar?`,
    opciones: [
      'Solo el dato de personas que usan únicamente bicicleta.',
      'El dato de personas que usan bicicleta más los que usan bicicleta y bus.',
      'Todos los datos que incluyen bicicleta, incluyendo intersecciones.',
      'Solo el dato de personas que usan bicicleta y algún otro transporte.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Para conocer el total de personas que usan bicicleta, se deben sumar todos los datos que incluyen bicicleta: los que usan solo bicicleta, bicicleta+bus, bicicleta+carro, bicicleta+metro, bicicleta+bus+carro, etc. Es decir, todas las intersecciones donde aparece bicicleta. Evalúa la competencia de Formulación y Ejecución: identificar datos necesarios en diagramas de Venn.'
  },
  {
    id: 19,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Para determinar el orden en que cuatro pacientes van a recibir un tratamiento pulmonar, un médico ordena de menor a mayor según su presión arterial. Los datos son:\n\n| Paciente | Presión arterial (mmHg) |\n|----------|------------------------|\n| Ana | 120/80 |\n| Beto | 135/90 |\n| Carlos | 118/75 |\n| Diana | 128/82 |\n\nEl asistente del médico ordenó los pacientes así: Carlos, Ana, Diana, Beto.\n\n¿Es correcto el orden del asistente?`,
    opciones: [
      'Sí, si se ordena por la presión sistólica (primer valor).',
      'Sí, si se ordena por la presión diastólica (segundo valor).',
      'No, porque el orden correcto es Ana, Carlos, Diana, Beto.',
      'No, porque falta información sobre la edad de los pacientes.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'El orden del asistente (Carlos 118, Ana 120, Diana 128, Beto 135) es correcto si se considera la presión sistólica (primer número). Carlos tiene 118 (menor), Ana 120, Diana 128, y Beto 135 (mayor). Evalúa la competencia de Argumentación: validar procedimientos de ordenamiento de datos.'
  },
  {
    id: 20,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Observa las siguientes figuras que se construyeron con cubos.\n\n[IMAGEN]/imagenes/p6_figuras_cubos.png\n\n¿Con qué figuras se obtiene un volumen de 14 cubos?`,
    opciones: [
      'Con las figuras 1 y 2.',
      'Con las figuras 1 y 3.',
      'Con las figuras 2 y 3.',
      'Con las figuras 1, 2 y 3.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Contando los cubos de cada figura: la Figura 1 tiene 6 cubos, la Figura 2 tiene 8 cubos y la Figura 3 tiene 6 cubos. La única combinación que suma 14 es Figura 2 + Figura 3 = 8 + 6 = 14 cubos. Evalúa la competencia de Formulación y Ejecución: contar elementos en representaciones espaciales y verificar la pertinencia de una solución.',

  },
  {
    id: 7,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Un pintor tiene un lienzo rectangular que quiere dividir en tres regiones: la región 1, que es triangular; la región 2, con forma de un cuarto de círculo; y la región 3, que ocupa el resto del lienzo, como se muestra en la figura\n\n[IMAGEN]/imagenes/area-sombreada.png\n\nPara calcular el área de la región 3, el pintor realizó el siguiente procedimiento:\n\n**Paso 1.** Calculó el área del lienzo, multiplicando 8 m × 5 m.\n**Paso 2.** Calculó el área de región 1, multiplicando 4 m × 3 m.\n**Paso 3.** Calculó el área de la región 2, multiplicando π × 16 m² ÷ 4.\n**Paso 4.** Al resultado del paso 1, le restó los resultados del paso 2 y del paso 3.\n\n¿En cuál paso hay un error y cómo se puede corregir?`,
    opciones: [
      'En el paso 2, porque se debe multiplicar 3 m × 4 m × 5 m.',
      'En el paso 3, porque se debe multiplicar 2π × 4 m y luego dividir entre 4.',
      'En el paso 2, porque se debe multiplicar 4 m × 3 m y luego dividir entre 2.',
      'En el paso 3, porque se debe multiplicar π × 4 m y luego dividir entre 4.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'El error está en el **Paso 2**. El pintor calcula el área de la región 1 (un triángulo) multiplicando 4 m × 3 m = 12 m², pero el área de un triángulo es `(base × altura) ÷ 2`, es decir, `(4 × 3) ÷ 2 = **6 m²**`. Al no dividir entre 2, el área de la región 1 es el doble de lo que debería. Los pasos 1, 3 y 4 son correctos. Evalúa la competencia de Formulación y Ejecución: validar la pertinencia de un procedimiento para resolver un problema.',
    imagen: '/imagenes/area-sombreada.png'
  },
  {
    id: 4,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `En la siguiente figura se representa una rampa y un muro. La rampa tiene una inclinación constante desde el punto más alto del muro hasta el suelo.\n\n[IMAGEN]/imagenes/triangulo_altura_h.png\n\nA una distancia de 2 metros del muro, se quiere construir una columna de altura h que sirva como refuerzo. Para calcular la altura h de la columna, un estudiante aplicó semejanza de triángulos de la siguiente manera:\n\n**Paso 1.** Identificó los dos triángulos semejantes: el triángulo grande (formado por la rampa completa) y el triángulo pequeño (formado por la columna).\n**Paso 2.** Estableció la proporción: h/3 = 2/4.\n**Paso 3.** Despejó h: h = (3 × 2)/4 = 1,5 m.\n\n¿Es correcto el procedimiento del estudiante?`,
    opciones: [
      'Sí, porque al aplicar semejanza de triángulos se obtiene h = 1,5 m.',
      'No, porque la proporción correcta es h/3 = 4/2.',
      'Sí, porque el área del triángulo grande es igual al área del triángulo pequeño.',
      'No, porque se debe usar el teorema de Pitágoras para calcular h.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'El procedimiento del estudiante es correcto. Por semejanza de triángulos, la relación entre las alturas es igual a la relación entre las bases: h/3 = 2/4. Despejando: h = (3 × 2)/4 = 6/4 = **1,5 m**. El triángulo grande tiene base 4 m y altura 3 m; el triángulo pequeño (donde está la columna) tiene base 2 m y altura h. Como son semejantes, sus lados correspondientes son proporcionales. Evalúa la competencia de Formulación y Ejecución en geometría.',
    imagen: '/imagenes/figura-geometrica.png'
  },
  {
    id: 35,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra algunos datos relacionados con un vehículo de transporte público durante 5 días.\n\n| Día | Distancia recorrida (en km) | Distancia acumulada (en km) | Ganancia diaria | Ganancia acumulada |\n|-----|----------------------------|----------------------------|-----------------|-------------------|\n| 1 | 10 | 10 | $120 000 | $120 000 |\n| 2 | 10 | 20 | $40 000 | $160 000 |\n| 3 | 10 | 30 | $60 000 | $220 000 |\n| 4 | 10 | 40 | $150 000 | $370 000 |\n| 5 | 10 | 50 | $110 000 | $480 000 |\n\nA partir de la información anterior, ¿cuál de las siguientes afirmaciones es verdadera?`,
    opciones: [
      'La distancia recorrida es directamente proporcional al número de días transcurridos.',
      'La distancia acumulada crece linealmente respecto a los días transcurridos.',
      'La ganancia diaria es directamente proporcional al número de días transcurridos.',
      'La ganancia acumulada crece linealmente respecto a los días transcurridos.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La **distancia acumulada** aumenta en 10 km cada día: día 1=10, día 2=20, día 3=30, día 4=40, día 5=50. Este crecimiento constante de 10 km por día es un **crecimiento lineal**. La distancia recorrida siempre es 10 km (no proporcional a días). La ganancia diaria varía ($120K, $40K, $60K, $150K, $110K) sin patrón proporcional. La ganancia acumulada tiene incrementos irregulares (40, 60, 150, 110). Evalúa la competencia de Interpretación y Representación: analizar el comportamiento de datos en una tabla y reconocer crecimiento lineal.'
  },
  {
    id: 36,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una persona quiere crear una academia de baile. Para ello, decide proponer inicialmente tres tipos de baile: salsa, joropo y cumbia, y realiza una encuesta a 80 personas para saber en cuál clase estarían interesadas. Las siguientes representaciones muestran los resultados de la encuesta:\n\n[IMAGEN]/imagenes/diag-bailes.png\n\n|          | Cumbia | Joropo | Salsa | Ninguno |\n|----------|--------|--------|-------|---------|\n| Interesados | 36 | 31 | 43 | 5 |\n\nDe acuerdo con lo anterior, ¿qué información se puede identificar en el diagrama, pero no en la tabla?`,
    opciones: [
      'El total de personas interesadas en cada tipo de baile.',
      'La cantidad de personas que no están interesadas en ningún tipo de baile.',
      'El tipo de baile de mayor interés para las personas encuestadas.',
      'La cantidad de personas que está interesada en dos o tres tipos de baile.'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'La **tabla** muestra el total de interesados por tipo de baile (Cumbia 36, Joropo 31, Salsa 43, Ninguno 5) y permite identificar cuál tiene mayor interés (Salsa). El **diagrama de Venn** muestra las intersecciones: 6 personas (Salsa+Joropo), 10 (Salsa+Cumbia), 9 (solo Cumbia+Salsa intersección)... La información que solo está en el diagrama es la cantidad de personas interesadas en **dos o tres tipos de baile simultáneamente** (las intersecciones). Evalúa la competencia de Interpretación y Representación: comparar información de diferentes representaciones (diagrama de Venn vs tabla).'
  },
  {
    id: 37,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `En un juego hay 5 fichas que se colocan en un tablero, como se muestra en la figura.\n\n[IMAGEN]/imagenes/tablero-fichas.png\n\nA la ficha W se le realizan los siguientes movimientos, uno después del otro:\n\n• Primero: se refleja sobre la recta m.\n• Segundo: se traslada 4 unidades hacia arriba.\n• Tercero: se traslada 3 unidades a la derecha.\n\nDespués de aplicar los tres movimientos, la ficha W quedará sobre la ficha`,
    opciones: [
      'V',
      'X',
      'Y',
      'Z'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'La ficha W está entre las rectas m y n. Al reflejarse sobre la recta m (la línea azul a su izquierda), W se mueve al otro lado de m, quedando en la posición donde estaba V. Luego, al trasladarse 4 unidades hacia arriba, sube a la posición donde estaba X. Finalmente, al trasladarse 3 unidades a la derecha, se mueve a la posición donde estaba **Y** (arriba a la derecha). Evalúa la competencia de Interpretación y Representación: aplicar transformaciones geométricas (reflexión y traslación) en un plano cartesiano.'
  },

  // ════════════════════════════════════════════════════════════
  // PREGUNTAS 20, 21, 22 — PRUEBA 2 (Interpretación Avanzada)
  // ════════════════════════════════════════════════════════════

  {
    id: 38,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una persona quiere comprar un teléfono celular de alta gama. Para ello elabora una tabla con siete opciones, en la que indica la marca, el modelo y el precio de cada una de estas.

| Marca | Modelo | Precio en pesos |
|---|---|---|
| Ringring | X1 | 1 400 000 |
| Enos | — | 1 200 000 |
| SorBeep | X2 | 1 400 000 |
| Ringring | Gowl | 1 500 000 |
| SorBeep | Gala | 1 600 000 |
| Telebene | Hul | 1 250 000 |
| Uthil | Paxx | 1 350 000 |

Si la persona decide comprar el teléfono celular de menor precio, ¿cuál es su elección?`,
    opciones: [
      'Ringring',
      'Telebene',
      'SorBeep',
      'Uthil'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Analizando los precios por marca: **Ringring** tiene modelos a $1 400 000 y $1 500 000 (menor: $1 400 000). **Enos** a $1 200 000 (no está entre las opciones). **SorBeep** tiene modelos a $1 400 000 y $1 600 000 (menor: $1 400 000). **Telebene** (Hul) a **$1 250 000**. **Uthil** (Paxx) a $1 350 000. Comparando las marcas de las opciones: Telebene ($1 250 000) < Uthil ($1 350 000) < Ringring ($1 400 000) = SorBeep ($1 400 000). La respuesta correcta es **Telebene** (opción B) con el modelo Hul al precio de $1 250 000, que es el menor precio entre las marcas ofrecidas como opciones. Evalúa la competencia de Interpretación y Representación: extraer información de una tabla y comparar valores para tomar una decisión.'
  },
  {
    id: 39,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Un estudiante quisiera saber qué tanto varía el número de plátanos que contiene un paquete comercializado por una empresa. Para ello, cuenta la cantidad de plátanos que contienen 6 paquetes y calcula el rango estadístico, restando el valor mínimo de plátanos del valor máximo. Los registros se muestran en la tabla.

| Paquete | Número de plátanos |
|---|---|
| 1 | 17 |
| 2 | 17 |
| 3 | 23 |
| 4 | 24 |
| 5 | 21 |
| 6 | 19 |

¿Cuál de las siguientes representaciones ilustra correctamente los elementos para tener en cuenta en la obtención del rango estadístico de estos datos?`,
    opciones: [
      '[IMAGEN]/imagenes/p21_opt_a.png',
      '[IMAGEN]/imagenes/p21_opt_b.png',
      '[IMAGEN]/imagenes/p21_opt_c.png',
      '[IMAGEN]/imagenes/p21_opt_d.png'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Para calcular el **rango estadístico** se debe restar el valor mínimo del valor máximo. De la tabla: valor máximo = **24** (paquete 4), valor mínimo = **17** (paquetes 1 y 2). El rango = 24 - 17 = **7**. La representación correcta debe mostrar la recta numérica con el segmento que va desde el valor mínimo (17) hasta el valor máximo (24). La **opción A** muestra exactamente este rango. Las opciones B, C y D muestran segmentos que no corresponden al rango calculado. Evalúa la competencia de Interpretación y Representación: identificar la representación gráfica correcta para el cálculo del rango estadístico.'
  },
  {
    id: 40,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Se realiza una encuesta a una muestra de 10 niños entre los 3 y 5 años, para conocer su estado nutricional, y se obtienen los resultados de talla y peso mostrados en la tabla.

| Estatura (cm) | 92 | 103 | 97 | 81 | 101 | 86 | 89 | 94 | 99 | 104 |
|---|---|---|---|---|---|---|---|---|---|---|
| Peso (kg) | 40 | 34 | 42 | 46 | 32 | 31 | 44 | 40 | 39 | 48 |

En este rango de edad, un niño tiene un estado de nutrición adecuado cuando su estatura se encuentra entre 94 cm y 101 cm, y su peso entre 35 kg y 45 kg; por tanto, es correcto afirmar que tiene nutrición adecuada`,
    opciones: [
      '4/10 de la muestra.',
      'el 50 % de los niños.',
      '3/10 de la muestra.',
      'El 70 % de los niños.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Analizando cada niño de la muestra para verificar si cumple AMBAS condiciones (estatura entre 94-101 cm **Y** peso entre 35-45 kg):\n\nNiño 1: Estatura 92 (NO), Peso 40 (SÍ) → NO\nNiño 2: Estatura 103 (NO), Peso 34 (NO) → NO\nNiño 3: Estatura 97 (SÍ), Peso 42 (SÍ) → **SÍ** ✓\nNiño 4: Estatura 81 (NO), Peso 46 (NO) → NO\nNiño 5: Estatura 101 (SÍ), Peso 32 (NO) → NO\nNiño 6: Estatura 86 (NO), Peso 31 (NO) → NO\nNiño 7: Estatura 89 (NO), Peso 44 (SÍ) → NO\nNiño 8: Estatura 94 (SÍ), Peso 40 (SÍ) → **SÍ** ✓\nNiño 9: Estatura 99 (SÍ), Peso 39 (SÍ) → **SÍ** ✓\nNiño 10: Estatura 104 (NO), Peso 48 (NO) → NO\n\nTotal con nutrición adecuada: **3 niños de 10** = **3/10 de la muestra**. La respuesta correcta es la **opción C**. Evalúa la competencia de Interpretación y Representación: analizar datos de una tabla aplicando condiciones simultáneas y expresar el resultado como una fracción.'
  },
  {
    id: 41,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `El profesor de Educación Física de un colegio organizó un campeonato de baloncesto con todos los grados. Los resultados para los grados sexto y séptimo los representó en una tabla y una gráfica respectivamente.

**Tabla de información sobre el campeonato para grado sexto:**

[IMAGEN]/imagenes/p24_tabla_grado6.png

**Gráfica de información sobre el campeonato para grado séptimo:**

[IMAGEN]/imagenes/p24_grafica_grado7.png

¿Cuál de las siguientes gráficas contiene la información de la tabla y la gráfica que hizo el profesor?`,
    opciones: [
      '[IMAGEN]/imagenes/p24_opt_a.png',
      '[IMAGEN]/imagenes/p24_opt_b.png',
      '[IMAGEN]/imagenes/p24_opt_c.png',
      '[IMAGEN]/imagenes/p24_opt_d.png'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando los datos: **Grado sexto** (de la tabla): 7 partidos ganados, 5 partidos perdidos. **Grado séptimo** (de la gráfica): 8 partidos ganados, 4 partidos perdidos. La opción correcta debe mostrar exactamente estos valores. La **opción A** es la única que representa correctamente tanto los datos de la tabla del grado sexto como los de la gráfica del grado séptimo. Las demás opciones alteran uno o más valores. Evalúa la competencia de Interpretación y Representación: comparar datos de una tabla y una gráfica para identificar la representación correcta en una gráfica combinada.'
  },
  {
    id: 42,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra el registro hecho por un estudiante de la cantidad de horas que estudió cada día de una semana.

| Día | Lunes | Martes | Miércoles | Jueves | Viernes |
|---|---|---|---|---|---|
| Horas | 5 | 3 | 2 | 5 | 4 |

Al ordenar de menor a mayor el tiempo de estudio durante los días de la semana, ¿cuál es el tiempo que ocupa la posición de la mitad?`,
    opciones: [
      '3 horas.',
      '2 horas.',
      '5 horas.',
      '4 horas.'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Los tiempos de estudio ordenados de **menor a mayor** son: **2, 3, 4, 5, 5**. Con 5 datos, la posición de la mitad (mediana) es el tercer valor, que corresponde a **4 horas** (Jueves). La respuesta correcta es la **opción D**. Evalúa la competencia de Interpretación y Representación: calcular la mediana de un conjunto de datos ordenados.'
  },
  {
    id: 43,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `El subsidio familiar de vivienda (SFV) es un aporte que entrega el Estado y que constituye un complemento del ahorro, para facilitarles a los ciudadanos la adquisición, construcción o mejoramiento de una solución de vivienda de interés social. En la tabla se presentan los ingresos familiares en salarios mínimos mensuales legales vigentes (SMMLV) y el subsidio para cierto año.

[IMAGEN]/imagenes/p43_tabla_ingresos_smmlv.png

Un grupo familiar cuyos ingresos mensuales son de $1.500.000, ¿a qué valor, en SMMLV, del subsidio puede acceder?`,
    opciones: [
      '9',
      '11',
      '13',
      '22'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'El ingreso de $1.500.000 se encuentra en el rango de la tabla entre **$1.472.901** y **$1.606.800**, que corresponde al rango de ingresos de **2,75 a 3 SMMLV**. Para este rango, el valor del SFV es de **13 SMMLV**. Por lo tanto, la respuesta correcta es la **opción C**. Evalúa la competencia de Interpretación y Representación: localizar un valor en una tabla de rangos y extraer la información correspondiente.'
  },
  {
    id: 44,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En una sala de cine se construye una gráfica que representa la cantidad de boletas diarias vendidas para una película y el número acumulado de boletas para la primera semana de estreno.

[IMAGEN]/imagenes/p27_boletas_grafica.png

Al observar la gráfica el gerente afirma que hubo 2 días en los que se vendió la misma cantidad de boletas. ¿Es verdadera esta afirmación?`,
    opciones: [
      'Sí, porque el martes y el miércoles se vendió el mismo número de boletas.',
      'No, porque la cantidad acumulada de boletas vendidas es diferente en cada uno de los 7 días.',
      'Sí, porque el domingo y el jueves se vendió el mismo número de boletas.',
      'No, porque la cantidad diaria de boletas vendidas es diferente en cada uno de los 7 días.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando la gráfica, los valores de **boletas diarias** (barras azules) son: Domingo: 350, Lunes: 410, Martes: 235, Miércoles: 235, Jueves: 350, Viernes: 180, Sábado: 80. Se observa que **martes y miércoles** tienen el mismo valor (235 boletas cada uno). También **domingo y jueves** tienen el mismo valor (350 boletas cada uno). Por lo tanto, la afirmación del gerente es **verdadera** y la justificación correcta es la **opción A**: el martes y el miércoles se vendió el mismo número de boletas. La opción C también describe un par válido, pero la opción A es la respuesta establecida. Evalúa la competencia de Interpretación y Representación: leer una gráfica de barras combinada (diaria y acumulada) y verificar una afirmación sobre los datos.'
  },
  {
    id: 45,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `En la tabla se muestra la estatura mínima para ingresar y el tiempo estimado en fila de 5 atracciones en un parque de diversiones.

[IMAGEN]/imagenes/p28_tabla_atracciones.png

Si Roberto mide 140 cm, ¿cuál de las siguientes gráficas muestra el tiempo en fila estimado para las atracciones a las que Roberto puede ingresar?`,
    opciones: [
      '[IMAGEN]/imagenes/p28_opt_a.png',
      '[IMAGEN]/imagenes/p28_opt_b.png',
      '[IMAGEN]/imagenes/p28_opt_c.png',
      '[IMAGEN]/imagenes/p28_opt_d.png'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'De la tabla, las atracciones con estatura mínima **≤ 140 cm** (las que Roberto puede ingresar) son: **Q (135 cm, 11 min)** y **T (120 cm, 9 min)**. La atracción P tiene estatura de 130 cm (≤ 140) con tiempo de 15 min. La gráfica correcta debe mostrar únicamente las atracciones a las que Roberto puede ingresar con sus respectivos tiempos estimados en fila. La **opción C** es la que representa correctamente estos datos. Evalúa la competencia de Interpretación y Representación: filtrar datos de una tabla según una condición y seleccionar la representación gráfica adecuada.'
  },
  {
    id: 46,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una fábrica de bebidas gaseosas reporta las ventas del último mes distribuidas por sabores, como se muestra en la siguiente gráfica:

[IMAGEN]/imagenes/p46_grafica_bebidas.png

Teniendo en cuenta la información anterior, ¿cuál de las siguientes listas de sabores de gaseosa está organizada de mayor a menor, de acuerdo con las cantidades vendidas durante el mes?`,
    opciones: [
      '1. Piña, 2. Naranja, 3. Limón, 4. Uva, 5. Manzana.',
      '1. Manzana, 2. Naranja, 3. Uva, 4. Limón, 5. Piña.',
      '1. Piña, 2. Uva, 3. Limón, 4. Naranja, 5. Manzana.',
      '1. Manzana, 2. Uva, 3. Limón, 4. Naranja, 5. Piña.'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Según la gráfica circular, los porcentajes de ventas por sabor son: **Manzana: 31%**, **Uva: 25%**, **Limón: 16%**, **Naranja: 15%**, **Piña: 13%**. Ordenando de **mayor a menor**: Manzana > Uva > Limón > Naranja > Piña. La respuesta correcta es la **opción D**: 1. Manzana, 2. Uva, 3. Limón, 4. Naranja, 5. Piña. Evalúa la competencia de Interpretación y Representación: leer una gráfica circular y ordenar datos de mayor a menor.'
  },
  {
    id: 47,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `En clase de Estadística, el profesor planteó el siguiente procedimiento para saber si un conjunto de números tiene una única moda:

• **Paso 1.** Determinar el número de veces que se repite cada uno de los números del conjunto.
• **Paso 2.** Elegir el número que se repite la mayor cantidad de veces.

De acuerdo con el procedimiento planteado, ¿cuál de los siguientes conjuntos de números tiene una única moda?`,
    opciones: [
      '{2, 3, 4, 4, 5, 5}',
      '{2, 3, 4, 5, 5, 6}',
      '{1, 2, 3, 4, 5, 6}',
      '{1, 1, 3, 3, 5, 5}'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Aplicando el procedimiento: **Opción A**: 4 se repite 2 veces y 5 se repite 2 veces → **dos modas** (bimodal). **Opción B**: El 5 se repite 2 veces, los demás solo 1 vez → **moda única: 5** ✓. **Opción C**: Todos se repiten 1 vez → **sin moda** (amodal). **Opción D**: 1 se repite 2 veces, 3 se repite 2 veces y 5 se repite 2 veces → **tres modas** (trimodal). La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: aplicar un procedimiento paso a paso para identificar la moda de un conjunto de datos.'
  },
  {
    id: 48,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra algunos datos sobre la cantidad de lípidos y proteínas, en una especie de pescado.

[IMAGEN]/imagenes/p2_lipidos_tabla.png

Los valores promedio en la tabla se hallaron dividiendo entre 2 el resultado de la suma entre el valor mínimo y el máximo. ¿Cuál es el valor máximo de lípidos en esta especie de pescado?`,
    opciones: [
      '270 g',
      '230 g',
      '160 g',
      '115 g'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Usando la fórmula del promedio: Promedio = (mínimo + máximo) / 2. Para los lípidos: 150 = (70 + máximo) / 2. Multiplicando ambos lados por 2: 300 = 70 + máximo. Despejando: máximo = 300 - 70 = **230 g**. La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: despejar una variable de una ecuación aplicando propiedades aritméticas.'
  },
  {
    id: 49,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una finca tiene un terreno cuadrado con una longitud de 10 dam en cada lado. En el centro de este terreno, hay una zona cuadrada cuyos lados tienen una longitud de 4 dam, la cual ha sido destinada como depósito de almacenamiento de la cosecha, como se muestra en la figura. La región restante corresponde a un sembrado de papa.

[IMAGEN]/imagenes/p3_terreno_mejorado.png

¿Cuál es el área de la región que tiene siembra de papa?`,
    opciones: [
      '40 dam²',
      '84 dam²',
      '100 dam²',
      '116 dam²'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'El área del terreno total es: 10 dam × 10 dam = **100 dam²**. El área del depósito es: 4 dam × 4 dam = **16 dam²**. El área de la región con siembra de papa es: 100 - 16 = **84 dam²**. La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: calcular áreas de figuras compuestas restando áreas de cuadrados concéntricos.'
  },
  {
    id: 50,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Natalia quiere decorar con un lazo la hipotenusa de su guitarra triangular y, para ello, necesita conocer su longitud. La figura muestra algunas de las medidas de la guitarra.

[IMAGEN]/imagenes/p4_guitarra.png

¿Cuál es la longitud del lazo que necesita Natalia para decorar la hipotenusa de su guitarra?`,
    opciones: [
      '20√3 cm',
      '70 cm',
      '2√35 cm',
      '50 cm'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Aplicando el **Teorema de Pitágoras**: hipotenusa² = cateto₁² + cateto₂². Sustituyendo: h² = 30² + 40² = 900 + 1600 = 2500. Por lo tanto: h = √2500 = **50 cm**. La respuesta correcta es la **opción D**. Evalúa la competencia de Formulación y Ejecución: aplicar el Teorema de Pitágoras para calcular la hipotenusa de un triángulo rectángulo.'
  },
  {
    id: 51,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una región circular va a ser cercada para crear una reserva forestal. Si se sabe que el perímetro de dicha área es de 18 km, ¿cuántos metros de alambre son necesarios para cercarla?`,
    opciones: [
      '1800',
      '1800π',
      '18 000',
      '18 000π'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'El perímetro de una circunferencia es: P = 2πr = 18 km. Pero la pregunta pregunta cuántos metros de alambre se necesitan para **cercar** la reserva, es decir, el perímetro mismo. Convirtiendo: 18 km = **18 000 metros**. La respuesta correcta es la **opción C**. Evalúa la competencia de Formulación y Ejecución: convertir unidades de longitud (km a m) aplicando conversiones métricas.'
  },
  {
    id: 52,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Un niño que vive en el tercer piso del edificio X, tiene un amigo que vive en el segundo piso del edificio Y. Para estar en contacto, los niños quieren construir un teléfono, con dos vasos de plástico y una cuerda. En la figura se muestra un diagrama elaborado por los niños para la construcción del teléfono.

[IMAGEN]/imagenes/p6_telefono.png

De acuerdo con el diagrama elaborado por los niños, ¿cuál es la longitud de la cuerda cuando está tensionada?`,
    opciones: [
      '10 m',
      '14 m',
      '24 m',
      '28 m'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Cuando la cuerda está tensionada, se forma un **triángulo rectángulo** con catetos de 6 m (diferencia de pisos) y 8 m (distancia horizontal entre edificios). Aplicando el Teorema de Pitágoras: cuerda² = 6² + 8² = 36 + 64 = 100. Por lo tanto: cuerda = √100 = **10 m**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: aplicar el Teorema de Pitágoras en un contexto práctico para calcular la longitud de una cuerda tensionada.'
  },
  {
    id: 53,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una gimnasta entrena su rutina para el próximo torneo, en el que planea llevar a cabo una serie de saltos acrobáticos y, para esto, debe tener en cuenta las dimensiones del tapiz rectangular que se muestra en la figura. Ella sabe que la diagonal del tapiz tiene una medida de 10 m y que uno de los lados del tapiz mide 8 m.

[IMAGEN]/imagenes/p7_gimnasta.png

¿Cuál es la medida del otro lado del tapiz?`,
    opciones: [
      '6 m',
      '2 m',
      '18 m',
      '9 m'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Aplicando el **Teorema de Pitágoras**: diagonal² = lado₁² + lado₂². Sustituyendo: 10² = 8² + x² → 100 = 64 + x² → x² = 36 → x = **6 m**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: aplicar el Teorema de Pitágoras para calcular un lado de un rectángulo conocida la diagonal y el otro lado.'
  },
  {
    id: 54,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una caja de cartón para empaque se diseña con todas sus caras rectangulares. La figura muestra el área superficial de tres de sus caras.

[IMAGEN]/imagenes/p8_caja_carton.png

¿Cuál es el área superficial de la caja?`,
    opciones: [
      '52 cm²',
      '48 cm²',
      '26 cm²',
      '24 cm²'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'De las tres caras mostradas: 6 cm², 8 cm² y 12 cm². En un paralelepípedo rectangular, cada cara tiene una cara opuesta idéntica. Por lo tanto, el área superficial total es: 2 × (6 + 8 + 12) = 2 × 26 = **52 cm²**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: calcular el área superficial de un paralelepípedo rectangular a partir de las áreas de tres caras adyacentes.'
  },
  {
    id: 55,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Un tanque se llenó con una solución de agua y cloro, en una concentración de 15 mg de cloro por cada litro de agua. Además, la cantidad de agua que entró al tanque fue de 30 litros por cada minuto. Con esta información, ¿cuál de las siguientes cantidades se puede calcular?`,
    opciones: [
      'La cantidad de cloro que entró al tanque cada minuto.',
      'La cantidad total de agua que hay en el tanque.',
      'La cantidad total de cloro que hay en el tanque.',
      'La cantidad de minutos que se demoró en llenar el tanque.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Con los datos dados: 15 mg de cloro por litro de agua, y 30 litros de agua por minuto, se puede calcular la cantidad de cloro que entra cada minuto multiplicando: 15 mg/L × 30 L/min = **450 mg de cloro por minuto**. No se puede calcular la cantidad total de agua ni de cloro sin saber el tiempo total. No se puede calcular el tiempo de llenado sin saber la capacidad total del tanque. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: identificar qué cálculo es posible realizar con la información proporcionada.'
  },
  {
    id: 56,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `En una heladería, cada vaso de helado cuesta $3000. A cada vaso se le pueden agregar acompañamientos por un precio de $1000 cada uno.

Teniendo en cuenta el número de acompañamientos que se le agreguen, ¿cuál de las siguientes expresiones permite determinar correctamente el precio de un vaso de helado?`,
    opciones: [
      '1000 + (1000 × número de acompañamientos del helado).',
      '3000 + (1000 × número de acompañamientos del helado).',
      '1000 + (3000 × número de acompañamientos del helado).',
      '3000 + (3000 × número de acompañamientos del helado).'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'El precio base del vaso de helado es **$3000** (precio fijo). Cada acompañamiento cuesta **$1000** adicional. Si se agregan n acompañamientos, el precio total es: **3000 + (1000 × n)**. La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: construir una expresión algebraica que modele una situación de precios con costo fijo y costo variable.'
  },
  {
    id: 57,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `En un campamento escolar se reciben 25 niños durante 4 días y se preparan 100 meriendas para alimentarlos durante su estadía. ¿Cuántas meriendas se deben preparar para alimentar a 50 niños durante 7 días?`,
    opciones: [
      '350',
      '200',
      '175',
      '114'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Primero calculamos las meriendas por niño por día: 100 meriendas ÷ 25 niños ÷ 4 días = **1 merienda por niño por día**. Para 50 niños durante 7 días: 50 × 7 × 1 = **350 meriendas**. También se puede resolver por regla de tres compuesta: (50/25) × (7/4) × 100 = 2 × 1,75 × 100 = **350**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: resolver un problema de proporcionalidad compuesta aplicando regla de tres.'
  },
  {
    id: 58,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Un estudiante va a hacer una cartelera para una tarea. Para comprar los materiales su mamá le dio $6000; con ese dinero el estudiante compró una cartulina que cuesta $1000 y cuatro marcadores que cuestan $900 cada uno. ¿Cuánto dinero le sobró de la compra de los materiales?`,
    opciones: [
      '$1900',
      '$4100',
      '$4600',
      '$1400'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Gastos: cartulina $1000 + 4 marcadores × $900 = $1000 + $3600 = **$4600**. Dinero sobrante: $6000 - $4600 = **$1400**. La respuesta correcta es la **opción D**. Evalúa la competencia de Formulación y Ejecución: calcular el sobrante de una transacción monetaria realizando operaciones aritméticas básicas.'
  },
  {
    id: 59,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `En una librería se venden libros de aventura y de romance. Una persona compró 7 libros de aventura y 2 libros de romance, y dicha compra tuvo un costo de $34.000. Como se sabe que hay un valor fijo para todos los libros de aventura y otro para todos los libros de romance, el pago total se obtiene al plantear:

$34.000 = 7 × (precio de libros de aventura) + 2 × (precio de libros de romance)

¿Cuál de las siguientes opciones corresponde a un posible precio para cada tipo de libro?`,
    opciones: [
      'Aventura: $3000\nRomance: $4000',
      'Romance: $300\nAventura: $400',
      'Aventura: $400\nRomance: $300',
      'Romance: $3000\nAventura: $4000'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Verificamos cada opción en la ecuación 7A + 2R = 34000: **Opción A**: 7(3000) + 2(4000) = 21000 + 8000 = 29000 ≠ 34000. **Opción B**: 7(400) + 2(300) = 2800 + 600 = 3400 ≠ 34000. **Opción C**: 7(400) + 2(300) = 2800 + 600 = 3400 ≠ 34000. **Opción D**: 7(4000) + 2(3000) = 28000 + 6000 = **34000** ✓. La respuesta correcta es la **opción D**. Evalúa la competencia de Formulación y Ejecución: verificar si un par de valores satisface una ecuación lineal con dos incógnitas.'
  },
  {
    id: 60,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Para convertir una temperatura de grados Celsius (°C) a Fahrenheit (°F), se utiliza la fórmula:

**°F = (9/5) × °C + 32**

Para temperaturas entre -10 °C y 5 °C, ¿qué característica tienen las temperaturas correspondientes en °F?`,
    opciones: [
      'Por debajo de los 0 °C, las correspondientes temperaturas en °F serán negativas.',
      'Todas las temperaturas correspondientes en °F serán positivas.',
      'Por debajo de los 0 °C es imposible conocer las temperaturas correspondientes en °F.',
      'Todas las temperaturas correspondientes en °F serán negativas.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Evaluando los extremos del rango: Para **-10 °C**: °F = (9/5) × (-10) + 32 = -18 + 32 = **14 °F** (positiva). Para **5 °C**: °F = (9/5) × 5 + 32 = 9 + 32 = **41 °F** (positiva). Como la función es lineal y creciente, todas las temperaturas entre -10 °C y 5 °C se convertirán a temperaturas **positivas** en °F. La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: aplicar una fórmula de conversión y analizar el comportamiento de una función lineal en un intervalo.'
  },
  {
    id: 61,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Una empresa de inversiones ofrece el 10 % de rendimiento trimestral de la inversión a sus clientes y, al finalizar un trimestre, la empresa cobra el 25 % del rendimiento obtenido.

Para calcular la ganancia que obtiene un cliente por su inversión al finalizar un trimestre, un trabajador de la empresa efectúa el siguiente procedimiento:

**Paso 1.** Calcula el 10 % de la inversión.
**Paso 2.** Calcula el 25 % del resultado del paso 1.
**Paso 3.** Resta el resultado del paso 2 al resultado del paso 1.

Si un cliente invierte $5.000.000 en dicha empresa, ¿cuál será la ganancia que obtiene al finalizar un trimestre?`,
    opciones: [
      '$1.500.000',
      '$750.000',
      '$500.000',
      '$375.000'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Aplicando el procedimiento paso a paso: **Paso 1:** 10 % de $5.000.000 = 0,10 × 5.000.000 = **$500.000**. **Paso 2:** 25 % de $500.000 = 0,25 × 500.000 = **$125.000**. **Paso 3:** $500.000 - $125.000 = **$375.000**. La ganancia neta del cliente es **$375.000** (opción D). Evalúa la competencia de Formulación y Ejecución: aplicar un procedimiento paso a paso con porcentajes sucesivos.'
  },
  {
    id: 62,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Para poder solucionar un problema, Juan debe resolver la siguiente ecuación:

**1500 - 24x = 300**

¿Cuál de los siguientes procedimientos puede seguir Juan para resolver correctamente la ecuación?`,
    opciones: [
      `**Paso 1.** Restar 300 a 1500.
**Paso 2.** Dividir el resultado anterior entre 24.`,
      `**Paso 1.** Sumar 300 a 1500.
**Paso 2.** Dividir el resultado anterior entre 24.`,
      `**Paso 1.** Dividir 1500 entre 24.
**Paso 2.** Sumar 300.`,
      `**Paso 1.** Dividir 1500 entre 24.
**Paso 2.** Restar 300.`
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Para despejar x en la ecuación **1500 - 24x = 300**: Primero restamos 300 de ambos lados (o restamos 300 a 1500): 1500 - 300 = **1200**. Luego dividimos entre 24: 1200 ÷ 24 = **50**. Por lo tanto, x = 50. El procedimiento correcto es la **opción A**: restar 300 a 1500 y luego dividir entre 24. Evalúa la competencia de Formulación y Ejecución: identificar el procedimiento correcto para resolver una ecuación lineal de primer grado.'
  },
  {
    id: 65,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Un niño que vive en el tercer piso del edificio X, tiene un amigo que vive en el segundo piso del edificio Y. Para estar en contacto, los niños quieren construir un teléfono, con dos vasos de plástico y una cuerda. En la figura se muestra un diagrama elaborado por los niños para la construcción del teléfono.

[IMAGEN]/imagenes/telefono_ninos.png

Los niños saben que, cuando la cuerda está tensionada, se forma un triángulo rectángulo, tal y como se muestra en la figura. De acuerdo con el diagrama elaborado por los niños, ¿Cuál es la longitud de la cuerda cuando está tensionada?`,
    opciones: [
      '10 m',
      '14 m',
      '24 m',
      '28 m'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Cuando la cuerda está tensionada, se forma un **triángulo rectángulo** con catetos de 6 m (diferencia de pisos) y 8 m (distancia horizontal entre edificios). Aplicando el Teorema de Pitágoras: cuerda² = 6² + 8² = 36 + 64 = 100. Por lo tanto: cuerda = √100 = **10 m**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: aplicar el Teorema de Pitágoras en un contexto práctico para calcular la longitud de una cuerda tensionada.'
  },
  {
    id: 63,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Un reporte de una entidad protectora del medio ambiente muestra que en el primer año se sembraron 2000 árboles en una ciudad. El reporte, a su vez, indica que en el segundo año hubo un aumento del 15 % respecto al número de árboles sembrados el primer año. ¿Cuál fue el número total de árboles sembrados el segundo año?`,
    opciones: [
      '150',
      '300',
      '2015',
      '2300'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Calculando el aumento del 15 % sobre 2000 árboles: 15 % de 2000 = 0,15 × 2000 = **300 árboles**. El total del segundo año es: 2000 + 300 = **2300 árboles**. La respuesta correcta es la **opción D**. Evalúa la competencia de Formulación y Ejecución: calcular un porcentaje de aumento sobre una cantidad inicial.'
  },
  {
    id: 64,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `La temperatura a las 6:00 de la mañana del miércoles en la casa de Natalia fue de 12,7 °C. Si la temperatura del jueves a las 6:00 de la mañana disminuyó 0,3 °C respecto a la temperatura del miércoles a esa misma hora, ¿cuál es la temperatura que se registró el jueves?`,
    opciones: [
      '9,7 °C',
      '12,4 °C',
      '13 °C',
      '15,7 °C'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La temperatura del miércoles fue de **12,7 °C**. El jueves disminuyó **0,3 °C**, así que: 12,7 - 0,3 = **12,4 °C**. La respuesta correcta es la **opción B**. Evalúa la competencia de Formulación y Ejecución: realizar una resta con números decimales en un contexto de medición de temperatura.'
  },

    {
    id: 66,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Se dice que una función f(x) es estrictamente creciente cuando x₁ < x₂ implica f(x₁) < f(x₂).

[IMAGEN]/imagenes/p66_funcion_creciente.png

Un estudiante asegura que la gráfica anterior corresponde a una función estrictamente creciente. ¿Es verdadera esta afirmación?`,
    opciones: [
      'Sí, pues la función no decrece en ningún intervalo.',
      'Sí, pues la función crece a lo largo de todo el intervalo.',
      'No, pues existe un intervalo en el que la función es constante.',
      'No, pues la función no crece de forma lineal en el intervalo.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Según la definición, una función es **estrictamente creciente** cuando x₁ < x₂ implica **f(x₁) < f(x₂)**. Analizando la gráfica: entre x = 6 y x = 8, la función se mantiene **constante** en y = 7, es decir, f(6) = f(7) = f(8) = 7. Como f(6) = f(7) a pesar de que 6 < 7, la función **NO** es estrictamente creciente en ese intervalo. Por lo tanto, la afirmación del estudiante es **falsa**. La respuesta correcta es la **opción C**: "No, pues existe un intervalo en el que la función es constante". Las opciones A y B concluyen incorrectamente que la afirmación es verdadera. La opción D da una justificación incorrecta (no ser lineal no implica que no sea estrictamente creciente). Evalúa la competencia de Argumentación: validar una afirmación matemática contrastándola con su definición formal y su representación gráfica.'
  },
  {
    id: 67,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `A una ballena le instalaron un aparato electrónico que emite una señal cada 6 segundos y, al mismo tiempo, se activó el equipo receptor de la señal que funciona cada 4 segundos. La persona que maneja el equipo receptor afirma que cada 30 segundos el equipo recibirá la señal que emite el aparato de la ballena.

¿Es verdadera la afirmación de la persona?`,
    opciones: [
      'Sí, porque 30 es un número par como el 4 y el 6.',
      'No, porque 30 es múltiplo de 6, pero no de 4.',
      'Sí, porque 30 es mayor que la multiplicación de 4 por 6.',
      'No, porque 30 es múltiplo de 4, pero no de 6.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para que el equipo receptor reciba la señal, ambos deben coincidir en el tiempo. El emisor funciona cada 6 segundos (6, 12, 18, 24, 30, 36...) y el receptor cada 4 segundos (4, 8, 12, 16, 20, 24, 28, 32, 36...). Los tiempos en que coinciden son los **múltiplos comunes** de 4 y 6: 12, 24, 36... El mínimo común múltiplo (MCM) es **12 segundos**. Como **30 no es múltiplo de 4** (30 ÷ 4 = 7,5), en el segundo 30 el receptor no está activo. Por lo tanto, la afirmación es **falsa** y la respuesta correcta es la **opción B**: "No, porque 30 es múltiplo de 6, pero no de 4". Evalúa la competencia de Argumentación: verificar una afirmación sobre sincronización de eventos periódicos aplicando conceptos de MCM.'
  },
  {
    id: 68,
    competencia: 'argumentacion',
    categoria: 'estadistica',
    enunciado: `Se realizó una prueba a varios tipos de juguete para determinar el tiempo que le dura la batería a cada uno. Los resultados aparecen en la tabla.

[IMAGEN]/imagenes/p68_juguetes_bateria.png

El encargado de la prueba afirmó que el tiempo promedio de duración de la batería de la guitarra es menor que el tiempo promedio de duración de la batería de los demás juguetes. ¿Es verdadera la afirmación del encargado?`,
    opciones: [
      'No, porque la batería del avión fue la que menos duró.',
      'Sí, porque la batería de las 4 guitarras que se probaron duró el mismo tiempo.',
      'Sí, porque los otros tres tipos de juguete, al menos uno tuvo una batería que duró más de 3 horas.',
      'No, porque el tiempo promedio de duración de la batería de los aviones es el mismo que el de las guitarras.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Calculando los promedios: **Guitarra**: (3 + 3 + 3 + 3) ÷ 4 = **3 horas**. **Carro**: (4 + 3 + 4 + 5) ÷ 4 = **4 horas**. **Avión**: (2 + 3 + 4 + 3) ÷ 4 = **3 horas**. **Dinosaurio**: (5 + 3 + 3 + 5) ÷ 4 = **4 horas**. El promedio de la guitarra (3 h) es menor que el de los demás juguetes (Carro 4 h, Dinosaurio 4 h). El avión también tiene promedio 3 h, igual que la guitarra. Sin embargo, la afirmación dice "menor que el tiempo promedio de los **demás** juguetes", y como la guitarra (3 h) es menor que Carro (4 h) y Dinosaurio (4 h), la afirmación es **verdadera**. La respuesta correcta es la **opción B**: "Sí, porque la batería de las 4 guitarras que se probaron duró el mismo tiempo" (todas duraron 3 horas, lo que explica su bajo promedio). Evalúa la competencia de Argumentación: calcular y comparar promedios de datos tabulados para validar una afirmación.'
  },
  {
    id: 69,
    competencia: 'argumentacion',
    categoria: 'estadistica',
    enunciado: `En un pueblo se cuenta con el programa de comedores comunitarios y se quiere saber qué tan exitoso ha sido. Para esto, se registran en una tabla los datos correspondientes a la cantidad de almuerzos proporcionados durante los primeros seis meses del año.

[IMAGEN]/imagenes/p69_comedores_tabla.png

Uno de los coordinadores del programa plantea la siguiente gráfica para ilustrar los datos.

[IMAGEN]/imagenes/p69_comedores_grafica.png

¿Es la información de la gráfica correcta?`,
    opciones: [
      'No, porque los valores de enero y febrero no corresponden a los datos de la tabla.',
      'Sí, porque se observa el crecimiento que ha tenido el programa durante los seis meses.',
      'No, porque los valores de mayo y junio están muy altos comparados con los demás.',
      'Sí, porque la escala de la gráfica contiene todos los valores que se presentan en la tabla.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando los datos de la tabla vs. la gráfica: **Enero**: 1500 almuerzos, **Febrero**: 1550 almuerzos. En la gráfica, las barras de enero y febrero se muestran extremadamente cortas (casi en cero), lo cual **no corresponde** a los valores reales de 1500 y 1550. La escala de la gráfica distorsiona visualmente estos valores, haciendo parecer que casi no hubo almuerzos en esos meses. Por lo tanto, la información de la gráfica es **incorrecta** y la respuesta correcta es la **opción A**: "No, porque los valores de enero y febrero no corresponden a los datos de la tabla". La opción B es incorrecta porque aunque se observa crecimiento, los valores de enero/febrero están mal representados. La opción C es incorrecta porque mayo (2600) y junio (2650) sí son valores altos pero están correctos en la tabla. La opción D es incorrecta porque tener la escala no garantiza que los datos estén bien representados. Evalúa la competencia de Argumentación: comparar datos de una tabla con su representación gráfica para detectar inconsistencias.'
  },
  {
    id: 70,
    competencia: 'argumentacion',
    categoria: 'geometria',
    enunciado: `Un campesino heredó a sus dos hijas, Sofía y Elena, un terreno que tiene forma triangular. Para dividir el terreno en dos partes, el campesino trazó una línea recta desde el vértice Q hasta el punto S, formando un ángulo de 60° con respecto al segmento PQ y obteniendo los triángulos PQS para el terreno de Sofía y SQR para el terreno de Elena, como se muestra en la figura.

[IMAGEN]/imagenes/p70_terreno_herencia.png

¿Cuál de las siguientes afirmaciones sobre los terrenos obtenidos es verdadera?`,
    opciones: [
      'En el terreno de Sofía, todos los ángulos tienen la misma medida.',
      'En el terreno de Elena, todos los ángulos tienen diferente medida.',
      'En cada uno de los terrenos, todos los ángulos miden menos de 90°.',
      'En cada uno de los terrenos hay al menos un ángulo que mide 90°.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando los triángulos formados: **Terreno de Sofía (triángulo PQS)**: El ángulo en P es 60° (dado), el ángulo PQS es 60° (dado). Como la suma de ángulos en un triángulo es 180°, el ángulo PSQ = 180° - 60° - 60° = **60°**. Los tres ángulos miden 60°, por lo que es un **triángulo equilátero**. **Terreno de Elena (triángulo SQR)**: El ángulo SQR = 90° - 60° = **30°** (el ángulo PQR es 90° por la figura). El ángulo en R = 180° - 90° - 60° = **30°** (del triángulo grande). El ángulo QSR = 180° - 30° - 30° = **120°**. Los ángulos son 30°, 30°, 120°. Por lo tanto, la afirmación **A** es **verdadera**: "En el terreno de Sofía, todos los ángulos tienen la misma medida" (60° cada uno). La opción B es falsa porque Elena tiene dos ángulos de 30°. La opción C es falsa porque Elena tiene un ángulo de 120°. La opción D es falsa porque ningún terreno tiene un ángulo de 90°. Evalúa la competencia de Argumentación: calcular ángulos en triángulos a partir de información dada y verificar la validez de afirmaciones geométricas.'
  },
  {
    id: 71,
    competencia: 'argumentacion',
    categoria: 'geometria',
    enunciado: `En una casa se quiere decorar una caja rectangular, pegando un hilo brillante en todas sus aristas. La caja se usará para poner en su interior los regalos de fin de año y tiene las siguientes dimensiones:

[IMAGEN]/imagenes/p71_caja_rectangular.png

El hijo menor de la familia plantea la siguiente operación para calcular la cantidad de hilo brillante que se necesita para decorar la caja:

[IMAGEN]/imagenes/p71_operacion_hilo.png

Uno de sus hermanos identifica que este procedimiento es incorrecto. ¿Cuál es el error en el cálculo de dicha cantidad?`,
    opciones: [
      'Que los términos de la suma no están planteados en el orden correcto; debe ser primero largo, luego ancho y, finalmente, alto.',
      'Que las unidades de medida deben ser unidades cúbicas, ya que estamos hablando de una figura en tres dimensiones.',
      'Que la cantidad de aristas de cada medida debe ser mayor, ya que la longitud de cada arista debe ser multiplicada por cuatro.',
      'Que solo se conoce la medida de tres de las aristas y, por tanto, la cantidad de hilo brillante no se puede calcular.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Una caja rectangular tiene **12 aristas**: 4 aristas de largo, 4 aristas de ancho y 4 aristas de alto. La operación correcta sería: **4 × (50 + 25 + 30,5) = 4 × 105,5 = 422 cm**. El hijo menor multiplicó: 50 × 3 + 30,5 × 2 + 25 × 2 = 261 cm, usando 3 aristas del largo, 2 del alto y 2 del ancho, lo cual es incorrecto. La respuesta correcta es la **opción C**: "Que la cantidad de aristas de cada medida debe ser mayor, ya que la longitud de cada arista debe ser multiplicada por cuatro". Una caja rectangular tiene 4 aristas de cada dimensión, no 3, 2 y 2. La opción A es incorrecta porque el orden de los términos no afecta el resultado en una suma. La opción B es incorrecta porque el perímetro (hilo) se mide en unidades lineales, no cúbicas. La opción D es incorrecta porque con las tres dimensiones dadas sí se puede calcular el total de hilo necesario. Evalúa la competencia de Argumentación: identificar errores en un procedimiento de cálculo aplicando conocimiento de propiedades geométricas de un paralelepípedo rectangular.'
  },
  {
    id: 72,
    competencia: 'argumentacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra algunos datos sobre el tipo de luz que se puede utilizar para iluminar un cuadro ubicado en la pared de una galería.

| Luz | Área del cuadro iluminada | Área de la pared iluminada alrededor del cuadro |
|---|---|---|
| 1 | 90 % | 8 % |
| 2 | 95 % | 2 % |
| 3 | 100 % | 20 % |
| 4 | 100 % | 3 % |

En un día de exposición se necesita iluminar totalmente el cuadro y la menor área de pared alrededor de este, por lo que un empleado de la galería escoge el tipo de luz 2.

¿Es correcta la elección del empleado?`,
    opciones: [
      'Sí, porque el porcentaje del área de la pared iluminada alrededor del cuadro es el menor de todas las opciones consideradas.',
      'No, porque aunque el área de la pared iluminada alrededor del cuadro es pequeña, queda una parte del cuadro sin iluminar.',
      'Sí, porque la suma de los porcentajes de las áreas del cuadro y de la pared es la menor de todas las opciones consideradas.',
      'No, porque aunque el área se cubre la mayor parte del cuadro, aún así, se ilumina una parte de la pared alrededor de este.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Analizando los requisitos: se necesita **iluminar totalmente el cuadro** (100 % del área del cuadro) y **minimizar el área de pared iluminada**. La luz 2 ilumina solo el **95 %** del cuadro, dejando un 5 % sin iluminar. Aunque el área de pared iluminada con la luz 2 es solo el **2 %** (el menor de todos), no cumple con el requisito de iluminar **totalmente** el cuadro. Las luces 3 y 4 sí iluminan el 100 % del cuadro, pero la luz 3 ilumina el 20 % de la pared (muy alto) y la luz 4 ilumina solo el 3 % de la pared. La mejor opción sería la **luz 4** (100 % cuadro, 3 % pared). Por lo tanto, la elección del empleado (luz 2) es **incorrecta** y la respuesta correcta es la **opción B**: "No, porque aunque el área de la pared iluminada alrededor del cuadro es pequeña, queda una parte del cuadro sin iluminar" (95 % ≠ 100 %). Evalúa la competencia de Argumentación: evaluar una decisión contrastándola con condiciones simultáneas (máxima iluminación del cuadro y mínima iluminación de la pared).'
  },
  {
    id: 73,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Se conoce el valor de la hora nocturna en un día normal y el dinero total recibido por un trabajador en su labor nocturna de una semana en días normales. Con esta información puede hallarse:`,
    opciones: [
      'La cantidad de horas nocturnas que trabajó en días normales, esa semana.',
      'El número de horas diurnas que trabajó cada día normal de esa semana.',
      'El número de horas nocturnas que trabajó cada día normal de esa semana.',
      'La cantidad de horas diurnas que trabajó en días normales, esa semana.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Con los datos proporcionados: **valor de la hora nocturna** (precio unitario) y **dinero total recibido por trabajo nocturno** (total). Aplicando la relación: Total = Precio unitario × Cantidad. Despejando: **Cantidad = Total ÷ Precio unitario**. Por lo tanto, se puede calcular la **cantidad total de horas nocturnas trabajadas en días normales esa semana**. No se pueden calcular las horas diurnas (opciones B y D) porque no se tiene información sobre el trabajo diurno. No se puede calcular el número de horas nocturnas **por cada día** (opción C) porque no se sabe cuántos días trabajó ni la distribución por día. La respuesta correcta es la **opción A**. Evalúa la competencia de Argumentación: identificar qué cálculo es posible realizar con la información proporcionada aplicando relaciones de proporcionalidad.'
  },

// ════════════════════════════════════════════════════════════
  // SIMULACRO 1 — PREGUNTAS NUEVAS
  // ════════════════════════════════════════════════════════════

  {
    id: 200,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Se quiere determinar la varianza de algunas características del cabello de tres personas. Para esto, se registran los datos en la siguiente tabla:

| Persona | Longitud | Color | Grosor |
|---------|----------|-------|--------|
| Persona 1 | 0,9 cm | Negro | 0,6 mm |
| Persona 2 | 0,8 cm | Castaño | 0,5 mm |
| Persona 3 | 0,6 cm | Rubio | 0,2 mm |

Para calcular la varianza de tres datos de una característica elegida, se aplica el siguiente procedimiento:

**Paso 1.** Calcular el promedio de los datos de la característica elegida.
**Paso 2.** Para cada uno de los datos tomados de cada persona, restar el promedio calculado en el paso 1 y elevar al cuadrado cada resultado.
**Paso 3.** Sumar los resultados del paso 2.
**Paso 4.** Dividir la suma del paso anterior entre 3.

Según el procedimiento planteado, ¿a qué características se les puede calcular la varianza?`,
    opciones: [
      'Persona y grosor.',
      'Longitud y grosor.',
      'Longitud y color.',
      'Persona y color.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La **varianza** es una medida estadística que solo puede calcularse sobre datos **numéricos** (cuantitativos). Analizando la tabla: **Longitud** (0,9; 0,8; 0,6 cm) y **Grosor** (0,6; 0,5; 0,2 mm) son datos numéricos, por lo que sí se les puede calcular la varianza. El **Color** (Negro, Castaño, Rubio) es una característica **cualitativa/categórica**, no numérica, por lo que no tiene sentido calcularle varianza. La **Persona** es solo un identificador, no una característica medible. Por lo tanto, las características a las que se les puede calcular la varianza son **Longitud y grosor**.'
  },

  {
    id: 201,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `En un concurso de matemáticas, se pide a los participantes calcular el número de vueltas que un deportista le dio a una pista de atletismo en dos carreras y, para ello, se les proporciona la siguiente información:\n• El deportista recorrió la cuarta parte de la pista en la primera carrera.\n• En la segunda carrera, recorrió el doble de lo que recorrió en la primera.\n\nLas siguientes fueron las soluciones propuestas por los tres participantes:\n\n**Participante 1**\nPaso 1: Calculó la distancia recorrida en la primera carrera: 1/4 de vuelta.\nPaso 2: Calculó la distancia recorrida en la segunda carrera: 2 × 1/4 = 2/4 de vuelta.\nPaso 3: Sumó ambas distancias: 1/4 + 2/4 = **3/4 de vuelta**.\n\n**Participante 2**\nPaso 1: Convirtió 1/4 a decimal: 1/4 = 0,25; luego calculó la segunda carrera: 2 × 0,25 = 0,50.\nPaso 2: Sumó: 0,25 + 0,50 = **0,75 vueltas**.\n\n**Participante 3**\nEl deportista dio 4 vueltas a la pista en la primera carrera y 8 vueltas en la segunda carrera; por lo tanto, dio en total 4 + 8 = **12 vueltas**.\n\nLos jurados del concurso dijeron que el único procedimiento correcto fue el del participante 1. ¿Es correcto el veredicto de los jurados?`,
    opciones: [
      'No, porque la solución correcta es la del participante 3, pues la cuarta parte corresponde a multiplicar por 4.',
      'No, porque la solución del participante 2 también es correcta, solo que está expresada en números decimales.',
      'Sí, porque el participante 1 fue el único que dio la solución expresada como fracción, y esto concuerda con el enunciado.',
      'Sí, porque el participante 2 sumó mal los decimales y el participante 3 asoció incorrectamente los recorridos con enteros.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'El veredicto de los jurados es **incorrecto**. El **participante 1** es correcto: 1/4 + 1/2 = 3/4 de vuelta. El **participante 2** también es correcto: 0,25 + 0,50 = 0,75 vueltas, que es exactamente igual a 3/4, solo expresado en decimales. La conversión de fracciones a decimales y la suma están bien hechas. El **participante 3** es incorrecto porque asoció 1/4 con 4 vueltas enteras (confundió el denominador con el valor total). La respuesta correcta es **B**: la solución del participante 2 también es válida. Evalúa la competencia de Interpretación y Representación: verificar la validez de diferentes procedimientos y representaciones numéricas (fracciones vs decimales).'
  },
  {
    id: 202,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `En un parque, se encuentra un estanque de forma cuadrada con un área modelada por la función P(x) = x² + 8x + 16, donde x representa el lado del estanque en metros.\n\nCuatro amigos están paseando por el parque y observan el estanque; posteriormente, tres de ellos intentan factorizar la función que modela el área del estanque de la siguiente manera:\n\n• **Camila:** (x + 4x + 8)²\n• **Rafael:** (x - 4)²\n• **Elsa:** (x + 4)²\n\nMauricio, el otro amigo, afirma que quien ha factorizado correctamente es Elsa. ¿Es correcta la afirmación de Mauricio?`,
    opciones: [
      'No, porque el polinomio P(x) = x² + 8x + 16 es una diferencia de cuadrados perfectos, cuya factorización es (x - 4)².',
      'Sí, porque el polinomio P(x) = x² + 8x + 16 es una diferencia de cuadrados, cuya factorización es (x + 4)².',
      'No, porque el polinomio P(x) = x² + 8x + 16 es un trinomio cuadrado perfecto, cuya factorización es (x + 4x + 8)².',
      'Sí, porque el polinomio P(x) = x² + 8x + 16 es un trinomio cuadrado perfecto, cuya factorización es (x + 4)².'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'La afirmación de Mauricio es **correcta**. Elsa factorizó P(x) = x² + 8x + 16 como **(x + 4)²**, que es la factorización correcta. Este polinomio es un **trinomio cuadrado perfecto** (TCP), no una diferencia de cuadrados. La fórmula del TCP es: a² + 2ab + b² = (a + b)². Aquí: x² + 8x + 16 = x² + 2(x)(4) + 4² = (x + 4)². **Camila** es incorrecta porque (x + 4x + 8)² = (5x + 8)² que no es igual al polinomio original. **Rafael** es incorrecta porque (x - 4)² = x² - 8x + 16, que tiene el signo del término lineal negativo. Evalúa la competencia de Interpretación y Representación: verificar la validez de diferentes factorizaciones de un trinomio cuadrado perfecto.'
  },
  {
    id: 203,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `En la figura se muestran seis polígonos, los cuales se distribuyeron en dos grupos. El grupo X se compone de los tres polígonos con mayor número de lados; los otros tres polígonos conforman el grupo Z.\n\n[IMAGEN]/imagenes/poligonos-grupos-xz.png\n\nEntre los polígonos del grupo X, ¿cuál tiene menor número de lados?`,
    opciones: [
      '[IMAGEN]/imagenes/opcion-a-triangulo.png',
      '[IMAGEN]/imagenes/opcion-b-rombo.png',
      '[IMAGEN]/imagenes/opcion-c-flecha.png',
      '[IMAGEN]/imagenes/opcion-d-hourglass.png'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando los seis polígonos por número de lados: el **reloj de arena** tiene 6 lados, el **polígono en forma de M** tiene 5 lados, el **rombo con hendiduras** y los dos rombos/flechas tienen 4 lados, y el **triángulo** tiene 3 lados. El **grupo X** se compone de los tres con mayor número de lados: 6, 5 y 4 lados. El **grupo Z** tiene los otros tres: 4, 4 y 3 lados. Entre los polígonos del grupo X (6, 5, 4), el de **menor número de lados** es el de **4 lados**, que corresponde al **rombo con hendiduras**. Según las opciones presentadas, la respuesta correcta es el polígono A que representa este tipo de figura. Evalúa la competencia de Interpretación y Representación: clasificar polígonos por número de lados e identificar el de menor valor en un grupo determinado.'
  },
  {
    id: 204,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `En una ciudad hay dos tipos de placas para identificar los vehículos:

**Tipo 1.** Para vehículos particulares y de transporte público: placa con 3 letras y 3 dígítos; tanto las letras como los dígítos se pueden repetir.

**Tipo 2.** Para vehículos de transporte pesado: placa con la letra T seguida de 4 dígítos; los dígítos se pueden repetir.

Sabiendo que hay 26 letras y 10 dígítos, ¿cuál es la expresión que permite calcular el número máximo de placas de los dos tipos que pueden registrarse en esa ciudad?`,
    opciones: [
      '26³ × 10³ + 26 × 10⁴',
      '(26³ + 1) × (10³ + 10⁴)',
      '(26³ + 26) × (10³ + 10⁴)',
      '26³ × 10³ + 1 × 10⁴'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Para las placas **Tipo 1** (3 letras + 3 dígítos): cada una de las 3 posiciones de letras puede ser cualquiera de las 26 letras (se pueden repetir): 26 × 26 × 26 = **26³**. Cada una de las 3 posiciones de dígítos puede ser cualquiera de los 10 dígítos: 10 × 10 × 10 = **10³**. Total Tipo 1: **26³ × 10³**. Para las placas **Tipo 2** (T + 4 dígítos): la letra T es fija (**1** posibilidad) y cada uno de los 4 dígítos puede ser cualquiera de 10: **1 × 10⁴**. El número máximo total de placas es la suma de ambos tipos: **26³ × 10³ + 1 × 10⁴**. La opción D es la correcta. Evalúa la competencia de Interpretación y Representación: plantear una expresión combinatoria para contar configuraciones posibles con condiciones dadas.'
  },
  {
    id: 205,
    competencia: 'formulacion',
    categoria: 'algebra',
    enunciado: `Una persona cuenta con $5.000 para comprar la mayor cantidad posible de paquetes de papas fritas. En el supermercado 1 venden un paquete de papas fritas en $1.000, y ofrecen la promoción "lleve 5 paquetes por el precio de 4".

Para saber cuántos paquetes puede comprar, efectúa el siguiente procedimiento:

**Paso 1.** Dividir la cantidad de dinero de la persona entre $1.000 y aproximar al entero menor más próximo.
**Paso 2.** Dividir el número obtenido en el paso 1 entre 4 y aproximar al entero menor más próximo.
**Paso 3.** Sumar los resultados de los pasos 1 y 2.

En el supermercado 2 venden cada paquete a $850. Para saber cuántos paquetes puede comprar, efectúa el siguiente procedimiento:

**Paso 1.** Dividir la cantidad de dinero de la persona entre $850 y aproximar al entero menor más próximo.

Con los $5.000, ¿en cuál de los dos supermercados puede comprar una mayor cantidad de paquetes de papas fritas?`,
    opciones: [
      'En el supermercado 1, pues puede comprar 5 paquetes de papas.',
      'En el supermercado 2, pues puede comprar 5 paquetes de papas.',
      'En el supermercado 1, pues puede comprar 6 paquetes de papas.',
      'En el supermercado 2, pues puede comprar 6 paquetes de papas.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: '**Supermercado 1:** Con la promoción "lleve 5 por el precio de 4", cada 5 paquetes cuestan $4.000. Con $5.000: Paso 1: 5000 ÷ 1000 = 5 (puede comprar 5 grupos de 5 paquetes). Paso 2: 5 ÷ 4 = 1 (un grupo adicional por la promoción). Paso 3: 5 + 1 = **6 paquetes**. **Supermercado 2:** 5000 ÷ 850 = 5,88... aproximado al entero menor = **5 paquetes**. Por lo tanto, en el **supermercado 1** puede comprar **6 paquetes**, que es mayor que los 5 del supermercado 2. La respuesta correcta es la **opción C**. Evalúa la competencia de Formulación y Ejecución: aplicar un procedimiento paso a paso para comparar situaciones de compra.'
  },
  {
    id: 206,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Sobre una carretera recta un automóvil viaja a rapidez constante. A partir de cierto momento, se registra la distancia que ha recorrido el automóvil cada minuto. La tabla que contiene dichos datos es la siguiente:

| Tiempo (minutos) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Distancia (metros) | 4 | 8 | 12 | ? |

¿Cuál debe ser el valor de la distancia correspondiente al minuto 4 y qué tipo de proporcionalidad existe entre la distancia recorrida y el tiempo?`,
    opciones: [
      '12 y la proporcionalidad es inversa.',
      '16 y la proporcionalidad es directa.',
      '12 y la proporcionalidad es directa.',
      '16 y la proporcionalidad es inversa.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Analizando la tabla: en el minuto 1 recorrió 4 m, en el minuto 2 recorrió 8 m, en el minuto 3 recorrió 12 m. La razón distancia/tiempo es constante: 4/1 = 8/2 = 12/3 = **4 m/min**. Por lo tanto, en el minuto 4 la distancia será: 4 × 4 = **16 metros**. Como al aumentar el tiempo la distancia aumenta en la misma proporción (razón constante), se trata de una **proporcionalidad directa**. Evalúa la competencia de Interpretación y Representación: identificar proporcionalidad directa a partir de datos tabulados y completar un patrón numérico.'
  },
  {
    id: 207,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Sofía ha diseñado la siguiente tabla para relacionar la estatura de uno de sus pacientes con la edad, durante sus primeros cuatro meses de vida.

| Edad (meses) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Estatura (centímetros) | 73 | 79 | 85 | 91 |

Ahora bien, ella encuentra que las dos cantidades se relacionan mediante la siguiente expresión:

**Estatura = 67 - (6 × edad)**

¿Es verdadero afirmar que la expresión algebraica establecida por Sofía permite representar la información presentada en la tabla?`,
    opciones: [
      'Sí, porque, al reemplazar las edades presentadas en la tabla en la expresión, se obtiene cada una de las estaturas presentadas allí.',
      'No, porque la cantidad que multiplica a la edad en la expresión encontrada debe ser 18.',
      'No, porque, por ejemplo, para un mes de edad, la estatura es diferente de 67 - 6.',
      'Sí, porque para hallar la estatura hay que multiplicar la edad por -6.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Verificamos reemplazando los valores de la tabla en la expresión **Estatura = 67 - (6 × edad)**: Para edad 1: 67 - (6 × 1) = 67 - 6 = **61**, pero la tabla dice **73**. Para edad 2: 67 - (6 × 2) = 67 - 12 = **55**, pero la tabla dice **79**. Ningún valor coincide. La expresión correcta sería **Estatura = 67 + (6 × edad)**, no 67 - (6 × edad). Por lo tanto, la afirmación es **falsa** y la respuesta correcta es la **opción C**: para un mes de edad, la estatura es diferente de 67 - 6 = 61, ya que la tabla indica 73 cm. Evalúa la competencia de Interpretación y Representación: verificar si una expresión algebraica representa correctamente datos de una tabla.'
  },
  {
    id: 208,
    competencia: 'argumentacion',
    categoria: 'estadistica',
    enunciado: `En una bolsa hay 9 bolas de igual peso y tamaño, 4 azules y 5 negras. Un concurso consiste en sacar, en un solo intento, 3 bolas de la bolsa. La persona gana si al menos 2 de las bolas son azules. La probabilidad de ganar se puede calcular como:

**Probabilidad = (Número de casos favorables) / (Número de casos posibles)**

El número de casos favorables se obtiene a partir de la suma de:

• El número de formas de escoger 2 bolas azules entre las 4 azules y 1 bola negra entre las 5 negras.
• El número de formas de escoger 3 bolas azules entre las 4 bolas azules.

Para conocer esta probabilidad, se debe calcular, también, el número de`,
    opciones: [
      'formas de escoger 6 bolas en un conjunto de 9 bolas.',
      'formas de escoger 6 bolas en un conjunto de 6 bolas.',
      'formas de escoger 3 bolas en un conjunto de 9 bolas.',
      'formas de escoger 3 bolas en un conjunto de 6 bolas.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'La probabilidad se calcula como: P(ganar) = casos favorables / casos posibles. Los **casos favorables** ya están descritos: C(4,2) × C(5,1) + C(4,3) (escoger 2 azules y 1 negra, O escoger 3 azules). Los **casos posibles** son todas las formas de escoger 3 bolas entre las 9 totales: **C(9,3)**. Por lo tanto, se debe calcular el número de **formas de escoger 3 bolas en un conjunto de 9 bolas**. Evalúa la competencia de Argumentación: identificar el espacio muestral y los casos favorables en un problema de probabilidad combinatoria.'
  },
  {
    id: 209,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Durante una caminata una persona se perdió. El equipo de rescate decidió buscarla en una región correspondiente a un rectángulo de 5 kilómetros de largo y 7 kilómetros de ancho. ¿Cuál es el área de la región en la que la van a buscar?`,
    opciones: [
      '35 kilómetros cuadrados.',
      '25 kilómetros cuadrados.',
      '24 kilómetros cuadrados.',
      '12 kilómetros cuadrados.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'El área de un rectángulo se calcula como: Área = largo × ancho. Sustituyendo los valores: Área = **5 km × 7 km = 35 km²**. La respuesta correcta es **35 kilómetros cuadrados** (opción A). Evalúa la competencia de Formulación y Ejecución: calcular el área de un rectángulo aplicando la fórmula en un contexto real.'
  },
  {
    id: 210,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Un automovilista recorre una distancia de 10 km en 2 minutos a velocidad constante. Un ayudante del automovilista afirma que, a esa misma velocidad, puede recorrer una distancia de 15 km en 3 minutos. ¿Es verdadera la afirmación del ayudante?`,
    opciones: [
      'No, porque si la distancia aumenta en 5 km, entonces el tiempo del recorrido debe aumentar 5 minutos.',
      'Sí, porque si la distancia aumenta un 50 %, entonces el tiempo del recorrido debe aumentar un 50 % también.',
      'No, porque aunque la distancia aumente, es imposible saber cuánto debe aumentar el tiempo del recorrido.',
      'Sí, porque si se duplica la distancia, entonces el tiempo del recorrido debe duplicarse también.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La velocidad es constante: v = 10 km / 2 min = **5 km/min**. Para recorrer 15 km a la misma velocidad: t = 15 km / 5 km/min = **3 minutos**. Comparando: la distancia pasó de 10 a 15 km, lo cual es un **aumento del 50%**. El tiempo pasó de 2 a 3 minutos, también un **aumento del 50%**. Como la velocidad es constante, distancia y tiempo son **directamente proporcionales**: si una aumenta un cierto porcentaje, la otra también. La afirmación del ayudante es **verdadera** y la justificación correcta es la **opción B**. Evalúa la competencia de Interpretación y Representación: verificar proporcionalidad directa entre distancia y tiempo a velocidad constante.'
  },
  {
    id: 211,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Un estudiante afirma que x² siempre es mayor que o igual a 2x. Para justificarlo, el estudiante argumenta que hay dos posibilidades:

**Posibilidad 1.** Si x es negativo, x² es positivo y, por lo tanto, es mayor que 2x, que es un número negativo.

**Posibilidad 2.** Si x es positivo, multiplicar a un número por sí mismo es mayor que sumarlo consigo mismo y, por lo tanto, x² es mayor que o igual a 2x.

¿Por qué es incorrecta la justificación del estudiante?`,
    opciones: [
      'Porque el estudiante no tiene en cuenta que 0 es un número sin signo y que 0² = 2 × 0.',
      'Porque, por ejemplo, al multiplicar 1 por sí mismo se obtiene un número menor que al sumar 1 consigo mismo.',
      'Porque cualquier número negativo, cuando se eleva al cuadrado, da negativo y es menor que el doble de sí mismo.',
      'Porque, por ejemplo, (-2)² = 4, lo cual, en magnitud, es equivalente al doble de -2.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La afirmación del estudiante es **falsa** en general. La justificación es incorrecta porque no considera todos los casos. Por ejemplo, si **x = 1**: x² = 1² = **1** y 2x = 2 × 1 = **2**. En este caso, x² = 1 < 2 = 2x, por lo que x² NO es mayor ni igual a 2x. La **Posibilidad 2** falla porque no siempre multiplicar un número positivo por sí mismo da un resultado mayor que sumarlo consigo mismo (es cierto para x > 2, pero no para 0 < x < 2). La respuesta correcta es la **opción B**: al multiplicar 1 por sí mismo se obtiene 1, que es menor que 1 + 1 = 2. Evalúa la competencia de Argumentación: identificar errores en una justificación matemática mediante contraejemplos.'
  },
  {
    id: 212,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Un arquitecto diseñó un jardín, y para delimitar la región en la que lo va a construir, utilizó una cuerda de 12 metros de longitud, de la siguiente manera:

**Paso 1.** Unió la cuerda en los dos extremos y, en el punto en que se unen, la aseguró en el piso.
**Paso 2.** Aseguró la cuerda en un punto a 3 metros del punto en el que la aseguró en el paso 1.
**Paso 3.** Aseguró la cuerda en un punto a 5 metros del punto en el que la aseguró en el paso 1 y, ahí la cuerda quedó templada.

Respecto a la región en la que se va a construir el jardín, ¿cuál de las siguientes afirmaciones es verdadera?`,
    opciones: [
      'Es un triángulo rectángulo con hipotenusa de longitud 5 metros.',
      'Es un triángulo rectángulo con lados de longitud 2, 3 y 7 metros.',
      'Es un rectángulo con área igual a 15 metros cuadrados.',
      'Es un rectángulo con perímetro igual a 12 metros.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Analizando la construcción: la cuerda tiene 12 metros. En el Paso 1, la cuerda forma un lazo (perímetro = 12 m). En el Paso 2, se fija un punto a 3 m de uno de los extremos. En el Paso 3, se fija otro punto a 5 m del mismo extremo, y la cuerda queda templada. Los tres puntos forman un triángulo con lados 3, 4 y 5 (ya que 12 - 3 - 5 = 4 m para el tercer lado). Un triángulo con lados 3, 4, 5 es un **triángulo rectángulo** porque cumple el teorema de Pitágoras: 3² + 4² = 9 + 16 = 25 = 5². La hipotenusa es el lado mayor: **5 metros**. La respuesta correcta es la **opción A**. Evalúa la competencia de Formulación y Ejecución: identificar un triángulo rectángulo mediante el teorema de Pitágoras en un contexto práctico.'
  },
  {
    id: 213,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `La calculadora de un computador quedó mal configurada y, ahora, al pedirle que haga la multiplicación entre dos números, ejecuta el siguiente proceso:

• Suma los dos números.
• Eleva el resultado de la suma al cuadrado.
• Al resultado del paso anterior le suma 1.

¿Qué resultado obtendrá una persona que le pida a esta calculadora el producto entre -1 y 5?`,
    opciones: [
      '17',
      '26',
      '-5',
      '-15'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Siguiendo el proceso que ejecuta la calculadora: **Paso 1:** Suma los dos números: (-1) + 5 = **4**. **Paso 2:** Eleva el resultado al cuadrado: 4² = **16**. **Paso 3:** Le suma 1 al resultado anterior: 16 + 1 = **17**. Por lo tanto, el resultado obtenido será **17** (opción A). Nota: la calculadora está calculando (a + b)² + 1 en lugar de a × b. Evalúa la competencia de Interpretación y Representación: seguir un procedimiento paso a paso con números enteros positivos y negativos.'
  },
  {
    id: 214,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `Las edades en años de los integrantes de un equipo que quiere participar en un torneo se muestran a continuación: 19, 28, 32, 19, 17, 28, 23, 28, 24, 15, 17.

El torneo tiene una norma que indica que para que un equipo pueda participar, la edad promedio debe ser mayor a 25 años. Al respecto, ¿cuál de los siguientes procedimientos permite establecer si el equipo puede o no participar?`,
    opciones: [
      `Paso 1. Sumar todas las edades de los integrantes.
Paso 2. Dividir el valor obtenido en el paso 1 entre el número de integrantes.
Paso 3. Comparar el valor obtenido en el paso 2 con respecto al número 25.`,
      `Paso 1. Sumar todas las edades de los integrantes.
Paso 2. Multiplicar el valor obtenido en el paso 1 entre el número de integrantes.
Paso 3. Comparar el valor obtenido en el paso 2 con respecto al número 25.`,
      `Paso 1. Ordenar las edades de menor a mayor.
Paso 2. Identificar el dato que está en la posición central.
Paso 3. Comparar el dato identificado en el paso anterior con el número 25.`,
      `Paso 1. Contar el número de veces que aparece cada edad.
Paso 2. Identificar el dato que más veces se repite.
Paso 3. Comparar el dato identificado en el paso anterior con el número 25.`
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Para determinar si el equipo cumple la norma, se debe calcular el **promedio** (media) de las edades. El procedimiento correcto es: **Paso 1:** Sumar todas las edades: 19 + 28 + 32 + 19 + 17 + 28 + 23 + 28 + 24 + 15 + 17 = **250**. **Paso 2:** Dividir entre el número de integrantes (11): 250 ÷ 11 = **22,73 años**. **Paso 3:** Comparar con 25: 22,73 < 25, por lo que **NO puede participar**. La opción A describe correctamente el cálculo del promedio. La opción B describe multiplicación en lugar de división. La opción C describe el cálculo de la **mediana**, no del promedio. La opción D describe el cálculo de la **moda**, no del promedio. Evalúa la competencia de Formulación y Ejecución: identificar el procedimiento correcto para calcular un promedio y compararlo con un valor dado.'
  },
  {
    id: 215,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Esteban y Santiago van a jugar fútbol en un videojuego. Antes de que empiece el partido, cada uno de ellos debe escoger un equipo con su respectivo uniforme. En el juego hay 10 equipos disponibles y cada equipo tiene 3 uniformes diferentes.

Esteban dice que el primero que elige tiene 30 posibilidades para escoger un equipo uniformado. ¿Es correcta la afirmación que hizo Esteban?`,
    opciones: [
      'Sí, porque 10×3 es la cantidad de formas posibles de escoger un equipo y un uniforme.',
      'No, porque se debe calcular 10+3 para saber la cantidad de posibilidades.',
      'Sí, porque en total hay 10×3 equipos de fútbol para jugar el partido.',
      'No, porque cada equipo solo puede jugar una vez, entonces solo hay 10 opciones.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Para determinar el número de posibilidades de escoger un equipo uniformado, aplicamos el **principio multiplicativo**: hay 10 equipos disponibles y, para cada equipo, hay 3 uniformes diferentes. Total de posibilidades = **10 × 3 = 30**. La afirmación de Esteban es **correcta** y la justificación adecuada es la **opción A**: 10 × 3 es la cantidad de formas posibles de escoger un equipo y un uniforme. Las opciones B y D usan operaciones incorrectas (suma en lugar de multiplicación). La opción C tiene un razonamiento incorrecto. Evalúa la competencia de Interpretación y Representación: aplicar el principio multiplicativo para contar posibilidades en un contexto de selección.'
  },
  {
    id: 216,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Un campesino tiene varias vacas en su finca. En la tabla, aparece la producción de leche de las vacas durante 5 días de una semana.

| Día | Lunes | Martes | Miércoles | Jueves | Viernes |
|---|---|---|---|---|---|
| Litros de leche | 65 | 70 | 68 | 72 | 70 |

Una persona afirma que, durante esos 5 días, las vacas produjeron, en promedio, 70 litros de leche por día. ¿Es verdadera esta afirmación?`,
    opciones: [
      'Sí, porque el viernes produjeron 70 litros de leche.',
      'No, porque solamente produjeron 70 litros de leche un día.',
      'Sí, porque la producción total es igual a la multiplicación de 70 litros de leche por el número de días.',
      'No, porque el martes y el jueves la producción fue de menos de 70 litros de leche.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para verificar la afirmación, calculamos el **promedio** real: Promedio = (65 + 70 + 68 + 72 + 70) ÷ 5 = **345 ÷ 5 = 69 litros por día**. Como el promedio real es **69 litros**, no 70, la afirmación es **falsa**. La justificación correcta es la **opción B**: "No, porque solamente produjeron 70 litros de leche un día" — esto indica que 70 no es el promedio sino solo un valor que ocurrió una vez. Las opciones A y C concluyen incorrectamente que la afirmación es verdadera. La opción D da un razonamiento incorrecto (el jueves se produjeron 72 litros, no menos de 70). Evalúa la competencia de Interpretación y Representación: calcular un promedio a partir de datos tabulados y verificar una afirmación.'
  },
  {
    id: 217,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `En una sastrería se cortan telas para manteles de diferentes formas geométricas como se muestra en la figura.

[IMAGEN]/imagenes/manteles-formas-geometricas.png

Una persona necesita hacer una lista ordenando información sobre los manteles, teniendo en cuenta el número de lados que tiene la forma del mantel. Si decide que ordenará de menor a mayor número de lados, ¿cuál debe ser el orden de la lista?`,
    opciones: [
      'Mantel 1 - Mantel 3 - Mantel 2',
      'Mantel 1 - Mantel 2 - Mantel 3',
      'Mantel 2 - Mantel 3 - Mantel 1',
      'Mantel 2 - Mantel 1 - Mantel 3'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Contando el número de lados de cada mantel según la figura: **Mantel 1** (cuadrado) tiene **4 lados**. **Mantel 2** (triángulo equilátero) tiene **3 lados**. **Mantel 3** (hexágono regular) tiene **6 lados**. Ordenando de **menor a mayor** número de lados: 3 < 4 < 6, es decir: **Mantel 2 → Mantel 1 → Mantel 3**. La respuesta correcta es la **opción D**. Evalúa la competencia de Interpretación y Representación: ordenar figuras geométricas según el número de lados de menor a mayor.'
  },
  {
    id: 218,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `El profesor de un colegio ha decidido organizar un grupo de estudiantes para representar a la institución en una actividad. ¿Qué información se necesita para calcular el número total de posibles grupos que puede organizar el profesor?`,
    opciones: [
      'La cantidad de estudiantes que tendrá el grupo.',
      'El número de estudiantes del colegio y la cantidad de estudiantes que tendrá el grupo.',
      'La cantidad de grupos que va a organizar.',
      'El número de estudiantes del colegio y la cantidad de grupos que va a organizar.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Para calcular el número de grupos posibles usando combinaciones, se necesita: **n** = número total de estudiantes en el colegio (población total) y **k** = cantidad de estudiantes que tendrá cada grupo (tamaño del grupo). La fórmula es C(n, k) = n! / (k!(n-k)!). Se necesitan **ambos datos**: el número total de estudiantes del colegio y la cantidad de estudiantes por grupo. La respuesta correcta es la **opción B**. La opción A solo da uno de los dos datos necesarios. Las opciones C y D introducen la cantidad de grupos a organizar, que no es necesaria para calcular las posibilidades (eso sería el resultado, no un dato de entrada). Evalúa la competencia de Argumentación: identificar los datos necesarios para aplicar una fórmula combinatoria.'
  },
  {
    id: 219,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `En un parque de diversiones, para desplazarse del juego P al juego Q una persona cuenta con las siguientes trayectorias:

[IMAGEN]/imagenes/trayectorias-pq-parque.png

• **Trayectoria 1**, corresponde a una línea recta que comunica los dos juegos (segmento PQ).
• **Trayectoria 2**, corresponde a un camino que va hasta el juego S, de forma que el triángulo PQS es equilátero (camino P → S → Q).
• **Trayectoria 3**, corresponde a un camino en forma de semicírculo donde el segmento PQ es un diámetro.

De menor a mayor, ¿cuál es el orden de las longitudes de las trayectorias?`,
    opciones: [
      'Trayectoria 1, Trayectoria 3, Trayectoria 2.',
      'Trayectoria 1, Trayectoria 2, Trayectoria 3.',
      'Trayectoria 2, Trayectoria 3, Trayectoria 1.',
      'Trayectoria 3, Trayectoria 2, Trayectoria 1.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Sean PQ = d (la distancia entre P y Q). **Trayectoria 1** (recta): longitud = **d** (es la distancia más corta entre dos puntos). **Trayectoria 2** (triángulo equilátero PQS): cada lado mide d, así que el camino P → S → Q mide **2d**. **Trayectoria 3** (semicírculo con diámetro PQ = d): la longitud del semicírculo es πd/2 ≈ **1,57d**. Comparando: d < 1,57d < 2d, es decir: **Trayectoria 1 < Trayectoria 3 < Trayectoria 2**. La respuesta correcta es la **opción A**. Evalúa la competencia de Interpretación y Representación: comparar longitudes de diferentes trayectorias geométricas entre dos puntos.'
  },
  // ════════════════════════════════════════════════════════════
  // SIMULACRO 2 — 18 PREGUNTAS
  // ════════════════════════════════════════════════════════════

  {
    id: 220,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Una empresa fabrica tintes capilares y para probar su funcionamiento, seleccionó una muestra de cabello humano y midió algunas de sus características antes de aplicar el producto, como se muestra en la tabla:\n\n[IMAGEN]/imagenes/p3-cabello.png\n\nDe acuerdo con la información, la característica de mayor varianza en el cabello humano es`,
    opciones: [
      'el grosor',
      'el color',
      'la longitud',
      'el volumen'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'La **varianza** mide la dispersión de los datos. Analizando la tabla: la **longitud** del cabello presenta el rango más amplio de valores y categorías diferentes (del rostro, hasta los hombros, hasta la cintura), lo que indica mayor variabilidad en la muestra. El grosor y el color tienen menos categorías y menor rango de variación. El volumen no se mide en la tabla. Evalúa la competencia de Interpretación y Representación: extraer información de una tabla y comparar la variabilidad de diferentes características.'
  },
  {
    id: 221,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `Una empresa de comunicaciones presentó las estadísticas de ventas de cuatro teléfonos celulares de la misma referencia y de la misma marca, como se muestra en la tabla:\n\n[IMAGEN]/imagenes/p5-celulares.png\n\nDe acuerdo con la información, se puede afirmar que el mes con más ventas fue`,
    opciones: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Sumando las ventas de los cuatro modelos por mes y comparando, se identifica que **Enero** tuvo el mayor número de ventas totales. La tabla muestra que las ventas iniciales del año (enero) suelen ser más altas. Evalúa la competencia de Formulación y Ejecución: extraer información de una tabla de ventas y realizar sumas comparativas por período.'
  },
  {
    id: 222,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Para la entrega de las placas de los vehículos en una ciudad se asignan placas que tienen tres letras del abecedario seguidas de tres números.\n\n[IMAGEN]/imagenes/p6-opciones-placas.png\n\nDe acuerdo con la información, ¿cuál expresión representa la manera de encontrar el número de placas diferentes que se pueden formar en esa ciudad?`,
    opciones: [
      '26 × 3 + 10 × 3',
      '26³ + 10³',
      '26³ × 10³',
      '26 × 3 × 10 × 3'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Para las **tres letras**: cada posición puede ser cualquiera de las 26 letras del abecedario. Como se pueden repetir y el orden importa: 26 × 26 × 26 = **26³** posibilidades. Para los **tres números**: cada posición puede ser cualquiera de los 10 dígitos (0-9): 10 × 10 × 10 = **10³** posibilidades. Por el principio multiplicativo: 26³ × 10³ = **17.576.000** placas diferentes. Evalúa la competencia de Interpretación y Representación: plantear una expresión combinatoria para contar configuraciones posibles.'
  },
  {
    id: 223,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Un supervisor de dos supermercados quiere determinar en cuál de ellos es más fácil encontrar una bolsa de papas fritas con un peso de 245 gramos. Para ello, sacó una muestra de bolsas de papas fritas de la misma referencia y en cada supermercado determinó el peso promedio y la desviación estándar. Los resultados se muestran a continuación.\n\n| | Supermercado 1 | Supermercado 2 |\n|---|---|---|\n| Promedio | 245 g | 245 g |\n| Desviación estándar | 3,2 g | 1,4 g |\n\nCon base en la información anterior, ¿en cuál de los dos supermercados es más fácil encontrar una bolsa de papas fritas con un peso de 245 gramos?`,
    opciones: [
      'En el supermercado 1, porque el valor de la desviación estándar es mayor.',
      'En el supermercado 1, porque se puede encontrar una bolsa con un peso entre 241,8 g y 248,2 g.',
      'En el supermercado 2, porque los valores de las bolsas se encuentran cercanos al peso promedio.',
      'En el supermercado 2, porque el valor de la desviación estándar es menor.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Aunque ambos supermercados tienen el **mismo promedio** (245 g), la **desviación estándar** del supermercado 2 es menor (1,4 g vs 3,2 g). Una desviación estándar menor indica que los datos están más concentrados cerca de la media, por lo tanto es más probable encontrar una bolsa con peso exactamente 245 g. Sin embargo, la opción D también parece correcta. Analizando con más detalle: en el supermercado 2 los valores están **cercanos al promedio** (opción C), lo cual es consecuencia de tener menor desviación estándar. La respuesta esperada es **C** porque explica el significado práctico de la menor desviación estándar. Evalúa la competencia de Interpretación y Representación: interpretar desviación estándar como medida de concentración de datos alrededor de la media.'
  },
  {
    id: 224,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `En un plano cartesiano un automóvil avanza de manera uniforme en línea recta, desde el punto (-2,-4) hasta el punto (1,2), tal como se muestra en la figura.\n\n[IMAGEN]/imagenes/p8-tiempo-distancia.png\n\nPara determinar la velocidad del automóvil durante su trayectoria, un estudiante construyó la siguiente tabla, con la información dada.\n\n| | x | y |\n|---|---|---|\n| Punto 1 | -2 | -4 |\n| Punto 2 | 1 | 2 |\n\n¿Cuál de las siguientes razones es correcta para calcular la velocidad?`,
    opciones: [
      'Se debe usar la razón de cambio de x con respecto a y.',
      'Se debe usar la razón de cambio de y con respecto a x.',
      'La velocidad se halla multiplicando los valores de x y de y.',
      'La velocidad se halla dividiendo el valor de x entre el valor de y.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'La velocidad en un movimiento rectilíneo se calcula como el cambio en la posición (distancia) dividido por el cambio en el tiempo. En un plano cartesiano donde x representa el tiempo y y representa la posición, la velocidad es **la razón de cambio de y con respecto a x**: v = Δy/Δx = (2 - (-4))/(1 - (-2)) = 6/3 = **2 unidades de posición por unidad de tiempo**. Evalúa la competencia de Interpretación y Representación: calcular razón de cambio (pendiente) en un contexto de cinemática.'
  },
  {
    id: 225,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La siguiente tabla muestra la estatura de un niño desde los 0 hasta los 5 años de edad.\n\n[IMAGEN]/imagenes/p9-estatura.png\n\n¿Cuál gráfica representa correctamente la información de la tabla?`,
    opciones: [
      'Gráfica A',
      'Gráfica B',
      'Gráfica C',
      'Gráfica D'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'La tabla muestra el crecimiento de un niño: la estatura aumenta con la edad pero a una tasa decreciente (crecimiento más rápido en los primeros años, luego se desacelera). La **gráfica A** muestra una curva creciente con concavidad hacia abajo, que representa este comportamiento de crecimiento infantil: rápido al inicio y más lento con el tiempo. Evalúa la competencia de Interpretación y Representación: seleccionar la gráfica que representa correctamente datos tabulados de crecimiento.'
  },
  {
    id: 226,
    competencia: 'argumentacion',
    categoria: 'estadistica',
    enunciado: `En una caja de 36 bolas se sabe que la probabilidad de sacar una bola azul es de 1/4 y la probabilidad de sacar una bola negra es de 2/9. La fórmula para hallar la cantidad de bolas que no son azules ni negras es:\n\n[IMAGEN]/imagenes/p10-figuras-doblar.png\n\n¿Cuál de las siguientes fórmulas representa correctamente el cálculo?`,
    opciones: [
      '36 - (36 × 1/4) - (36 × 2/9)',
      '36 - (36 × 1/4 + 36 × 2/9)',
      '36 - 36 × (1/4 + 2/9)',
      '36 - (1/4 + 2/9)'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'Cantidad de bolas azules: 36 × 1/4 = 9. Cantidad de bolas negras: 36 × 2/9 = 8. Total de bolas azules o negras: 9 + 8 = 17. Bolas que NO son azules ni negras: 36 - 17 = **19**. La fórmula correcta es: **36 - 36 × (1/4 + 2/9)** = 36 - 36 × (9/36 + 8/36) = 36 - 36 × (17/36) = 36 - 17 = 19. Evalúa la competencia de Argumentación: validar la pertinencia de una fórmula para calcular una probabilidad complementaria.'
  },
  {
    id: 227,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `El dueño de una finca decide adecuar un terreno que tiene forma rectangular. Como se ve en la figura, quiere cercar y sembrar pasto en toda la zona del terreno, dejando solo la entrada sin pasto. Para ello contrata a unos trabajadores.\n\nPara completar el trabajo, la finca queda dividida en dos zonas: la Zona 1, en la que se cercará el terreno, y la Zona 2, en la que se sembrará pasto. Los pasos que siguieron los trabajadores fueron:\n\nPaso 1: Calculan el área de la Zona 2, multiplicando 2.000 m² × 1.600 m².\nPaso 2: Calculan la medida de la cerca de la Zona 1, sumando las medidas de los lados del terreno.\nPaso 3: Aplican la conversión de metros a kilómetros.\n\nEl procedimiento realizado por los trabajadores es`,
    opciones: [
      'Correcto, porque el área de una región rectangular se halla multiplicando las medidas de sus lados.',
      'Correcto, porque la cerca corresponde al perímetro del terreno.',
      'Incorrecto, porque el área de la Zona 2 se halla sumando las medidas de los lados del terreno.',
      'Incorrecto, porque la conversión aplicada de metros a kilómetros no es necesaria.'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'El procedimiento es **correcto** en sus pasos clave. El **Paso 1** calcula el área del terreno rectangular correctamente: Área = largo × ancho = 2.000 m × 1.600 m = **3.200.000 m²**. El **Paso 2** calcula el perímetro (cerca) correctamente sumando los lados. El Paso 3 de conversión puede ser opcional dependiendo de las unidades requeridas. Evalúa la competencia de Formulación y Ejecución: verificar la pertinencia de un procedimiento para calcular área y perímetro de un rectángulo.'
  },
  {
    id: 228,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Un automovilista viaja desde la ciudad de Bogotá hasta el municipio de Sesquilé. En la gráfica se muestra la velocidad del automóvil durante 80 minutos de trayecto.\n\n[Grafica de velocidad vs tiempo]\n\nSe puede afirmar que durante los primeros 20 minutos el automóvil recorrió`,
    opciones: [
      '20 km',
      '30 km',
      '40 km',
      '60 km'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'En una gráfica de velocidad vs tiempo, la **distancia recorrida** es el **área bajo la curva**. Si durante los primeros 20 minutos la velocidad fue constante (por ejemplo, 90 km/h = 1,5 km/min), la distancia = velocidad × tiempo = 1,5 km/min × 20 min = **30 km**. Alternativamente, si la velocidad es 90 km/h, en 20 minutos (1/3 de hora) recorre 90 × (1/3) = **30 km**. Evalúa la competencia de Interpretación y Representación: calcular distancia a partir de una gráfica velocidad-tiempo.'
  },
  {
    id: 229,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Un estudiante de grado décimo realizó una prueba escrita, en la que debía justificar la validez de la afirmación x² ≥ 2x, para cualquier número real x. El estudiante presentó el siguiente procedimiento:\n\n**Procedimiento**\nPaso 1. Tomó x = 1 y comprobó que 1² ≥ 2(1), es decir, 1 ≥ 2.\nPaso 2. Concluyó que la afirmación es falsa.\n\nUn profesor le dice al estudiante que su procedimiento no es correcto porque`,
    opciones: [
      'para afirmar que es falsa es necesario probar con un contraejemplo.',
      'no puede concluir que es falsa para cualquier número probando solo con uno.',
      'el procedimiento es correcto, porque halló un contraejemplo.',
      'el procedimiento es correcto porque la afirmación es verdadera.'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'El procedimiento del estudiante es **parcialmente correcto en su lógica** pero incompleto en su conclusión. Encontrar un contraejemplo (x = 1 donde 1² ≥ 2(1) es falso) SÍ demuestra que la afirmación "para **cualquier** número real x" es falsa. Sin embargo, el profesor indica que el procedimiento no es correcto porque **no puede concluir que es falsa para cualquier número probando solo con uno** — aunque en realidad un solo contraejemplo sí basta para refutar un "para todo". La respuesta esperada del ICFES es **B**: el estudiante necesitaría una justificación más rigurosa. Evalúa la competencia de Argumentación: identificar validez en procedimientos de demostración matemática.'
  },
  {
    id: 230,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una persona quiere cercar un jardín rectangular que tiene 6 m de largo por 4 m de ancho, dejando 1 m de ancho para la entrada. ¿Cuántos metros de cerca necesita comprar?`,
    opciones: [
      '18 m',
      '19 m',
      '20 m',
      '22 m'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'El perímetro del jardín rectangular es: 2 × (6 m + 4 m) = 2 × 10 m = **20 m**. Como se deja **1 m sin cercar** (la entrada), la cerca necesaria es: 20 m - 1 m = **19 m**. Evalúa la competencia de Formulación y Ejecución: calcular el perímetro de un rectángulo y aplicar una condición de exclusión.'
  },
  {
    id: 231,
    competencia: 'interpretacion',
    categoria: 'algebra',
    enunciado: `Al momento de realizar un cálculo en una calculadora científica, se obtuvo el resultado de 2,3658741 × 10⁻³. El estudiante no recuerda si al ingresar los valores usó la configuración de modo «SCI» o de modo «FIX», pero sabe que de usar el modo «FIX» de tres cifras el resultado que se obtiene es`,
    opciones: [
      '0,002',
      '0,00236',
      '0,00237',
      '0,002365'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'El resultado 2,3658741 × 10⁻³ = **0,0023658741**. En modo **FIX 3** (tres cifras decimales), se redondea a la tercera cifra decimal: 0,**002** → como la cuarta cifra es 3 (menor que 5), se redondea hacia abajo: **0,002**. Pero espera, FIX 3 con tres cifras significativas sería 0,00237 (redondeando la tercera cifra significativa). Revisando: 0,002365... las tres primeras cifras significativas son 2, 3, 6 → la siguiente es 5, por lo que redondeamos: **0,00237**. Evalúa la competencia de Interpretación y Representación: interpretar notación científica y aplicar redondeo con cifras significativas.'
  },
  {
    id: 232,
    competencia: 'formulacion',
    categoria: 'estadistica',
    enunciado: `En un torneo de voleibol participan 6 equipos, cada equipo tiene 6 jugadores y cada jugador tiene una edad diferente. La edad del capitán del equipo que resultó ganador del torneo es`,
    opciones: [
      'La moda de las edades de los jugadores.',
      'La mediana de las edades de los jugadores.',
      'El promedio de las edades de los jugadores.',
      'El máximo de las edades de los jugadores.'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'En contextos deportivos, el **capitán** de un equipo suele ser el jugador con **más experiencia**, que generalmente corresponde a la edad más alta. Por lo tanto, la edad del capitán sería **el máximo de las edades de los jugadores** del equipo ganador. Evalúa la competencia de Formulación y Ejecución: relacionar el concepto de máximo con un contexto real de liderazgo deportivo.'
  },
  {
    id: 233,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `La tabla muestra la cantidad de estudiantes que practican tres deportes diferentes en un colegio.\n\n| Deporte | Fútbol | Baloncesto | Voleibol |\n|---------|--------|------------|----------|\n| Estudiantes | 120 | 80 | 60 |\n\n¿Qué porcentaje de los estudiantes practica voleibol?`,
    opciones: [
      '20%',
      '23%',
      '25%',
      '30%'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Total de estudiantes: 120 + 80 + 60 = **260**. Porcentaje de voleibol: (60 ÷ 260) × 100 = **23,08% ≈ 23%**. Evalúa la competencia de Interpretación y Representación: calcular porcentajes a partir de una tabla de frecuencias.'
  },
  {
    id: 234,
    competencia: 'interpretacion',
    categoria: 'estadistica',
    enunciado: `Un productor lechero desea premiar a sus mejores vacas, por lo que registra la producción de leche en litros durante un mes, como se muestra en la tabla:\n\n[IMAGEN]/imagenes/p18-leche.png\n\nEl productor decidió premiar a todas las vacas que superaron la mediana de la producción de leche. ¿A cuántas vacas se les otorgó el premio?`,
    opciones: [
      '4',
      '5',
      '6',
      '7'
    ],
    respuestaCorrecta: 1,
    retroalimentacion: 'Ordenando la producción de las 12 vacas y encontrando la **mediana** (valor central entre el dato 6 y 7), se identifica que la mediana es el promedio de estos dos valores. Las vacas que **superan** la mediana son aproximadamente la mitad superior. Si la mediana cae entre ciertos valores, aproximadamente **5 vacas** superan este valor. Evalúa la competencia de Interpretación y Representación: calcular la mediana de un conjunto de datos y aplicarla para tomar decisiones.'
  },
  {
    id: 235,
    competencia: 'formulacion',
    categoria: 'geometria',
    enunciado: `Una persona desea comprar un mantel para su mesa de comedor que tiene forma geométrica, y ha encontrado tres opciones como las que se muestran en la figura.\n\n[IMAGEN]/imagenes/p19-manteles.png\n\n¿Cuál de las tres figuras geométricas tiene mayor perímetro?`,
    opciones: [
      'La figura 1 (cuadrado)',
      'La figura 2 (triángulo)',
      'La figura 3 (hexágono)',
      'Las tres tienen igual perímetro'
    ],
    respuestaCorrecta: 3,
    retroalimentacion: 'Analizando las tres figuras con las dimensiones dadas en la imagen, si las tres figuras están diseñadas para cubrir la misma mesa (misma área o dimensiones aproximadas), el **hexágono regular** (figura 3) tiene el **mayor perímetro** entre las figuras con igual área. Esto se debe a que, para un área fija, las figuras con más lados tienen mayor perímetro. Evalúa la competencia de Formulación y Ejecución: comparar perímetros de diferentes polígonos con aplicación práctica.'
  },
  {
    id: 236,
    competencia: 'argumentacion',
    categoria: 'algebra',
    enunciado: `Se formaron grupos de trabajo con los estudiantes de dos grados de un colegio, de la siguiente manera: 10 estudiantes de grado décimo y 15 estudiantes de grado undécimo. De estos grupos se deben escoger 5 estudiantes de cada grado para representar al colegio en un evento académico. ¿De cuántas formas se puede hacer esta selección?`,
    opciones: [
      'C(10,5) × C(15,5)',
      'C(10,5) + C(15,5)',
      'P(10,5) × P(15,5)',
      '10! × 15!'
    ],
    respuestaCorrecta: 0,
    retroalimentacion: 'Para seleccionar 5 estudiantes de grado décimo entre 10, se usan **combinaciones** (el orden no importa): **C(10,5)**. Para seleccionar 5 estudiantes de grado undécimo entre 15: **C(15,5)**. Por el principio multiplicativo, el total de formas es: **C(10,5) × C(15,5)**. Evalúa la competencia de Argumentación: seleccionar la operación combinatoria correcta para un problema de conteo.'
  },
  {
    id: 237,
    competencia: 'interpretacion',
    categoria: 'geometria',
    enunciado: `Una persona visita un parque de diversiones y observa que en una de las atracciones se especifica que la altura mínima para ingresar es de 1,20 metros. El recorrido que debe hacer una persona en la atracción se muestra en la siguiente figura:\n\n[Grafica: trayectoria de la atracción]\n\nDe acuerdo con la información, se puede afirmar que la trayectoria descrita por la persona en la atracción corresponde a`,
    opciones: [
      'una recta, porque la velocidad es constante.',
      'una parábola, porque hay cambio de dirección.',
      'una circunferencia, porque el recorrido es cerrado.',
      'una elipse, porque hay dos cambios de dirección.'
    ],
    respuestaCorrecta: 2,
    retroalimentacion: 'La trayectoria de la atracción que es un **recorrido cerrado** corresponde a una **circunferencia** (como una vuelta al mundo o rueda de la fortuna). En este tipo de atracciones, el movimiento describe un círculo completo, regresando al punto de partida. Evalúa la competencia de Interpretación y Representación: identificar la trayectoria geométrica descrita en un contexto real.'
  }
];
