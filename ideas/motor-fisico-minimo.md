# IDEA-003 — Motor físico 2D mínimo

- **Fecha:** 2026-10-10
- **Estado:** incubating
- **Origen:** exploración previa del usuario: velocidad y dirección de despegue, contacto suelo, COM e inercia al redistribuir masa
- **Autoridad:** ninguna; no implementar sin nueva aprobación/OpenSpec

## Intención expresada

Investigar el motor de físicas más pequeño útil para AcroLab Lite: velocidad y dirección de despegue, detección de contactos y masa apoyada, centro de masas, y efecto de desplazar/concentrar masas en la inercia/rotación. Mantenerlo tan sencillo como sea posible.

## Hipótesis de diseño (inferencia, NO especificación aprobada)

- Vuelo del COM en 2D con gravedad uniforme y condiciones iniciales dadas; sin músculos, IK ni colisiones complejas en la primera iteración.
- Centro de masas derivado de una distribución segmentaria de masa explícita y parametrizada.
- Momento de inercia de los segmentos actualizado por postura; tratamiento del momento angular de los segmentos articulados para no simplificarlo falsamente como un rígido único.
- Contacto básico como detector de evento del primer apoyo; no pretender reacción del suelo o reparto de carga sin dinámica de contacto adecuada.
- Integración con el editor solo mediante una futura frontera explícita, opt-in y con datos versionados; evitar que el editor dependa del motor para funcionar.

## Física y epistemología

- En vuelo libre, la trayectoria del COM no depende de replegar/extender segmentos si no aparecen fuerzas externas relevantes.
- Reagrupar masa modifica el momento de inercia; la velocidad de giro responde a la conservación del momento angular **total**, incluyendo movimiento relativo de segmentos.
- Saber dónde está el COM o cuándo se toca el suelo NO equivale a calcular presión, carga articular ni impulso de despegue.
- Resultados serían simulación bajo hipótesis, no validación acrobática ni recomendación de seguridad.

## Preguntas para la retrospectiva

1. ¿Hay valor real no cubierto por el shadow geométrico y el imán temporal (IDEA-001/002)?
2. ¿Se simula solo vuelo hasta primer contacto o también despegue, choque y recepción?
3. ¿Qué integrador, timestep, conservación y casos analíticos probarían suficiencia?
4. ¿Motor propio en Godot 2D o implementación física externa? Decisión separada, no fijada.
5. ¿Cómo registrar masas, condiciones iniciales, incertidumbre y resultados reproducibles?

## Historial

- 2026-10-10: captura inicial como alternativa futura, no compromiso de implementación.
