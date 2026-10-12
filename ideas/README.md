# Ideas incubadas — contrato de uso (AcroLab Lite)

Estado de este directorio: **CUARENTENA / NO AUTORIZADO PARA IMPLEMENTAR**.
Origen: decisiones e ideas exploratorias del usuario, 2026-10-10.
No es OpenSpec vigente, backlog ejecutable, roadmap comprometido ni criterio de aceptación.

## Finalidad

Conservar ocurrencias, hipótesis, bocetos y alternativas sin contaminar el objetivo de trabajo actual. Se versionan con Git para preservar el origen y permitir revisiones retrospectivas. Permanecen fuera de la KB ordinaria del proyecto mediante `.pi/dashboard/knowledge_base.json` (`exclude: ["**/ideas/**"]`).

## Contrato de lectura, uso y promoción

1. **Captura explícita:** solo se añade o modifica una idea por indicación del usuario o una misión autorizada específicamente para capturar ideas. Preservar el planteamiento original y distinguirlo de inferencias o desarrollos propuestos.
2. **No lectura operativa:** las sesiones Pi que persiguen Goals activos, los revisores del candidato y los Flows de implementación no deben explorar, recuperar, citar ni usar este directorio para orientar decisiones, salvo autorización específica de retrospectiva o promoción. Prohibido incorporar este directorio a los prompts de ejecución.
3. **Autoridad nula:** ninguna idea aquí cambia `AGENTS.md`, `docs/PRODUCT-CONTRACT.md`, `openspec/`, un Goal, el presupuesto, las pruebas o un Human Gate. Si hay contradicción, prevalece el contrato vigente y la idea sigue incubada.
4. **Retrospectiva separada:** cuando termine un hito verificable o el usuario lo pida, se puede examinar lo ejecutado (SHA, tests, incidencias, feedback) frente a las ideas seleccionadas. El informe va a `ideas/reviews/`; no reescribe criterios ni declara la idea aceptada.
5. **Promoción explícita:** la Arquitecta y el usuario evalúan la propuesta; solo tras autorización se redacta un **nuevo cambio OpenSpec** con límites, escenarios, pruebas, riesgos y Human Gates correspondientes. Después se decide si merece un Goal nativo independiente. No se modifica retrospectivamente un Goal ya juzgado.
6. **Sin automatismos:** ningún watcher, KB indexer, agente de resumen, memoria, Flow ni Goal debe transformar ideas en instrucciones. Nunca auto-promover por frecuencia de menciones o similitud con trabajo actual.
7. **Calidad y evidencia:** identificar siempre qué es representación geométrica, heurística editorial, modelo físico, medición o validación biomecánica; prohibido presentar simulaciones visuales como evidencia científica o seguridad acrobática.
8. **Reversibilidad:** añadir ideas no modifica código de producto, servicios, despliegues ni sesiones; cualquier promoción requiere un cambio trazable y revisable. Mantener historial Git.

**Aislamiento:** la exclusión de KB impide indexación habitual, NO restringe acceso al filesystem ni las lecturas por herramientas de Pi. La regla de no lectura es una frontera organizativa; para aislamiento técnico fuerte hacen falta permisos/sandbox o un repositorio con acceso separado.

## Estados permitidos

- `incubating`: idea capturada, sin validación ni mandato de implementación.
- `reviewed`: contraste retrospectivo documentado, sigue sin autoridad operativa.
- `promoted`: la idea referencia explícitamente un cambio OpenSpec aprobado; la autoridad está en ese OpenSpec, no aquí.
- `rejected`: descartada razonadamente, conservada para trazabilidad.

## Formato de cada ficha

Título, ID estable, fecha, estado, origen; intención del usuario; hipótesis/inferencias separadas; alcance exploratorio; límites físicos; incógnitas/criterios de futura evaluación; historial de revisiones; referencia de promoción si existe.

## Índice inicial

- [IDEA-001 — Shadow del COM: equilibrio y proyección dinámica](shadow-equilibrio.md)
- [IDEA-002 — Imán temporal de coherencia entre poses](iman-temporal.md)
- [IDEA-003 — Motor físico 2D mínimo](motor-fisico-minimo.md)
- [IDEA-004 — Escenas con múltiples acróbatas](escenas-multiples-acrobatas.md)
- [IDEA-005 — Caminos motores y árbol de decisiones acrobáticas](caminos-motores.md)
- [IDEA-006 — Biblioteca de transiciones con variantes](biblioteca-transiciones.md)
- [IDEA-007 — Relleno contextual de huecos en timeline](relleno-caminos-timeline.md)
- [IDEA-008 — Superficies elásticas e impulso compartido](superficies-elasticas-impulso.md)
- [IDEA-009 — Intercambio bidireccional Lite ↔ AcroLab](intercambio-lite-acrolab.md)
- [IDEA-010 — Guía parabólica e imán temprano con lower_trunk](guia-parabolica-lower-trunk.md)
- [IDEA-011 — Captura por cámara e importación de ejercicios](captura-video-ejercicio.md)
- [IDEA-012 — Corrección pedagógica y comparación científica diferenciada](comparacion-correccion-pedagogica.md)

Todas las fichas iniciales son `incubating`.

## Intercambio entre proyectos (incubado)

El usuario define AcroLab Lite y AcroLab científico como caminos independientes y complementarios: Lite puede recibir ejercicios científicos con su procedencia y AcroLab puede recibir propuestas de Lite como hipótesis para contrastar/refutar. La futura mecánica de intercambio figura en **IDEA-009** y permanece en cuarentena: no modifica `docs/PROJECT-RELATIONSHIP.md`, `openspec/`, el Goal ni el contrato vigente. La revisión y aceptación de cada exportación/importación exigirá autorización explícita y trazabilidad verificable.


## Precedencia propuesta, no autorizada

Tras una **v1.0 aceptada** por pruebas y Human Gate, la **primera candidata** es IDEA-010: lower_trunk como proxy, guía de vuelo y primer imán global opcional. Las mejoras de COM segmentario y equilibrio (IDEA-001), imán de articulaciones (IDEA-002), caminos motores (IDEA-005/006/007) y física completa (IDEA-003/008) pueden llegar después por ramas independientes. Una idea incubada no es una tarea ni prioridad del Goal vigente.
