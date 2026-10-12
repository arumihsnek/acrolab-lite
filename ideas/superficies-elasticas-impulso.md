# IDEA-008 — Superficies de apoyo alternativas, elasticidad e impulso compartido

- Fecha: 2026-10-10
- Estado: incubating
- Origen: propuesta del usuario: superficies diferentes, cuerpo elástico, báscula y varios acróbatas
- Autoridad: ninguna; NO hay promesa de simulación física

## Intención del usuario

Poder añadir **cuerpos u objetos elásticos** y dejar caer un acróbata encima; que el imán/caminos respondan con una reacción sugerida o reconstruyan una posibilidad entre instantes no programados. Poder escoger como «suelo» de cada acróbata otra superficie u objeto. En una **báscula**, contemplar la acción de otro acróbata sobre el extremo contrario y cómo el movimiento del aparato contribuye a la velocidad de despegue del primero.

## Descomposición exploratoria

1. Superficie geométrica de referencia por actor, que puede moverse y rotar.
2. Detección y anotación de contactos y cambios de apoyo (suelo, manos, otro cuerpo, aparato).
3. Biblioteca de **reacciones observadas/ejemplificadas** por contexto, incluso antes de resolver dinámica.
4. Modelo físico opcional de contacto, impulso, movimiento de objeto, deformación y restitución.
5. Reacciones y secuencias coordinadas entre varios acróbatas sobre un elemento común.

## Precisión física necesaria

- En el instante de separación puede descomponerse la velocidad del acróbata en **velocidad de la superficie de contacto + velocidad relativa** (en el marco y dirección apropiados). Esto NO implica sumar libremente «impulsos totales».
- La velocidad de la báscula durante el contacto depende del torque, masas, geometría, fuerzas, momento angular y condiciones de contacto. Un empuje del compañero no permite inferir automáticamente una velocidad de vuelo.
- Un cuerpo elástico puede almacenar y devolver energía; la respuesta depende de rigidez, amortiguación, deformación, velocidad y masas, no solo de la altura de caída.
- El «camino» editorial de reacción es una **hipótesis candidata**, no una predicción contrastada.

## Preguntas para retrospectiva

- ¿Qué casos bastan para una primera biblioteca de reacciones manuales, sin afirmar física?
- ¿Cómo formalizar contactos con superficies móviles y distinguir suelo de apoyo local?
- ¿Qué experimentos científicamente contrastables debería recibir AcroLab? (báscula, impacto, restitución, cambio de apoyo)
- ¿Qué pruebas de conservación/energía y datos empíricos harían falta para promover una simulación?

## Relaciones

IDEA-003 (motor mínimo), IDEA-004 (escena), IDEA-005/006/007 (caminos), IDEA-009 (intercambio científico).

## Historial

- 2026-10-10: captura inicial.
