# Session Progress Log

## Current State

**Last Updated:** 2026-07-08
**Active Feature:** feat-002 — Fase C **COMPLETA** (22/22 publicados). Siguiente: feat-003 (migración a subastop.com/ayuda, bloqueada por pendiente #5) o feat-005 (más videos, in-progress)

## Status

### What's Done

- [x] **feat-002 / Fase C cerrada (2026-07-08):** "Solicitar la transferencia de mis
  Subascoins a mi Subaswallet de SubasCars" eliminado del universo (el artículo ya no
  existe, decisión negocio). Universo final: 22 artículos, 22 publicados con gate
  completo.

- [x] Arquitectura completa: home, categorías dinámicas, formato de artículo, buscador, llms.txt
- [x] Capa técnica SEO/GEO on-page verificada en build (2026-07-03)
- [x] Sub-IB SEO/GEO v2 con evidencia causal (`docs/IB_SEO-GEO_2026-07-03.md`)
- [x] Doc de estrategia con 6 pendientes de decidir (`docs/centro-ayuda-estrategia.md`, 2026-07-06)
- [x] Harness de agentes creado y validado 25/25 (2026-07-06)
- [x] **Sesión 2026-07-07 (commit 9476c1a):** 13 artículos maquetados desde capturas del
  legacy Intercom, todos con gate completo. Categorías completas: billetera 4/5,
  consignación 2/2, visitas 1/1, negociable 1/1, en-vivo 4/4, financiamiento 1/2,
  habilitación 1/1. SubasTour eliminado del universo (decisión negocio); artículo nuevo
  "Fee por el uso de pasarela" agregado a billetera. Enlaces internos editoriales
  incorporados donde el legacy los tenía.
- [x] **Sesión 2026-07-08:** 5 artículos publicados desde capturas del legacy, todos con
  gate completo verificado en HTML: compra-venta 2/2 (comisión, código de pago Pacífico)
  y responsabilidades-sanciones 3/3 (participantes, ganadores habilitados, deuda).
  Re-apuntados 4 enlaces que iban a categoría: 3 hacia el artículo de la comisión
  (botones AQUÍ en negociable y financiamiento + enlace inline en en-vivo) y el botón
  AQUÍ de "¿Cuándo me devuelven la consignación?" hacia responsabilidades de los
  participantes.
- [x] **Sesión 2026-07-08 (cont.):** riesgo-usuario 2/2 publicados (El Riesgo Usuario y
  sus categorías; Canjea puntos VMC) con gate completo verificado. "La oferta con opción
  a financiamiento: VIDEOTUTORIALES" eliminado del universo (decisión negocio: va a la
  página /videotutoriales) — el universo pasa de 24 a 23 títulos. Re-apuntados los 3
  enlaces que iban a /categorias/riesgo-usuario: botones AQUÍ de consignar-es-necesario y
  financiamiento → artículo del canje; enlace inline en ganadores-habilitados → artículo
  de categorías. Enlace cruzado bidireccional entre ambos artículos de riesgo.
- [x] **Sesión 2026-07-08 (Fase F iniciada):** /videotutoriales dejó de ser placeholder —
  3 videos del canal @VMCsubastas embebidos (¿Cómo me registro?, ¡Consignar es
  necesario!, ¿Cómo agendo una visita?) con youtube-nocookie, VideoObject JSON-LD y
  enlace bidireccional artículo⇄video (nota "🎬 ¿Prefieres verlo en video?" tras el
  QuickAnswer de registro, consignación y visitas).

### What's In Progress

- [ ] feat-005 (Fase F): agregar videos de los demás clusters cuando el Arquitecto los
  produzca; verificar subtítulos y fechas reales de publicación para el JSON-LD
  - Details: el Arquitecto pasa capturas del legacy, el agente maqueta con gate SEO/GEO
  - Orden de producción en la práctica: el Arquitecto va pasando por cluster (resuelto de facto)

## Blockers / Risks

- [ ] **Habilitación incompleta:** las capturas del legacy empezaban en "Ya pagué la
  comisión…" — falta el tramo inicial del artículo original (posibles preguntas previas)
- [ ] **Contenido pandemia sin confirmar:** visitas (mascarillas, "coyuntura actual",
  límite 01 visitante) transcrito fiel del legacy 2023 — confirmar vigencia con negocio
- [x] Enlaces a categorías vacías: todos re-apuntados a sus artículos (comisión,
  responsabilidades y riesgo-usuario resueltos 2026-07-08)
