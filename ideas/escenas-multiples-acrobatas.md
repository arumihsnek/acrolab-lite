# IDEA-004 — Escenas con múltiples acróbatas

- Fecha: 2026-10-10
- Estado: incubating
- Origen: propuesta explícita del usuario, conversación de Arquitecta
- Autoridad: ninguna; NO constituye requisito aprobado ni permiso para implementar

## Intención del usuario

Permitir **añadir diferentes acróbatas en una misma escena**, componer ejercicios individuales y combinados y, a futuro, estudiar relaciones entre varios cuerpos, contacto mutuo y aparatos. Los caminos de cada acróbata podrían combinarse para construir rápidamente ejercicios de dúos, portés y báscula.

## Hipótesis exploratoria (inferencia, NO decisión aprobada)

- Cada acróbata posee identidad, rig, poses, secuencia temporal y transformaciones propias; la escena tiene tiempo compartido.
- Se pueden mostrar varios actores y eventualmente relacionar sus apoyos, contactos, referencias y caminos motores.
- Posibilidad futura de «suelo» o superficie de apoyo distinta por actor o en distintos instantes (IDEA-008), sin asumir una fuerza automáticamente.
- La sincronización entre actores puede describirse editorialmente antes de incorporar restricciones dinámicas.

## Límites y preguntas abiertas

- Coexistencia visual NO implica simulación de choques, fuerza o equilibrio colectivo.
- ¿Cómo sincronizar y editar timelines individuales? ¿Qué datos se guardan para relaciones entre manos, pies y elementos?
- ¿Cómo preservar roles portor/ágil, orientación de cada uno, cambios de apoyo y contactos durante transferencias?
- ¿Qué trazabilidad hace falta si un camino de un actor depende del camino del otro?

## Relaciones

IDEA-005 (caminos), IDEA-006 (biblioteca), IDEA-007 (relleno), IDEA-008 (aparatos), IDEA-009 (puente científico).

## Historial

- 2026-10-10: propuesta capturada, sin promoción.
