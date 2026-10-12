# IDEA-005 — Caminos motores y árbol de decisiones acrobáticas

- Fecha: 2026-10-10
- Estado: incubating
- Origen: descripción detallada del usuario de cómo debería acompañar el cuerpo a una manipulación
- Autoridad: ninguna; NO implementar ni contaminar el editor actual

## Intención del usuario

Crear **«caminos» para mover una figura**, aprendidos y estudiados a partir de **muchísimos ejemplos guardados manualmente**. Una modificación local (pecho, coronilla, upper_trunk, tórax, cadera, manos, etc.) desencadena o propone compensaciones y transiciones corporales plausibles para una familia de movimiento. El usuario contempla organizarlos como **árbol de decisiones**; no ha solicitado escoger aún un algoritmo.

## Ejemplos concretos expresados por el usuario

1. Agachar una persona desde el pecho → seguir un buen **plié**, no colapsar segmentos sin coordinación.
2. Abrir `upper_trunk` en el aire → acompañamiento hacia apertura previa a figura hacia atrás: **agrupado, cargado, planchado**.
3. Mover la coronilla abajo → **enroulé** de columna y plié, procurando no desplazar el punto/proyección del peso sobre el suelo.
4. Extender un plié y rotar hacia delante → preparación según inclinación para **cascade**, **flic-flac adelante** o **mortal adelante**.
5. Desde agachado, levantar tórax recto → camino hacia **salto recto**; ligera rotación atrás → apertura para elemento atrás; rotación adelante → preparación para elemento adelante.
6. Bajar las manos al suelo → enroulé progresivo hasta apoyo de manos; avanzar la cadera → transferencia de peso a las manos.
7. Desde ese apoyo, guiar piernas → posible **subida en fuerza a pino**; desplazar tórax por delante → posible **voltereta adelante**.
8. Desequilibrar hacia atrás desde agachado → explorar camino hacia **flic-flac**.

Estos ejemplos son **intenciones editoriales** y pueden tener múltiples ejecuciones técnicas; no son reglas biomecánicas validadas.

## Modelo conceptual por estudiar (inferencia, no especificación)

Un camino candidato podría contener:
- estado de origen, contactos, contexto de vuelo/suelo y segmento sobre el que se actúa;
- gesto o intención de edición, dirección y magnitud;
- posibles estados intermedios, objetivo/familia, alternativas y restricciones;
- secuencia de demostraciones manuales con procedencia, variantes y etiquetas;
- decisiones condicionales y grado de confianza, dejando elegir al usuario y deshacer.

**Árbol de decisiones** es una metáfora útil, pero un grafo con bifurcaciones y caminos que vuelven a unirse quizá represente mejor transiciones reutilizables. Evaluarlo en retrospectiva, sin imponerlo ahora.

## Riesgos y verificaciones pendientes

- Un gesto **no identifica unívocamente** qué elemento se pretende. El contexto importa; ofrecer variantes y selección explícita.
- Mantener fijo el centro de presión real sin medir fuerzas es imposible de garantizar; conservar, cuando sea posible, la proyección estimada del COM o el apoyo geométrico es otra cosa.
- No confundir camino aprendido de ejemplos con trayectoria físicamente posible; las técnicas varían por intérprete, morfología, impulso y superficie.
- Preguntas: ¿cómo almacenar muestras, anotar transiciones y ramas? ¿qué permisos tiene una sugerencia de modificar poses vecinas? ¿cómo evitar soluciones opacas?

## Relaciones

IDEA-001 (shadow), IDEA-002 (imán), IDEA-006 (variantes), IDEA-007 (timeline), IDEA-009 (contraste científico).

## Historial

- 2026-10-10: ejemplos y noción de árbol capturados.
