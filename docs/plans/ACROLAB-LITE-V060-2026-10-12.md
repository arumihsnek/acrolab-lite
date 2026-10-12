# AcroLab Lite v0.60 — plan de planificación (SOLO PLAN, 2026-10-12)

**Sin implementación ni publicación.** Escritor único de documentación en `develop` limpio.
Cambio OpenSpec (autoridad única): `openspec/changes/lite-v060-consolidation-planning/`
(propuesta, diseño, estrategia G-A…G-E, recorridos J1–J12, `specs/lite-v060/spec.md` V60.01–V60.10,
lista de publicación, tareas, revisión). Esto es un resumen legible; la autoridad está en esos archivos.

## De dónde venimos

Candidato C0 (R1 export + F8 playback) → I1 (R6/R7 biblioteca honesta) → P2 (ROTATE pintado) →
P3 (bisector hombro + guardia R1 `97ea8ac`, PASS independiente DeepSeek `2f3a3ee`) → P4/R4
`dcb549e` pendiente de rebase quirúrgico sobre P3 fijo. Suite completa P3: 174/178 (fallos
conocidos A11×2, A15b×1, X4×1 — visibles, no verdes). 60 ficheros de spec; escritorio
completo 7–10 min; diff C0–C3 solo 69 líneas frente a 1500+ de tests.

## Dos hitos (M1 entrega ANTES de L4)

- **M1 `preview privada provisional para jugar` (antes, NUNCA calificada, NUNCA pública):**
  entrada = SHA exacto + cero P0 catastrófico (pérdida de datos / excepción JS bloquea hasta
  la prueba privada) + L0 + L1 en verde + núcleo peligroso J3/J7/J10 en verde (+ resto o
  subconjunto registrado) + sin regresión inexplicada en lo tocado + abrible en local privado
  + lista clara de RED conocidos (A11/A15b/X4 no catastróficos solo visiblemente etiquetados).
  El juego del usuario y el feedback Android vienen DESPUÉS de la entrega; el veredicto L4
  NO es entrada de M1. Sin rediseño visual no aprobado.
- **M2 alfa pública 0.60 (después, solo con L3 + revisión DeepSeek + L4 + A15b/A11/D4 + causa
  raíz X4 + aprobación exacta G5 + L5):** incremento acotado vía CAS del portal con ensayo
  de rollback en vivo. Beta fuera de alcance; el permiso alfa general previo NO autoriza
  automáticamente la 0.60.

## Alcance M1 (fijo) y diferidos

M1: selección simple/múltiple segura, ROTATE marcador-bilateral vs pieza-unilateral, FLIP
simple (arco + marcador X/Y/OFF), arrastre de actor sin selección, cámara/pinch, suelo que
no se atraviesa, timeline completo con Undo puro, REF coherente (congelado vs fantasma vivo),
persistencia honesta + export/import en frío, sin Inspector, cajón móvil.
Diferidos (no eximidos): multi-FLIP, biblioteca enlazada con servidor, Beta, D4-público, U5A,
A11 — cada uno con su puerta humana.

## Pruebas sin producto cartesiano

Nada de 13 articulaciones × 3 modos × 2 lados × 2 entradas. Matriz unitaria de datos (13
adyacencias, 4 caminos, reductor/Undo/suelo/localStorage, segundos) + navegador solo con
muestras: 4 topologías, marcador vs pieza vs sin selección, ratón + una muestra táctil.
Doce recorridos J1–J12 (~8–15 ficheros Playwright con `test.step`, página/estado fresco,
`pageerror` siempre, adjuntos solo al fallar). Niveles: L0 commit, L1 diff (~1 min), L2 hito,
L3 completo UNA vez sobre SHA inmutable, L4 manual Android/escritorio, L5 portal antes de
publicar. Revisor independiente de otro proveedor (DeepSeek) + revisión de seguridad del
portal + aceptación UX del usuario.

## Puertas humanas y lista de publicación

G0 aprobar plan · G1 rebase R4 · G2 entregar M1 (sin veredicto previo) · G3 decisiones A11/U5A/D4 ·
G4 Android real (tras M1, puerta de M2) · G5 alcance exacto alfa pública (con causa raíz X4:
test clasificado o fix, nunca eximido) · G6 Beta (fuera). Lista M2: SHA fuente/tests/runner exactos,
entorno navegador probado, assets protegidos intactos (`99ccb171…`, `93246123…`), evidencia
cruda archivada, sin regresión inexplicada, Android real vertical+horizontal, sin
Inspector/gutter, portal (allowlist/CSP/canal/slug, feedback apagado, topes de privacidad,
HTTPS+PWA/cachés), CAS viejo→nuevo fijado, rollback ensayado y firmado, ref Beta intacta,
aprobación de alcance, monitoreo y rollback. Distinguir
borrador/comprometido/revisado/integrado/publicado. Sin despliegue.

## Preguntas genuinas para el usuario

1. ¿Aprueba G0 (alcance M1 + estrategia + niveles) y con qué escritor (Muse o MiMo)?
2. ¿Decisión U5A (posición de biblioteca en escritorio) y veredicto gráfico A11 ahora o se
   excluyen de M1 por escrito?
3. ¿D4-persistencia entra en M2-público o queda en puerta separada posterior?
4. ¿Alcance exacto candidato para G5 cuando llegue (qué SHA, qué instalación, qué rollback)?
