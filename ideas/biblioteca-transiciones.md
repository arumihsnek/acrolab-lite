# IDEA-006 — Biblioteca de transiciones inicio → final con variantes

- Fecha: 2026-10-10
- Estado: incubating
- Origen: propuesta del usuario
- Autoridad: ninguna; fuera de OpenSpec vigente

## Intención del usuario

Guardar muchos ejemplos **manualmente construidos** y crear «casillas» o unidades reutilizables que posean **postura inicial, postura final y varias maneras de recorrer el camino**. Por ejemplo: varias técnicas de *abrir para un elemento hacia atrás*, distintos *enroulés*, entradas, salidas y preparaciones, sin uniformizar estilos.

## Hipótesis de estructura de biblioteca (por contrastar)

Una unidad candidata podría registrar:

- ID y procedencia del ejemplo (autor, sesión, revisión, aprobación, modelo de rig).
- Postura de entrada y salida, con contactos y referencia de suelo/objeto.
- Secuencia interna de poses/tiempos o curva; demostración original que no se sobrescribe.
- Familia de elemento, intención, gestos iniciales, alternativas y condiciones en las que no se aplica.
- Variantes técnicas A/B/C, sus diferencias y límites; sugerencias separadas de la fuente manual.
- Posible composición de bloques para ejercicios y combinaciones multiacrómata (IDEA-004).

Esto es **esquema exploratorio**, no formato de datos aprobado.

## Preguntas para estudio posterior

- ¿Cómo reconocer compatibilidad entre entrada de un bloque y pose actual sin forzar transformaciones imposibles?
- ¿Cómo tratar escala, alturas, diferentes cuerpos y velocidades temporales?
- ¿Cómo mantener variaciones personales sin construir una «técnica correcta» ficticia?
- ¿Cómo transportar casos contrastados desde AcroLab con evidencia/procedencia y sin adquirir automáticamente autoridad en Lite?

## Historial

- 2026-10-10: captura inicial.