- [ ] 6 pendientes de decidir — tabla al final de `docs/centro-ayuda-estrategia.md`
- [ ] 5 puntos ciegos detectados 2026-07-06 (no incorporados aún al doc)
- [ ] `og:image` y assets reales pendientes; fecha `updated` manual sin proceso de frescura

## Decisions Made

- Ver Key Architectural Decisions en `docs/IB_SEO-GEO_2026-07-03.md` y `docs/centro-ayuda-estrategia.md` — no se re-litigan aquí
- 2026-07-07: montos por oferta de capturas (consignaciones, TEA/TCEA de ejemplo) van en
  descripciones de `ImgPh`, no en texto citable — envejecen mal; reglas fijas (US$ 30
  mínimo, fee 3.9%, plazos 48/72/96h, 12 segundos) sí van como texto extractable

## Evidence of Completion

- [x] Build verification: `npm run build` → 36 páginas, sin errores (2026-07-08)
- [x] Gate verificado por artículo en HTML generado (FAQPage + BreadcrumbList presentes)

## Notes for Next Session

Fase C completa: 22/22 artículos con gate. feat-003 (migración a subastop.com/ayuda)
sigue bloqueada por el pendiente #5 del doc de estrategia (qué hay delante del dominio).
Pedir al Arquitecto el tramo inicial del legacy de habilitación (posible ampliación de
ese artículo, no bloquea). Fase F in-progress con 3 videos.

## 2026-07-17 — Correcciones de revisión (comisión, gané en vivo, habilitado)

- Espacios: los seams tipo "serádebitada" venían de compressHTML comiéndose el salto de
  línea antes de `<strong>`/`<a>`; ya estaban corregidos en fuente. Barrido completo de
  `dist` encontró solo uno restante (`¡OJO!</strong>VMC` en subascoins) → corregido.
- Gané una oferta En Vivo: Q1 ahora menciona que el Ganador Directo igual pasa evaluación
  con el vendedor si así lo requiere (hasta 10 días hábiles); recuadro de consignación
  reformulado a "agrega fondos mediante una Recarga o adquiriendo SubasCoins" (por el fee
  de pasarela, no sesgar a una sola opción). JSON-LD sincronizado.
- Habilitado: eliminada la sección Q8 "¿Por qué me dan opción de compra?" y su entrada
  FAQPage (innecesaria en este artículo; sigue existiendo en el-proceso-termino-que-sigue).
- Verificación: `npm run build` → 36 páginas OK; grep de seams en dist → 0.

## 2026-07-17 (cont.) — Correcciones de revisión (participantes, riesgo-usuario, deuda)

- Espacios: los "revisar espacios" de participantes, Pacífico, ganadores habilitados,
  riesgo-usuario y deuda ya estaban resueltos — barrido de seams en dist da 0 en las 36 páginas.
- Participantes: eliminado "18 segundos después de realizar" (queda "al realizar la
  consignación"); "el monto permanecerá consignado" → "retenido"; párrafo de desierta
  reformulado: "Si una oferta En Vivo no reúne el número mínimo de participantes requerido,
  la subasta será declarada desierta y tu consignación será devuelta automáticamente a tu
  Billetera". JSON-LD sincronizado.
- Riesgo Usuario: Q2 "participante, comprador y/o vendedor" → "participante y comprador"
  (tachado en revisión); Q6 agrega "de forma inmediata" al canje de Puntos VMC. JSON-LD sync.
- Deuda: Q1 agrega mención del modal de deuda por incumplimiento; Q3 "se cargó el valor de
  la comisión" → "se aplicarán las sanciones y penalizaciones respectivas, así como
  cualquier otro concepto indicado en las Condiciones de Compra". JSON-LD sync.
- Verificación: `npm run build` → 36 páginas OK; grep de cada cambio en dist confirmado.

## 2026-07-17 (cont.) — Fix de upscaling en capturas

- Causa: `w-full` estiraba las capturas (242–500px naturales) hasta el tope del contenedor,
  con pérdida de nitidez. Fix global vía sed en las 91 imágenes de artículos:
  `w-full max-w-xs|sm|md` → `max-w-[min(20|24|28rem,100%)]` y `w-full` suelto → `max-w-full`.
  Resultado: la imagen nunca supera su tamaño natural; se reduce si el contenedor es menor.
- Las 25 capturas de ancho completo miden ≥774px (> contenedor de ~640px), siguen llenando
  el ancho por reducción. Verificado: build OK y las 3 clases min() presentes en el CSS.
