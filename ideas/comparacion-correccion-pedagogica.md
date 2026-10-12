# IDEA-012 — Corrección pedagógica de ejercicios y estudio científico diferenciado

- Fecha: 2026-10-11
- Estado: incubating
- Origen: propuesta del usuario de comparar y corregir ejercicios tomando una referencia de biblioteca, con usos distintos para Lite y AcroLab científico
- Autoridad: ninguna. No es OpenSpec vigente, no autoriza implementación ni modifica Goals.

## Intención expresada

Poder elegir un ejercicio aceptado de la biblioteca y **compararlo con la ejecución real de un acróbata** para entender diferencias, problemas y maneras de mejorarlo. Esta comparación podría combinar la captura de cámara (IDEA-011), la timeline, las poses, los caminos aprendidos y la biblioteca de variantes.

El usuario distingue **dos objetivos paralelos y complementarios**:

- **AcroLab Lite — docencia y aprendizaje:** comparar una ejecución con referencias escogidas, visualizar técnica, ritmo, coordinación, postura, apoyos y recorrido; facilitar explicaciones y correcciones pedagógicas a profesores y alumnos.
- **AcroLab científico — investigación y optimización:** estudiar de forma rigurosa qué implican las diferencias en términos de fuerzas, momentos y cargas articulares, impulso, equilibrio, eficiencia y posibles limitaciones mecánicas; formular hipótesis y contrastarlas con simulación y/o medición pertinente.

**Una ejecución aceptada de biblioteca no es una técnica perfecta universal.** Puede haber varias variantes válidas, cuerpos diferentes y fines pedagógicos distintos.

## Flujo candidato para Lite (inferencia exploratoria, no especificación aprobada)

1. Seleccionar un ejercicio o variante de biblioteca como **referencia pedagógica**, documentando quién la acepta y con qué objetivo.
2. Cargar una ejecución dibujada o grabada con cámara; disponer de reproducción en paralelo, vídeo de referencia o reconstrucción manual/asistida.
3. **Alinear fases de ejecución**, no solo tiempos absolutos: preparación, plié, impulso, vuelo, apertura, aterrizaje, o las fases propias del elemento concreto.
4. Comparar ghosts, posiciones relativas, curvas de articulaciones, tiempos, apoyos, desplazamientos, orientaciones y trayectorias de referencia. Distinguir errores de captura de diferencias reales.
5. Señalar **diferencias observables**, como apertura prematura, retraso de brazos, amplitud de plié, variación de orientación o transferencia de apoyo; no inferir automáticamente la causa ni declararlas errores.
6. Permitir que la persona docente **acepte, descarte o corrija** esas observaciones, elija otra técnica como referencia y cree consignas pedagógicas, demostraciones y ejercicios de progresión.
7. Guardar iteraciones para estudiar el progreso del alumno; conservar vídeo/ejemplo original, anotaciones y la referencia concreta utilizada, sin sobrescribirlos.

Una primera versión podría funcionar mediante **comparación manual de dos secuencias/vídeos**, sin visión artificial avanzada, motor físico ni cálculos de carga.

## Línea científica diferenciada (AcroLab; propuesta a contrastar allí)

- Convertir diferencias observadas en **preguntas falsables**: ¿cambia el impulso? ¿la distribución de carga entre segmentos? ¿los momentos articulares? ¿la eficacia de una preparación?
- Exigir modelos físicos, parámetros corporales, condiciones de contacto y datos calibrados antes de estimar fuerzas o cargas; recoger incertidumbre y límites de validez.
- Optimización es **multicriterio**: reducir una carga o aumentar una altura puede perjudicar otra variable. No proclamar una variante «mejor» sin explicitar población, objetivo y tradeoffs.
- Ofrecer a Lite hallazgos versionados y revisados, preservando el desacoplamiento de los dos proyectos de IDEA-009.

## Fronteras y cautelas

- Comparación visual y estimación de poses **no demuestran causalidad ni riesgo de lesión**. No convertir desvíos geométricos en diagnósticos, prescripciones biomecánicas ni calificaciones opacas.
- Las sugerencias pedagógicas son revisables; no sustituyen al profesor ni a la observación real del alumno.
- Privacidad, consentimiento y control de acceso a grabaciones y evaluaciones; cuidado especial con menores.
- El proyecto científico debe validar de manera independiente: nunca decir que una técnica queda científicamente probada porque el editor la reproduzca.
- Cualquier importación/exportación requiere el contrato del puente de IDEA-009, procedencia y aprobación explícita; no tocar el repositorio científico desde la incubadora Lite.

## Preguntas para retrospectiva

1. ¿Quién acepta el ejercicio de biblioteca y bajo qué criterio: profesor, escuela, técnica, contexto o varias variantes?
2. ¿Qué aporta primero más valor: comparar animaciones, vídeos en paralelo o vídeo contra rig animado?
3. ¿Qué fases o detalles técnicos tienen prioridad para un primer caso docente?
4. ¿Cómo distinguir diferencias de estilo y morfología de problemas que el docente desee corregir?
5. ¿Qué observación pedagógica merece enviarse a AcroLab para investigar cargas o rendimiento y con qué evidencia adicional?
6. ¿Cómo mantener la autoría, los consentimientos y la privacidad de las grabaciones y anotaciones?

## Relaciones y orden de maduración

- IDEA-011: importar grabaciones del ejercicio.
- IDEA-006 y IDEA-005: referencias alternativas y caminos de movimiento.
- IDEA-007: visualizar propuestas intermedias o adaptaciones.
- IDEA-004 e IDEA-008: ejercicios con varios acróbatas y aparatos.
- IDEA-009: intercambio de hipótesis científicas y resultados sin compartir control de ejecución.
- IDEA-001 e IDEA-010: guías visuales para orientar comparación, nunca sustituto de medición.
- IDEA-003: futura mecánica opcional, no requisito de una primera comparación pedagógica.

Esta idea sigue **incubada** y no introduce tareas en ninguna versión en curso.

## Historial

- 2026-10-11: registrada la separación de docencia/corrección visual en Lite frente a investigación de cargas, optimización y validación en AcroLab científico.
