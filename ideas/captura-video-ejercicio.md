# IDEA-011 — Capturar acróbatas con cámara e importar ejercicios

- Fecha: 2026-10-11
- Estado: incubating
- Origen: idea explícita del usuario: «llegar a grabar acróbatas con la cámara y poder importar el ejercicio»
- Autoridad: ninguna; NO autoriza implementación ni modifica la v1.0, OpenSpec o Goals activos

## Intención del usuario

**Grabar a un acróbata o a varios realizando un ejercicio real con una cámara y poder importarlo a AcroLab Lite** como ejercicio aprovechable en el editor: revisar su movimiento, reconstruir poses y tiempos y, eventualmente, convertirlo en una secuencia editable y reutilizable. La formulación original no fija aún si el sistema debe hacer la conversión de manera manual, asistida o automática.

Esta idea conectaría directamente la práctica acrobática real con el editor creativo y podría alimentar la biblioteca de caminos motores y variantes de técnica sin pedir que cada ejercicio se dibuje desde cero.

## Progresión posible (inferencia exploratoria, NO plan aprobado)

1. **Importar o grabar vídeo:** capturar en cámara o cargar un archivo; asociar vídeo, duración, framerate, procedencia y consentimiento a una sesión/ejercicio, sin reconstrucción automática.
2. **Calco asistido:** reproducir y detener el vídeo por instantes; mostrar fotogramas de referencia, alinear el rig manualmente sobre el sujeto y marcar instantes relevantes, suelo, apoyos y contactos.
3. **Reconstrucción de poses asistida:** estimar articulaciones 2D del vídeo y vincularlas al rig de Lite, corregir errores manualmente y extraer tiempos/transiciones. Etiquetar claramente las estimaciones, partes ocultas y nivel de incertidumbre.
4. **Importar ejercicios completos:** producir una secuencia editable con la timeline, pose library, orientación, escala y, si procede, varios acróbatas/objetos. Mantener la fuente audiovisual y la versión de la reconstrucción para comparar/corregir.
5. **Nutrir caminos aprendidos:** reunir demostraciones manuales/reales con variantes individuales para comparar técnicas y enriquecer IDEA-005 (caminos motores), IDEA-006 (biblioteca) e IDEA-007 (relleno de timeline). Sin promoción automática a reglas «correctas».
6. **Puente científico futuro:** con permiso y procedencia, ofrecer ejercicios y secuencias como hipótesis/datos exploratorios a AcroLab científico (IDEA-009), que decide de forma independiente si son aptos para validación.

## Límites importantes

- Una cámara monocular **no determina unívocamente la profundidad ni todas las articulaciones ocultas**; una silueta 2D no equivale a una reconstrucción corporal biomecánica validada. Vista lateral, oblicuidad, distorsión de lente y oclusiones cambian la calidad.
- Importar un ejercicio no significa medir fuerzas, velocidades 3D, impulsos ni el COM real. Cualquier cálculo exige escala espacial, calibración, tiempos precisos y declaración de incertidumbre.
- Capturar **varios acróbatas** requiere seguir sus identidades incluso con cruces, contacto y ocultación (IDEA-004).
- Privacidad, consentimiento de participantes, autorización de uso de imagen, almacenamiento, borrado y posible presencia de menores requieren un diseño cuidadoso. No presuponer subida a servicios externos ni reutilización de las grabaciones para entrenar modelos.
- Conservar **vídeo original** separado de reconstrucción, anotaciones, correcciones y variantes generadas, con trazabilidad y posibilidad de eliminar datos personales.

## Preguntas de retrospectiva

- ¿El primer beneficio buscado es usar el vídeo como referencia/calco o obtener la animación editable automáticamente?
- ¿Grabación dentro de la app, importación desde galería o ambas? ¿Móvil vertical/horizontal y desde qué ángulo?
- ¿Rig de perfil sagital solamente al principio, qué hacer con giros y desplazamientos fuera del plano?
- ¿Qué método de anotación de apoyo, contacto y despegue necesita un ejercicio?
- ¿Qué validación de exactitud frente a keyframes etiquetados manualmente haría falta para confiar en una reconstrucción?
- ¿Cómo registrar y recuperar demostraciones para la biblioteca de caminos sin afirmar que todas son técnicas universales?

## Relaciones y precedencias, NO objetivos autorizados

- IDEA-004: varios acróbatas en una escena.
- IDEA-005 y IDEA-006: registrar ejemplos y caminos motores reales.
- IDEA-007: proponer fotogramas/poses intermedios.
- IDEA-009: intercambio opcional con AcroLab científico.
- IDEA-010: guía parabólica/velocidad editorial con proxy lower_trunk; vídeo podría aportar referencias, pero **no es prerequisito**.
- Captura/importación de vídeo puede madurar **independientemente** del motor físico (IDEA-003), de los imanes y de un sistema completo de visión artificial.

## Historial

- 2026-10-11: idea original capturada; gradientes de automatización son inferencia, no requisitos confirmados.

## Relación posterior — IDEA-012

IDEA-012 permite estudiar pedagógicamente una grabación comparándola con un ejercicio de biblioteca, sin inferir cargas reales solo a partir del vídeo.
