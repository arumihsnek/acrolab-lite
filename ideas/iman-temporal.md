# IDEA-002 — Imán temporal de coherencia entre poses

- **Fecha:** 2026-10-10
- **Estado:** incubating
- **Origen:** propuesta del usuario en conversación con Arquitecta
- **Autoridad:** ninguna; no implementar sin nueva aprobación/OpenSpec

## Intención expresada

Un **toggle «imán»** que permita elegir/colocar una pose coherentemente con la **precedente y la siguiente** (el usuario dijo «precedente y anterior» en una frase; la interpretación anterior/siguiente es inferencia), permitiendo modificar una pose y recolocarla según la lógica de la curva de movimiento, o compensar solo una parte del cuerpo.

## Traducción exploratoria (inferencia, no requisito aprobado)

- Función **opt-in** de asistencia editorial: sugerir, no imponer, posiciones o ajustes que suavicen la transición entre poses vecinas.
- Dos ámbitos alternativos: (a) recolocar el cuerpo completo; (b) modificar una rama/segmento elegido con compensación sobre otro grado de libertad permitido.
- Criterios posibles: continuidad de posición y velocidad del COM, suavidad angular por articulación, restricciones geométricas del suelo y mínima alteración de la intención original.
- Ofrecer vista previa y aceptación/rechazo reversible; mantener undo/redo e identidad de poses, y no alterar keyframes adyacentes silenciosamente.
- Encajar con la UI táctil mínima sin introducir un Inspector/solver heredado de AcroLab.

## Límites y riesgos

- La curva interpolada y la continuidad cinemática **no prueban** viabilidad dinámica, estabilidad, torques, fuerzas o seguridad.
- Una transición suave puede ser biomecánicamente imposible; propuestas no deben etiquetarse como «correctas» sin modelo y validación.
- Ambigüedad de qué parte se debe mover, libertad para compensar, anclajes, contactos y prioridad de preservar poses; resolver en futura especificación.
- No introducir restricciones ocultas, autoadaptación persistente ni movimientos inesperados en el editor actual.

## Preguntas para la retrospectiva

1. ¿Cuál es el «imán» mínimo: snapping de posición global, de orientación, de joint, o sugerencia de pose entera?
2. ¿Qué hacer en extremos de la timeline, poses duplicadas, tiempos irregulares, escenas de vuelo y contactos?
3. ¿Cómo comparar un ajuste unilateral con compensación corporal y cómo explicarlo gráficamente?
4. ¿Qué criterio editorial es más estable: minimizar velocidad, aceleración, jerk o diferencia respecto a pose original?
5. ¿Qué UX de preview, toggle, aceptación y cancelación hace esto totalmente opcional?

## Dependencias posibles

Podría emplear (no necesariamente) un estimador del COM de IDEA-001. No necesita IDEA-003 como prerequisito y no debe asumir su existencia.

## Historial

- 2026-10-10: captura inicial; interpretación «anterior/siguiente» pendiente de validación del usuario en retrospectiva.

## Primera versión candidata posterior a v1.0

IDEA-010 define el primer imán de trayectoria: opcionalmente trasladar el actor completo hasta un punto de la guía parabólica al tiempo elegido, sin cambiar articulaciones, sin automatismos al mostrar la curva y sin buscar aún caminos motores. Las compensaciones articulares serían posteriores.
