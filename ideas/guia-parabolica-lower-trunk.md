# IDEA-010 — Guía parabólica e imán temprano con proxy lower_trunk

- Fecha: 2026-10-10
- Estado: incubating
- Origen: propuesta explícita del usuario, anotada como **primera candidata posterior a v1.0**
- Autoridad: ninguna; no autoriza implementación ni redefine la v1.0

## Propuesta del usuario

Usar inicialmente la articulación **lower_trunk** como referencia simplificada en lugar de calcular el centro de masas real con masas segmentarias. Construir una **guía parabólica** a partir de instantes de vuelo y usar un **imán opcional** para colocar la figura sobre ella. Esto podría ser lo primero en incorporarse una vez que la v1.0 del editor haya sido verificada y aceptada.

## Versión mínima sugerida (interpretación, no especificación aprobada)

1. Marcador lower_trunk = **proxy cinemático**, nunca COM real o dato medido; se mantiene separado de la proyección del punto de apoyo.
2. **Requisito de origen de la guía: exactamente dos poses de la misma fase aérea con tiempos distintos y sin contacto**, una anterior y una posterior. La **primera puede situarse a un nanómetro del suelo, inmediatamente después de perder el contacto en el despegue**: lo decisivo es que ya sea aérea, NO su altura o distancia visual al suelo. Trazar la parábola hipotética correspondiente a las posiciones globales del proxy y gravedad constante en unidades calibradas. No calcular fuerza de salto ni inercia.
3. Mostrar **solo la curva guía** y resaltar en ella el punto previsto para el tiempo seleccionado de la timeline. Si existen más instantes aéreos, indicar si se apartan de esa misma curva; no imponerles una trayectoria.
4. Imán temprano: **opt-in y reversible**; al usarlo, trasladar el acróbata entero para encajar su proxy en el punto de la curva, sin editar ángulos articulares ni mover poses/shadows por mostrar la guía.
5. La rejilla con marcas gravitatorias dependería de la escala espacial y de los segundos reales de la timeline. Sin calibración, usar unidades editoriales y etiquetarlas.
6. **No usar una pose apoyada como primer dato de la guía**, ni mediante un botón ni como alternativa aproximada. Si solo hay una pose aérea, no hay dos observaciones válidas y todavía no se traza la parábola. La última pose de apoyo puede mostrarse de referencia, pero NO participa en el ajuste.
7. No requiere simulación, caminos motores, compensación corporal ni COM segmentario; mantiene íntegra la edición v1.0.

## Limitaciones físicas indispensables

- Solo el **COM real** de un sistema en vuelo libre sigue necesariamente una parábola bajo gravedad uniforme; un punto del tronco ligado a una figura que gira o cambia forma puede desviarse mucho. La guía de lower_trunk es por diseño **editorial**.
- Con dos posiciones **aéreas** conocidas y sus tiempos, la parábola del proxy bajo gravedad prefijada puede definirse algebraicamente, pero no prueba que el movimiento global del cuerpo la pueda realizar.
- **Dos poses estrictamente aéreas.** La primera puede estar a distancia minúscula del suelo tras el despegue; el criterio es ausencia de contacto, no superar un umbral arbitrario de altura. Una pose todavía apoyada y otra aérea nunca forman la pareja: el tramo incluiría aceleración por reacción del suelo.
- El imán simple solo cambia la traslación global y no garantiza ausencia de contactos no válidos, estabilidad ni biomecánica real.
- No confundir tiempo de animación acortado con impulso físicamente alcanzable.

## Precedencia exploratoria (NO trabajo autorizado)

**v1.0 aceptada** → **IDEA-010 (guía y primer imán global)** → opcionalmente COM estimado por segmentos (IDEA-001), imán corporal (IDEA-002), caminos motores (IDEA-005/006/007) o motor (IDEA-003), sin obligar un único orden entre estas evoluciones.

## Preguntas para futura revisión

- ¿Cómo define la v1.0 una fase aérea y la pérdida efectiva de contacto, incluso a distancia casi nula del suelo, sus tiempos y el joint exacto lower_trunk?
- ¿Qué escala píxel/metro hay o se elige? ¿En qué eje apunta gravedad?
- ¿Cómo se decide cuál es la pareja de keyframes aéreos y cómo se muestra una inconsistencia?
- ¿Cómo se rechaza un snap que penetra un suelo o interfiere con un apoyo?
- ¿Cómo demostrar con tests y casos de rotación que se trata de una guía del proxy y no de un COM validado?

## Historial

- 2026-10-10: captura inicial, pendiente de retrospectiva y promoción expresa.

- 2026-10-10: corrección explícita del usuario: **siempre dos poses aéreas**; la primera puede estar a un nanómetro del suelo, justo tras la separación. Eliminada opción apoyada→aérea.
