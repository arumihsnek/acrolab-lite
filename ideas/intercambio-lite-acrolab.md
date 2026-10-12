# IDEA-009 — Intercambio bidireccional Lite ↔ AcroLab científico

- Fecha: 2026-10-10
- Estado: incubating (mecanismo futuro); la **complementariedad conceptual** es una aclaración explícita del usuario
- Origen: aclaración del usuario sobre dos caminos distintos, paralelos y complementarios
- Autoridad: esta ficha NO autoriza integraciones ni cambios en ningún repositorio

## Visión expresada por el usuario

AcroLab Lite y AcroLab (denominado también «Pro» en la conversación) no son etapas de una misma aplicación. Son **dos caminos paralelos y complementarios**:

- **AcroLab científico → Lite:** Lite puede nutrirse de ejercicios, secuencias, experimentos y casos documentados producidos por la investigación científica.
- **Lite → AcroLab científico:** Lite puede nutrir al laboratorio de hipótesis, propuestas de ejercicios, reacciones y caminos motores que AcroLab intentará **falsear/contrastar**.

Una idea creativa no se vuelve verdadera porque la acepte Lite; y un experimento científico no convierte una técnica ni un camino en la única forma de representar un ejercicio.

## Contrato exploratorio del puente (inferencia, no decisión de implementación)

- Cada lado mantiene **repositorio, OpenSpec, Goal, ejecución y autoridad independientes**.
- Transferir por **artefactos exportados con versión, hash, identidad de rig, unidades, timestamps, origen, supuestos y clase de evidencia**; ningún acceso directo al estado interno del otro.
- Desde Lite: paquete de **hipótesis candidatas**; pose/secuencia/contexto, técnica presumida, apoyos y fuerzas solo si se conocen, predicción contrastable, incertidumbre y casos que la refutarían. No etiquetarlo prueba científica.
- Desde AcroLab: ejercicios y trayectorias con método, resultado, incertidumbre, límites del modelo y estado de validación. Ejemplos negativos/contradictorios también son valiosos; Lite puede ofrecerlos como variaciones, no como garantía de factibilidad.
- **Human Gate explícito en ambas direcciones:** selección y revisión del artefacto, adaptación versionada y aceptación del cambio concreto por el proyecto destinatario. No auto-sincronización ni dependencia de runtime.
- Retener tanto versiones originales como interpretaciones nuevas, con trazabilidad y posibilidad de revertir.

## Posibles experimentos falsables (ejemplos, no afirmaciones científicas)

- ¿Qué rangos de cinemática y contacto son compatibles con un enroulé manteniendo una base de apoyo dada?
- ¿Qué ruta entre poses produce velocidades/aceleraciones y fuerzas compatibles con los supuestos medidos?
- ¿Qué parte de un lanzamiento en báscula proviene del movimiento del aparato y qué parte del movimiento relativo del acróbata?
- ¿En qué circunstancias falla una heurística de caminos motores frente a mediciones o simulaciones más rigurosas?

## Fronteras

El intercambio no debe contaminar el backlog ni importar automáticamente OpenSpecs o reglas de AcroLab a Lite. **Los resultados científicos se comunican con grado de evidencia; los caminos editoriales conservan su libertad creativa.** Evitar circularidad: AcroLab no puede «validar» una hipótesis únicamente porque la simulación reproduce la animación con la que se generó.

## Referencia existente (no modificada)

`docs/PROJECT-RELATIONSHIP.md` ya distingue propiedad intelectual y fronteras de los dos proyectos. Esta ficha solo incuba una formalización futura del intercambio bidireccional.

## Historial

- 2026-10-10: visión de complementariedad ratificada y propuesta de puente capturada, sin promoción.

## Relación posterior — IDEA-012

IDEA-012 propone compartir preguntas falsables surgidas de una comparación pedagógica con AcroLab científico, nunca importar de vuelta criterios científicos sin una revisión explícita.
