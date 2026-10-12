# UI plan — mockup first-usable-lite-editor (planificación, NO implementación)

Ruta mockup: `openspec/changes/first-usable-lite-editor/mockups/index.html` (fichero único, sin dependencias).
SVG auténtico: `assets/source/manekin2D-vertical2.svg` cargado intacto vía `<img src="../../../../assets/source/manekin2D-vertical2.svg">`
(4 niveles: mockups→first-usable-lite-editor→changes→openspec→raíz). SHA256 verificado: `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`.
Transforms de demo aplicados SOLO al wrapper exterior `#actorWrap` (CSS translate/rotate/scale); la geometría fuente nunca se reescribe.
Las 13 marcas canónicas del SVG se conservan (2 arcos `head_neck`/`neck_base` + 11 `circle`: collective_fingers wrist elbow shoulder upper_trunk lower_trunk hip knee ankle midtarsal mtp); los 13 botones overlay de articulación usan posiciones % derivadas de esas marcas (viewBox 0 0 210×297), aproximadas e ilustrativas (no redefinen centros).

## 1. Tabla de pantallas / superficies

| # | Superficie | Contenido mockup | Contratos cubiertos | Interacción real en mockup |
|---|---|---|---|---|
| S1 | Escenario + suelo | viewport con grid, línea SUELO fija ~78%, actor SVG intacto, handles táctiles 40px (punto visible 14px) | PRODUCT (suelo DESIGN, handles compactos+hit generosa), GROUND | pan fondo, pinch/botones zoom focal, drag cuerpo con selección vacía, tap junta, hold multi |
| S2 | Barra operaciones | Solo ROTATE/FLIP (sin MOVE, sin Select), botón único EJE: OFF→X→Y→OFF, Undo/Redo ficticios | PRODUCT (2 tools, move implícito), GESTURE | switch tool, ciclo eje (1 botón), undo/redo con aviso |
| S3 | Demo G1 | drag desde marcador seleccionado + radios G1-A/G1-B agrupados (`name=g1`), arco indicador, badge | GESTURE G1 (Human Gate) | arrastre real con feedback distinto por variante |
| S4 | Demo G2 | drag cuerpo hacia suelo + radio G2-A clamp / G2-B reject, badges ámbar/rojo | GROUND G2 (Human Gate) | clamp frena en Y=40px display; reject tiembla y vuelve |
| S5 | Timeline | ruler 0–4s, keys k1/k2/k3 saved + g1 ghost, playhead rojo, UNA fila acciones Play/Add/Copy/Paste/Del + 2ª línea estado t/head | EDITOR-STATE, GESTURE timeline | tap selecciona (no seek), doble tap seek+abre, drag playhead/ruler seek, drag fondo pan, play ficticio, copy simulado sesión |
| S6 | Referencias | REF ON/OFF switch; guías `<img>` duplicadas bajo actor: frozen (dashed, opacidad por distancia a head) + ghost viva (dotted, live) | GROUND-REF lifecycle | toggle, seleccionar keys con REF ON crea guías, deselección las quita |
| S7 | Biblioteca derecha | árbol texto simple (Proyecto/Importadas), SAVE TO LIBRARY vs nota autosave, Insert at head, colapsable; en móvil bottom-sheet + FAB 📚 | EDITOR-STATE biblioteca | colapsar, seleccionar fila (no inserta), botones con aviso |
| S8 | Estado global | header pill `MOCKUP · NO MOTOR`, statusbar con tool/selección/head/activa/eje/REF/undo, toasts "no implementado" | evidencia honesta | siempre visible, responsive |

## 2. Estados (ficticios, sesión)

`tool∈{ROTATE,FLIP}` · `sel:Set(joint)` · `multi:bool` · `axis∈{X,Y,OFF}` (un botón cíclico, preserva `S.axis` del drag) · `refOn:bool` ·
`keys=[k1@0.0,k2@1.0,k3@2.5,g1@ghost@1.7]` · `selKeys:Set` · `activeKey` (solo doble-tap/ADD la cambia) ·
`head` (playhead independiente) · `playing` · `root{x,y,r display}` · `cam{x,z}` · `undo:int ficticio` ·
`g1∈{A,B}` · `g2∈{A,B}` · `libSel`. Navegación (pan/zoom/seek/selección) nunca entra en undo.

## 3. Límites del mockup (NO promete)

