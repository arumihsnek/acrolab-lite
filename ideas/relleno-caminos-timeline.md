# IDEA-007 — Relleno contextual de huecos en la timeline

- Fecha: 2026-10-10
- Estado: incubating
- Origen: propuesta del usuario sobre elección «mágica» de caminos entre instantes
- Autoridad: ninguna

## Intención del usuario

Reducir la necesidad de diseñar tantos instantes en la timeline: cuando existan **poses separadas por espacios sin instantes programados**, permitir que el editor **elija o sugiera caminos motores completos** para enlazarlas con sentido, incluyendo variantes y relaciones entre varios acróbatas.

## Comportamiento candidato (inferencia, no compromiso de producto)

- Entre keyframes A y B, mostrar posibles rutas desde biblioteca (IDEA-006), informadas por contexto y gestos (IDEA-005).
- Preview antes de aceptar; mantener intactos A y B, salvo operación separada y explícita.
- Generar resultados reproducibles (identidad del camino, versión de la biblioteca, selección de variante y semillas si procede).
- Permitir seleccionar una variante, mezclar o editar luego los instantes propuestos; deshacer debe recuperar exactamente el estado anterior.
- Distinguir interpolación simple, camino manual reutilizado, predicción geométrica y camino validado científicamente (si existiera).

## Límites y preguntas

- La curva deseada no determina por sí sola contactos, fuerzas ni tiempos biomecánicamente realizables.
- Muchos caminos pueden unir las mismas poses; no elegir silenciosamente el «correcto».
- ¿Qué ocurre si los endpoints tienen apoyos incompatibles, si hay varios actores, o si falta suficiente contexto para proponer una ruta?
- ¿Qué número de instantes conviene materializar y cuándo guardar una curva paramétrica en vez de poses adicionales?

## Relaciones

IDEA-002 (imán temporal), IDEA-004 (actores), IDEA-005 (árbol/grafo), IDEA-006 (variantes), IDEA-009 (intercambio experimental).

## Historial

- 2026-10-10: captura inicial.
