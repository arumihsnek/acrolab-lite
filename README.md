# AcroLab Lite

> **AcroLab Lite es una herramienta creativa y participativa de animación acrobática mecánicamente informada; AcroLab es quien investiga qué parte de esas propuestas resiste el análisis biomecánico. Son complementarios, no competidores.**

Estado: proyecto independiente recién iniciado; especificaciones en planificación, no producto validado.

## Qué es
Editor visual y táctil, sencillo e intuitivo, para componer poses y movimientos acrobáticos 2D (plano sagital), compartirlos y experimentar creativamente. Sus restricciones geométricas son **DESIGN**, no cálculos de fuerzas ni recomendaciones de seguridad.

## Qué no es
No es el Godot Studio de AcroLab. NO importa su modelo de selección heterogénea, modo AUTO, Protect, RigidLink, Lock de articulaciones, compensadores ni solver biomecánico. No traduce la creatividad en evidencia científica automáticamente.

## Relaciones
- **AcroLab Lite**: propuestas, biblioteca de poses, animaciones y colaboración creativa.
- **AcroLab**: investigación, biomecánica, modelos, contraste científico y validación de hipótesis.
- Intercambio futuro: exportaciones versionadas de poses/rig/procedencia con adaptador explícito, nunca dependencia de ejecución de Lite hacia el monorepo científico.

## Origen del prototipo
**El producto Lite continúa el editor interactivo SVG Motion Lab v0.5 existente**, con UI y JavaScript reutilizables en `assets/reference/svg-motion-lab-v0.5.svg` (copia congelada). No se inicia desde cero. AcroLab Lite formaliza pruebas automatizadas y exploratorias de ese prototipo, depura fallos reproducibles y conserva lo aprovechable; el mockup HTML paralelo no lo sustituye. Ver `docs/UX-BASELINE-v0.5.md` y `docs/V05-REALITY-AUDIT.md`. Los experimentos v0.1–v0.4.2 son referencias históricas, no aceptación técnica.
Referencia gráfica del usuario: `assets/source/manekin2D-vertical2.svg`, preservar SVG original y centros marcados, registrar hash y no modificar sin decisión.
Sitio de versiones experimental existente: https://lab.hermesinthenight.duckdns.org/ (no constituye release de Lite).

## Método
Pi nativo por PiBoard, OpenSpec propio del repositorio, GoalRecord con criterios observables, ejecución autónoma nativa /goal, escenarios de prueba, revisión independiente y worktrees para cambios sustantivos; human gates explícitos. No Codex CLI, Jefa, Nudger ni scheduler alternativo.

Iniciar por `AGENTS.md`, `docs/PRODUCT-CONTRACT.md` y `openspec/changes/first-usable-lite-editor/`.