- Sin cinemática correcta: ROTATE/FLIP/moves son CSS del wrapper, no ramas/pivotes reales; 360° mostrado como número, no orientación acumulada real.
- Sin guardado durable: autosave y SAVE TO LIBRARY son avisos; recargar pierde estado; sin IndexedDB/localStorage.
- Sin física ni seguridad: suelo/clamp/reject son píxeles display, no contacto exacto de paths ni barrido; etiqueta siempre DESIGN.
- Sin tests T01–T28: ninguna evidencia de este mockup sustituye escenarios Playwright ni el gate humano Android (H2).
- Sin persistencia: Copy guarda `S.clip` solo en sesión (datos demo) o avisa función simulada; Paste sin clip avisa; ningún copy promete guardado durable.
- Eje: un solo botón cíclico OFF→X→Y→OFF con aria-label/title actualizados; misma variable `S.axis` que usa el drag del actor; sin herramienta MOVE.
- Elegancia sobria intencional: grises cálidos + un acento teal (herencia Motion Lab v0.5 recordada por el usuario: sencillez sobria; sin equivalencia exacta afirmada — no hay imagen/fuente v0.5 disponible en esta misión); controles pequeños con áreas táctiles ≥40px; timeline nunca tapada (desktop fija abajo; en móvil es sticky-bottom y la página hace scroll: toolbar compacta 1 fila scroll-X → escenario 340px fijos → timeline). Botonera temporal en UNA fila (`#tlActions` scroll-X, iconos compactos con title/aria-label, estado t/head en 2ª línea `#tlState`); en 390×844 escenario+maniquí+suelo+timeline visibles simultáneamente sin desbordamiento global. Biblioteca móvil con FAB fijo que no tapa timeline (bottom:200px).

## 4. Variantes a evaluar visualmente

### G1 — drag que empieza en marcador de articulación seleccionada
- **G1-A (defecto mockup):** el gesto interpreta lado libre/distal y aplica giro display alrededor del wrapper con badge `G1-A: ROTATE lado libre sobre {joint}` + arco indicador. Pro: flujo continuo, una sola intención. Contra: puede adivinar mal el lado (proximal vs distal) y el usuario no lo pidió explícito.
- **G1-B (alternativa, radio real `name=g1` value=B añadido en esta revisión):** rechaza el inicio-en-marcador con aviso `G1-B: lado interno rechazado… elige lado libre` sin mover nada; el usuario debe re-iniciar el drag sobre el segmento. Pro: nunca rota la rama equivocada; explícito y reversible. Contra: fricción, el marcador resulta "muerto" al arrastrar.
- Decisión abierta: ¿G1-A con desambiguación por dirección inicial, G1-B estricto, o híbrido (umbral angular que pide confirmación)? Registrar elección en Human Gate H1.

### G2 — feedback de conflicto con suelo durante display-move
- **G2-A clamp (defecto):** el actor frena en el suelo (Y hasta 40px), badge ámbar `suelo clamped`, gesto commitea parcial. Pro: exploración fluida, el suelo se siente sólido. Contra: puede ocultar que el ángulo/objetivo era inválido (el usuario cree que "casi vale").
- **G2-B reject:** al cruzar el suelo, badge rojo `suelo rejected`, el actor vuelve a la pose previa y el gesto no commitea. Pro: validez binaria clara, idóneo para playback/keys. Contra: frustrante en arrastres largos donde un clamp parcial ayudaría a ajustar.
- Decisión abierta: ¿clamp para drags libres + reject para ROTATE/FLIP/retime/playback? ¿mismo estilo en táctil y desktop? ¿qué copy y color son legibles al sol en Android? Registrar en H1.

## 5. Decisiones abiertas no resueltas (para H1)

1. G1: semántica rama proximal vs distal con multi-selección disjunta (corte de grafo) — pendiente.
2. G2: clamp vs reject por operación; copy/colores; ¿haptics en Android?
3. Entre-keys: ¿ADD explícito (actual) vs editar key activa con head seguidor? Mockup asume ADD explícito.
4. Zoom-out que extiende duración: mockup no lo simula; falta diseño de aviso + undo visible.
5. Posiciones overlay de joints: 13 hotspots derivados de las 13 marcas canónicas (2 arcos + 11 circle), aproximados a %; el producto deberá proyectar los centros reales a pantalla (tolerancia 0.05px viewport) en vez de % fijos.
6. Biblioteca móvil: ¿bottom-sheet (actual) vs pestaña lateral? Probar con timeline visible.
7. Densidad desktop 1440×900 vs táctil 390×844: tamaños finales de handles visibles (14px ok) y targets (40–44px ok) a validar en hardware H2.

## 6. Comprobaciones (esta misión)

- [x] SHA256 SVG `99ccb171…f097e` verificado con `sha256sum` (hash completo `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`, SVG original intacto, solo `<img>`).
- [x] Rama `develop`, repo `/home/ubuntu/code/acrolab-lite`; sin tocar `/home/ubuntu/code/acrolab`, `.pi/`, config global, código producto; sin commit, sin Goal.
- [x] Playwright NO disponible en este entorno (sin módulo python/node, sin browsers); se usó `chromium-browser --headless` + sonda DOM (`--dump-dom` con `--virtual-time-budget`): screenshots `mockups/shot-1440x900.png` (155 KB) y `mockups/shot-390x844.png` (62 KB) regenerados. Métricas móvil: toolbar h=101px (ya no tapa pantalla), viewport h=340px (≥300), actor visible h=325px con `naturalWidth=794` (SVG carga), timeline visible h=199px, 13 joints, radios G1=A,B / G2=A,B, toggles G1-B/G2-B PASS. Desktop: viewport 598px, actor 424px, timeline 151px. Verificación visual de píxeles pendiente (modelo sin visión); gate humano Android H2 sigue mandatorio.
