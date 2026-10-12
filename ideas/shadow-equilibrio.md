# IDEA-001 — Shadow gráfico del centro de masas: equilibrio y proyección dinámica

- **Fecha:** 2026-10-10
- **Estado:** incubating
- **Origen:** propuesta del usuario en conversación con Arquitecta
- **Autoridad:** ninguna; no implementar sin nueva aprobación/OpenSpec

## Intención expresada

Antes de poner un motor físico, superponer un **shadow/calculador gráfico** que permita ver dónde se encuentra el centro de masas (COM), su proyección sobre el suelo, su relación con los apoyos y su **evolución prevista en el tiempo**. No es solo un indicador de equilibrio: el usuario quiere **referenciar una pose/shadow siguiente**, mover sus instantes sobre la timeline y comprobar gráficamente cómo los desplazamientos del COM entre poses, la separación temporal y la velocidad estimada afectarían al vuelo después del despegue.

**Ejemplo expresado por el usuario:** desde un plié, colocar una pose de extensión de piernas justo en la salida/despegue; al acercar los instantes en la timeline, la misma elevación del COM ocurre en menos tiempo, lo que sugiere mayor velocidad vertical de salida y una parábola de vuelo cuyo vértice sería más alto, **si esa velocidad se pudiera conseguir realmente**.

## Traducción exploratoria (inferencia, no requisito aprobado)

- Dibujar la **proyección vertical del centro de masas (COM)** estimado del maniquí 2D.
- Dibujar el **intervalo de apoyo** de los contactos de suelo del rig (plano sagital); fuera del intervalo, indicar que no hay equilibrio estático bajo las hipótesis simplificadas.
- Shadow semitransparente como ayuda visual opcional, sin alterar poses, timestamps ni contactos.
- Para secuencias, agregar una **predicción/indicador de coherencia dinámica** basada en desplazamiento, tiempo y velocidades estimadas entre keyframes, no una medición real del peso en el suelo.
- Si se usa la pose siguiente, tratarla como **información de planificación/estimación temporal**, no como una fuerza que actúa hacia atrás en el tiempo.
- Permitir comparar el **shadow de la pose actual con un shadow siguiente elegido** y su timestamp, mostrando COM actual, COM de referencia, desplazamiento y tiempo entre ambos.
- Para la misma trayectoria espacial del COM, al disminuir el intervalo entre instantes (`Δt`) aumenta la velocidad cinemática media estimada (`ΔCOM/Δt`). Una estimación de la velocidad vertical **en el despegue**, si está justificada por la curva local, puede alimentar una trayectoria balística hipotética y la altura adicional `Δh = v_y²/(2g)`.
- Proponer visualizaciones separadas: proyección del COM sobre el apoyo; vector velocidad del COM; ghost de pose futura; arco de vuelo predicho y altura máxima hipotética. El acortamiento temporal puede compararse de forma interactiva sin reescribir automáticamente los movimientos.
- El usuario puede explorar dirección y altura de vuelo **con pocos instantes clave**, tratando la distancia temporal entre poses y la continuidad antes/durante/después del despegue como variables creativas.

## Distinciones físicas imprescindibles

- Proyección del COM ≠ **centro de presión (COP)** ≠ distribución de carga entre pies. Sin fuerzas/contactos modelados o mediciones instrumentales, la herramienta **no puede afirmar dónde está realmente aplicada la reacción del suelo**.
- Las masas segmentarias deben ser parámetros hipotéticos con procedencia, no datos clínicos; el COM geométrico no basta para inferir fuerzas articulares.
- El COM fuera de la base de apoyo indica imposibilidad de equilibrio estático sin fuerzas o apoyos adicionales; no demuestra caída inmediata durante movimiento dinámico.
- La continuidad entre poses no determina por sí sola el impulso ni las fuerzas. No usar el nombre «peso medido» o un semáforo de seguridad.
- La velocidad entre dos poses es una **estimación media**; la velocidad instantánea justo en la pérdida de contacto exige información temporal y derivación adicional. Velocidad de extensión de una pierna o de una articulación **no equivale a velocidad vertical del COM**.
- Comprimir el tiempo de las poses aumenta la velocidad *prescrita por la animación*, pero **no prueba que las fuerzas y los impulsos necesarios sean realizables**. La física del salto depende del impulso neto mientras existe apoyo.
- Una vez en vuelo libre, mover internamente brazos o piernas no modifica la trayectoria del COM (ignorando fuerzas externas como el aire): el arco solo puede actualizarse por velocidad de COM realmente atribuida al instante de despegue, no por la proximidad arbitraria de una pose posterior.
- La proyección sobre el suelo es una representación de la posición del COM, no su totalidad: el shadow dinámico debe mantener separadas sus coordenadas vertical/horizontal y la noción de centro de presión.

## Preguntas para la retrospectiva

1. ¿Cómo representar contacto/apoyo sin inventar presiones? ¿Qué hacer con vuelo, dos apoyos y apoyos distintos de pies?
2. ¿Qué datos temporales usa la estimación: keyframes, interpolación, velocidad del COM, aceleración? ¿Qué límites de ruido/derivación?
3. ¿Cómo distinguir en la UI equilibrio estático estimado y predictor de trayectoria sin sobreprometer física?
4. ¿Qué pruebas de geometría (COM dentro/fuera, cambios posturales, rotaciones, vuelo) y validaciones con casos analíticos necesitan aprobarse?
5. ¿Es posible hacerlo sin afectar editor, render, persistencia ni desempeño táctil?
6. ¿Cómo permite el editor referenciar explícitamente un **shadow siguiente** y cambiar su tiempo sin modificar de manera no solicitada el estado guardado?
7. ¿Qué interpolación y qué vecindario temporal estiman mejor la velocidad **instantánea del COM en el despegue**? ¿Cómo se maneja un contacto de suelo que no está definido?
8. ¿Cómo diferenciar en pantalla una curva cinemática intencional y un vuelo físicamente contrastado, incluso cuando la temporalización parece exigir impulsos imposibles?

## Relación con otras ideas

Candidata a anteceder a IDEA-003 (motor completo). Puede aportar indicadores opcionales al IDEA-002, sin convertirlos en restricciones autoritarias.

## Historial

- 2026-10-10: captura inicial; hipótesis abiertas, sin aprobación de producto.
- 2026-10-10: aclaración del usuario: shadow de referencia siguiente, proximidad temporal de extensión/despegue, velocidad estimada del COM y altura de vuelo proyectada; sin promoción.

## Recorte mínimo candidato posterior a v1.0

IDEA-010 permite primero utilizar lower_trunk como proxy, no como COM físico; guía parabólica y primer imán global. El centro de masas por masas segmentarias y otras predicciones siguen como ampliaciones posteriores.

### Aclaración sobre el primer trazador (IDEA-010)

La primera **guía parabólica simplificada** se define **únicamente con dos poses aéreas sin contacto**. Una pose puede estar casi pegada al suelo, inmediatamente después del despegue, y seguir siendo aérea. **Nunca** se ajusta esa primera guía con una pose apoyada y otra aérea. Las hipótesis posteriores de estimación del impulso durante apoyo permanecen fuera del alcance de esta guía.
