---
name: centro-ayuda-estrategia
description: Documento de referencia estratégico del Centro de Ayuda Comprador — el PORQUÉ detrás de cada decisión de propósito, SEO, GEO, roadmap y videos.
type: reference
project: VMC Subastas — Centro de Ayuda Comprador (superficie de VOYAGER)
captured: 2026-07-06
context: Step back estratégico solicitado por el Arquitecto antes de continuar la producción de contenido. Consolida el IB Macro (ib-maestro, 2026-04-13), el sub-IB SEO/GEO v2 (docs/IB_SEO-GEO_2026-07-03.md) y el estado real del código. No es un plan de tareas — es la razón detrás de las decisiones.
---

# Centro de Ayuda Comprador — Estrategia y razón de las decisiones

**Capturado:** 2026-07-06 · **Fuentes:** IB Macro VOYAGER · Sub-IB SEO/GEO v2 · README · código en `src/`

Regla de lectura: cada sección dice **qué decidimos y por qué**. Lo que no está
decidido está marcado como **`PENDIENTE DE DECIDIR`** — no asumir una respuesta.

---

## 1. Propósito y rol estratégico

### 1.1 Qué problema de negocio resuelve

**El problema raíz no es el volumen de tickets de soporte — es la desconfianza
financiera del lead antes del primer contacto.**

El IB Macro de VOYAGER establece la necesidad: VMC es la plataforma pionera de
subastas digitales de vehículos en Perú, pero su interfaz desactualizada hace
que el lead nuevo se pregunte "¿le voy a dar mi dinero a esto?" y se vaya antes
de evaluar el producto. El centro de ayuda extiende esa misma batalla un paso
antes: el comprador resuelve sus dudas en Google y en motores de IA **antes de
tocar la plataforma**. Hoy esas respuestas las da un tercero, un foro o un
competidor. Ceder las respuestas del propio dominio es ceder el primer
contacto con el lead.

Por eso el orden de prioridades del centro de ayuda es:

1. **Adquisición de confianza** (primario) — ser la respuesta oficial a las
   preguntas del dominio de VMC en Google y en motores generativos, para que
   la confianza financiera empiece a formarse una búsqueda antes de llegar a
   la plataforma. Es el Purpose literal del sub-IB.
2. **SEO / tráfico orgánico** (instrumental) — el long-tail del comprador
   ("cómo funciona la consignación en VMC", "qué son los SubasCoins") es el
   vehículo de lo anterior, no un fin en sí mismo.
3. **Reducción de carga de soporte** (efecto colateral bienvenido) — no es el
   driver de diseño ni tiene métricas asociadas. Si lo fuera, la arquitectura
   sería distinta (deflección de tickets, widget in-app, etc.).

### 1.2 Relación con el posicionamiento frente a competidores

La Hypothesis del IB Macro apuesta a que la velocidad de ejecución con agentes
AI es una ventaja estructural que un competidor con modelo convencional no
replica fácil. El centro de ayuda es la primera superficie donde esa apuesta
se juega fuera de la plataforma: **ser citado por motores de IA antes que
cualquier competidor peruano** es un territorio hoy vacío en el mercado local.
El SEO tradicional es alcanzable por cualquiera con tiempo; la citación
temprana por IA (mientras los competidores ni la están mirando) es la ventaja
asimétrica. Por eso GEO es "el diferencial" y no un extra.

Además, el centro de ayuda proyecta la autoridad de pionera que la UI legacy
esconde: un centro de ayuda completo, con formato propio (Subastín) y capa
técnica cuidada, comunica "esta plataforma es seria" — exactamente el trabajo
de VOYAGER, en la superficie donde el lead llega primero.

### 1.3 Qué NO es este centro de ayuda (anti-scope-creep)

- **No es soporte transaccional.** No hay tickets, ni chat en vivo, ni estado
  de casos. El cierre de cada artículo (`ChatContact`) deriva al canal de
  contacto existente. Construir soporte sería otro proyecto.
- **No es un blog ni content marketing.** Solo responde preguntas del dominio
  propio del comprador VMC. Nada de "5 consejos para comprar tu primer auto":
  eso es long-tail genérico donde VMC no tiene autoridad especial y diluiría
  el foco. El universo de contenido es cerrado: los ~24 artículos del ciclo
  de vida del comprador definidos en `helpCenter.ts`.
- **No toca la plataforma.** Hereda la regla dura de VOYAGER: UI-only, cero
  lógica de negocio. Es un sitio estático (Astro) separado del legacy.
- **No es documentación para vendedores/consignantes.** El scope es
  **Comprador**. Un centro para vendedores sería otra superficie con su
  propio sub-IB.
- **No es una página de FAQs.** Decisión explícita del sub-IB: Google mató
  los FAQ rich results (mayo 2026) y la citabilidad de IA vive en URLs
  dedicadas por tema, no en una página acordeón única.

---

## 2. Decisiones de SEO

Base de evidencia: research 2026-07-03 (sub-IB v2), que distingue evidencia
**causal** (experimentos) de **correlacional** (estudios de campo). Las
decisiones siguen la causal cuando ambas chocan.

### 2.1 Qué SÍ estamos aplicando y por qué

| Práctica | Implementación | Por qué |
|---|---|---|
| **Una URL dedicada por tema** | `/categorias/<categoria>/<slug>` | Long-tail conversacional: páginas que cubren un tema con sus sub-queries tienen +161% de probabilidad de citación; también es la unidad natural de ranking en Google |
| **Jerarquía de 3 niveles** | Home → categoría → artículo | Refleja el ciclo de vida del comprador (Primeros Pasos → Proceso de Subasta → Cierre y Gestión); breadcrumb navegable y `BreadcrumbList` en schema |
| **H2 = pregunta natural del comprador** | Regla de formato con gate | El keyword stuffing REDUCE visibilidad tanto en Google como en motores generativos (Princeton/KDD 2024); la pregunta literal es la keyword long-tail |
| **Metadata completa** | `Base.astro`: canonical, Open Graph, `theme-color`, title/description por página | Higiene estándar; heredada automáticamente al configurar `site` |
| **Schema markup** | Home: `Organization` + `WebSite` (con `SearchAction`) + `CollectionPage`/`ItemList`. Artículo: `FAQPage` + `BreadcrumbList` con `datePublished`/`dateModified` | Reclasificado en v2: es **higiene gratuita, no palanca** — el experimento causal de Ahrefs (1,885 páginas) mostró que el schema solo no mueve citaciones. Se mantiene porque cuesta cero y alimenta comprensión de Google y Bing→Copilot |
| **Sitemap + robots abierto** | `@astrojs/sitemap`, robots.txt permite crawlers de IA | Indexabilidad básica; bloquear GPTBot/ClaudeBot/PerplexityBot contradiría el diferencial GEO |
| **Señales de frescura** | Fecha `updated` visible + fechas en schema | Contenido <3 meses se cita ~2x más. Regla asociada: la fecha solo se toca cuando el contenido se revisa de verdad — actualizar fechas sin revisar es fabricar la señal |
| **Internal linking estructural** | Home ⇄ categorías ⇄ artículos, todo generado desde `helpCenter.ts` | Una única fuente de verdad garantiza cero enlaces huérfanos por construcción |
| **Subcarpeta, no subdominio** | `subastop.com/ayuda` (decisión Arquitecto 2026-07-03; refactor de `base` pendiente pre-deploy) | Un subdominio arranca casi de cero ante Google; la subcarpeta hereda la autoridad del dominio principal desde el día 1 |

### 2.2 Qué NO estamos aplicando todavía, y de qué tipo es cada ausencia

**Por decisión deliberada de fase** (no hacer ahora es lo correcto):

- **Keyword research formal con herramientas** (Ahrefs/Semrush por artículo).
  El universo de queries está definido por el dominio propio: las preguntas
  reales del comprador VMC. Con 2/24 artículos publicados y cero línea base,
  optimizar keywords sería afinar antes de tener masa. Se revisa post-deploy
  con data de Search Console real.
- **Link building / backlinks.** Sin sitio desplegado no hay qué enlazar. El
  primer backlink estructural será el propio `subastop.com` enlazando a
  `/ayuda`; YouTube (Task F) será la segunda fuente.
- **Search Console y medición.** No existe línea base — la validación es
  absoluta (primeros rankings contra fecha de deploy). Activar medición antes
  del deploy no produce nada.
- **Internal linking editorial** (enlaces contextuales entre artículos
  relacionados, ej. "consignación" → "devolución de consignación"). Tiene
  sentido cuando exista masa de artículos; con 2 publicados no hay red que
  tejer. Debe incorporarse a la regla de formato cuando se produzca el
  grueso del contenido.

**Por deuda declarada** (falta, y está registrado como falta):

- **`og:image`** — pendiente de asset real de marca.
- **`site` real en `astro.config.mjs` + `base: "/ayuda"`** — bloqueante del
  deploy, no del contenido.
- **Fecha `updated` manual por artículo** — funciona, pero sin proceso de
  revisión periódica la señal de frescura se degrada sola (ver §6).

### 2.3 Clusters temáticos: qué se prioriza

El "keyword map" del proyecto **es** `helpCenter.ts`: 3 pilares del ciclo de
vida del comprador, 12 categorías, ~24 artículos. No hay un mapa de keywords
paralelo y no debe haberlo — la pregunta del comprador es la keyword, y la
única fuente de verdad evita divergencia.

Clusters con mayor peso natural (más artículos = más superficie long-tail):
**la oferta "En Vivo"** (4 artículos — el corazón transaccional), **la
billetera/SubasCoins** (4), **responsabilidades y sanciones** (3). Los dos
artículos ya publicados (registro, SubasCoins) corresponden al inicio del
ciclo de vida.

**`PENDIENTE DE DECIDIR`** — el **orden de producción de los 22 artículos
restantes**: ¿seguir el ciclo de vida (primeros pasos primero), o priorizar
los clusters de mayor búsqueda/mayor fricción (oferta En Vivo, consignación)?
Criterio sugerido a discutir: producir primero las categorías que desbloquean
la decisión de participar (consignación, oferta En Vivo), porque son las
preguntas con más intención de conversión.

---

## 3. Decisiones de GEO

### 3.1 Qué estamos haciendo para ser citables por LLMs

La postura del proyecto (v2 del sub-IB): **el diferencial GEO vive en la
estructura extractable + frescura + masa de contenido + presencia
multi-plataforma — no en archivos mágicos ni schemas.** Esto viene de
contrastar evidencia causal contra correlacional:

1. **`QuickAnswer` above-the-fold** inmediatamente después del H1, con la
   respuesta a la query principal en 2-3 líneas. Razón: el 44% de las
   citaciones de IA salen del primer 30% de la página.
2. **Datos concretos y cifras cuando existen.** Estadísticas = +32% de
   visibilidad (Princeton/KDD 2024, peer-reviewed, 10,000 queries).
3. **Bloques autosuficientes**: la primera frase debajo de cada H2 responde
   la pregunta de forma aislada. Razón: el motor cita el bloque suelto, sin
   el resto de la página como contexto.
4. **Formato pregunta-respuesta nativo.** El formato "chat con Subastín" no
   es solo branding: cada `ChatQ`/`ChatA` es literalmente un par Q&A
   extractable. La decisión de UX y la de GEO son la misma decisión.
5. **Frescura real** (fecha visible + schema, con la regla de no fabricarla).
6. **Robots abierto a crawlers de IA** + `llms.txt` generado en build desde
   `helpCenter.ts`.
7. **Gate por artículo**: nada se publica sin QuickAnswer + fecha + breadcrumb
   + FAQPage. El gate existe porque la deuda invisible (Challenge D del IB
   Macro) también aplica al contenido: un artículo sin capa GEO no falla
   ruidosamente, simplemente nunca se cita y nadie sabe por qué.

### 3.2 Qué NO estamos haciendo en GEO y por qué

- **No apostamos por `llms.txt` como palanca.** Reclasificado en v2 a
  "higiene casi gratuita": 0.00008% del tráfico de bots de IA lo pide, 97%
  de los archivos nunca se leen, Google confirmó que no lo usa. Se mantiene
  únicamente porque se genera solo desde `helpCenter.ts` — costo cero.
- **No apostamos por schema como palanca de citación.** Mismo motivo (test
  causal de Ahrefs sin efecto). Está, pero como higiene.
- **No hay presencia multi-plataforma todavía.** Es la carencia GEO más
  importante: las menciones en YouTube son el factor individual con mayor
  correlación con visibilidad en ChatGPT (0.737, Ahrefs, 75,000 marcas). Un
  sitio perfecto pero solo tiene techo de citabilidad. La respuesta es la
  Task F (videotutoriales en YouTube, §5) — pendiente porque depende de
  producción de video.
- **No hay monitoreo de citaciones** (preguntar a ChatGPT/Perplexity/AI
  Overviews por las queries del dominio y registrar si citan a VMC). Es
  post-deploy por definición. **`PENDIENTE DE DECIDIR`**: herramienta y
  cadencia (¿manual mensual con un set fijo de queries? ¿herramienta tipo
  Profound/Otterly?).
- **No hay estrategia en otras superficies citables** (Wikipedia, Reddit,
  foros automotrices peruanos). Fuera de scope por ahora — deliberado: el
  esfuerzo disponible se concentra en masa de contenido propio + YouTube.

### 3.3 Tensión SEO vs GEO: cómo se resuelve

**La tensión se disolvió a nivel de arquitectura y se decidió a nivel de
prioridad.** La misma estructura sirve a ambos: H2-pregunta natural es a la
vez la keyword long-tail (SEO) y el bloque extractable (GEO); evitar keyword
stuffing beneficia a ambos; la frescura beneficia a ambos. No hay ningún
punto del formato donde optimizar para uno perjudique al otro (verificado en
el research: el keyword stuffing —lo único que ayudaría marginalmente al SEO
antiguo— reduce visibilidad en ambos canales modernos).

Donde sí hay que elegir es en **esfuerzo e iteración**, y ahí la decisión del
Arquitecto (2026-07-03) es: **SEO como base, GEO como diferencial.** En Perú
el comprador todavía busca mayoritariamente en Google — el long-tail orgánico
es el piso que paga la apuesta. GEO es la ventaja estructural temprana. Si en
el futuro una métrica obliga a elegir (ej. reescribir titulares por CTR de
Google vs citabilidad), el orden de desempate es ese: primero no romper la
base SEO, luego maximizar el diferencial GEO.

---

## 4. Roadmap — qué viene después

Las fases vienen del Task Base del sub-IB; el criterio de orden es
**el cuello de botella manda** (Challenge E: el cuello es contenido, no
arquitectura) y **nada se indexa dos veces** (migrar antes de indexar masivo
para no quemar redirects).

| Fase | Qué | Estado | Por qué en este orden |
|---|---|---|---|
| C (keystone) | Completar los 24 artículos bajo la regla de formato con gate | EN CURSO (2/24) | Sin masa de contenido no hay long-tail que posicionar ni respuestas que citar; todo lo demás está construido y esperando |
| D | Migrar a `subastop.com/ayuda` y desplegar (refactor `base`, canonical/sitemap/llms.txt coherentes) | PENDIENTE | Debe ocurrir ANTES de la indexación masiva — las URLs finales se definen antes de que Google las conozca; si cambian después, cuesta redirects 301 y tiempo de re-indexación |
| E | Medición desde cero: Search Console del nuevo path + monitoreo de citaciones IA | PENDIENTE (post-deploy) | La validación de la Hypothesis es absoluta (primeras citaciones y primeros rankings contra fecha de deploy); antes del deploy no hay nada que medir |
| F | Presencia multi-plataforma: videotutoriales en YouTube enlazados bidireccional | PENDIENTE (depende de producción de video) | Mayor palanca GEO restante (correlación 0.737), pero requiere un activo (videos) que aún no existe; no bloquea C-D-E |

**Qué se pospone conscientemente:** keyword research con herramientas,
internal linking editorial, link building, otras superficies citables, y
cualquier expansión de scope (vendedores, blog, soporte) — razones en §2.2 y
§1.3.

**`PENDIENTE DE DECIDIR`** — coordinación de la Fase D: ¿cuándo y cómo se
monta `/ayuda` bajo `subastop.com`? Depende de la infraestructura del sitio
principal (reverse proxy, hosting del estático) y del timing de VOYAGER. Es
bloqueante del deploy y hoy no tiene fecha ni mecánica definida.

---

## 5. Videos

### Lo decidido

- **Rol: complementarios al texto Y palanca de distribución — nunca
  reemplazo.** El artículo de texto es la unidad indexable/citable; el video
  amplifica. Razón: un video sin artículo no es extractable por LLMs ni
  posiciona long-tail; un artículo sin video pierde la mayor palanca de
  visibilidad en ChatGPT (menciones YouTube, 0.737). Se necesitan mutuamente.
- **Alojamiento: YouTube.** No es una decisión de hosting sino de GEO — la
  palanca ES estar en YouTube (la plataforma que los motores generativos
  citan), no tener el archivo de video. Self-hosted daría cero valor GEO a
  cambio de costo de infraestructura.
- **Título del video = la pregunta del comprador** ("Cómo recargar SubasCoins
  en VMC Subastas") — misma lógica que los H2: la pregunta natural es la
  keyword en el buscador de YouTube y la mención citable.
- **Enlace bidireccional obligatorio**: artículo → video y descripción del
  video → artículo. Cada pieza le pasa autoridad y tráfico a la otra.
- El home ya tiene el banner destacado de videotutoriales (gradiente
  teal→púrpura, firma visual reservada a esta sección) y la página
  `/videotutoriales` existe como placeholder — la superficie está lista.

### `PENDIENTE DE DECIDIR` (todo lo de producción)

- **Quién produce los videos y con qué recursos.** El sub-IB solo registra
  "depende de producción de video del Arquitecto".
- **Formato y duración** (¿screencast con locución? ¿aparece una persona?
  ¿30-90 segundos por pregunta o un video por categoría?). Criterio sugerido
  a discutir: un video corto por artículo espeja la arquitectura
  "una URL por pregunta" y maximiza títulos-pregunta en YouTube.
- **Embebido vs enlazado en el artículo.** Embeber (iframe YouTube) da
  tiempo-en-página y señal de contenido enriquecido, pero carga JS de
  terceros en un sitio hoy 100% estático y rapidísimo. Alternativa: facade
  (thumbnail + click abre YouTube). Decidir cuando exista el primer video.
- **Transcripción.** Cómo garantizar que el contenido del video sea
  indexable/citable en texto: la respuesta natural es que **el artículo ES la
  transcripción curada** (mismo contenido, formato chat), más subtítulos
  correctos en YouTube (no auto-generados) y `VideoObject` schema en el
  artículo cuando se embeba. Falta confirmarlo como regla del gate.

---

## 6. Otros puntos abiertos

### Decidido (registrado aquí para que no se re-litigue)

- **Tono y formato: conversación con Subastín, modelo mental WhatsApp.**
  Preguntas del usuario a la derecha, respuestas de Subastín a la izquierda.
  Cero curva de aprendizaje para un público no técnico, y cada burbuja es un
  par Q&A extractable (§3.1). Las imágenes usan **fotos de personas reales,
  no ilustraciones de la mascota** (decisión b8c03da) — coherente con el
  objetivo de confianza financiera: caras reales, no caricaturas.
- **Arquitectura de información: `helpCenter.ts` es la única fuente de
  verdad.** Pilares, categorías, artículos, contadores, buscador y `llms.txt`
  derivan de ahí. Un artículo sin `href` aparece como "Próximamente" — el
  sitio puede lanzarse incompleto sin verse roto, lo que desacopla el deploy
  de la masa de contenido.
- **Stack mínimo deliberado**: Astro estático + Tailwind 4, cero framework
  JS, buscador client-side sin dependencias, tokens Concorde replicados vía
  `@theme` (no se instalan los componentes React de Concorde). Razón:
  velocidad de carga (señal SEO), cero mantenimiento de dependencias, y el
  sitio es contenido — no necesita estado ni interactividad compleja.

### `PENDIENTE DE DECIDIR`

- **Analítica web.** No hay ninguna herramienta decidida (¿GA4? ¿Plausible?
  ¿solo Search Console?). Sin esto, la Fase E queda coja: Search Console mide
  Google pero no comportamiento (¿el lead que llega al artículo sigue hacia
  la plataforma?). Idealmente decidido antes del deploy para tener data
  desde el día 1.
- **Proceso de frescura.** La fecha `updated` es manual y la regla dice que
  solo se actualiza con revisión real. Falta el mecanismo: ¿revisión
  trimestral del stock de artículos? ¿quién dispara la revisión cuando cambia
  una regla de negocio (ej. cambia la comisión)? Sin proceso, la señal de
  frescura — que se cita ~2x más — se degrada sola en 3 meses.
- **Mantenimiento y ownership a largo plazo.** Hoy el flujo es "el Arquitecto
  provee contenido, el agente maqueta". Post-VOYAGER, ¿quién es dueño del
  centro de ayuda: sigue el Arquitecto, pasa a un rol de contenido en VMC, se
  documenta el flujo para terceros? El README + este doc + el sub-IB son el
  contrato, pero el dueño no está nombrado.
- **Assets pendientes**: `og:image` real, foto real del personaje para el
  avatar de Subastín (hoy es la letra "S"), imágenes de los `ImgPh`
  placeholders en artículos publicados.
- **Búsqueda a futuro.** El buscador client-side filtra títulos. Con 24
  artículos alcanza; si el corpus creciera (vendedores, más superficies),
  habría que decidir búsqueda full-text. Hoy: YAGNI, explícitamente.

---

## Registro de pendientes (resumen ejecutivo)

| # | Pendiente | Sección | Bloquea |
|---|---|---|---|
| 1 | Orden de producción de los 22 artículos restantes | §2.3 | Fase C (en la práctica, la próxima sesión de contenido) |
| 2 | Producción de video: quién, formato, duración, embed vs link, regla de transcripción | §5 | Fase F |
| 3 | Herramienta y cadencia de monitoreo de citaciones IA | §3.2 | Fase E |
| 4 | Analítica web (herramienta) | §6 | Fase E (data desde día 1) |
| 5 | Mecánica y fecha de la migración a `subastop.com/ayuda` | §4 | Fase D (deploy) |
| 6 | Proceso de frescura y ownership a largo plazo | §6 | Post-deploy |

---

## Revision Log

| Version | Date | Change |
|---|---|---|
| v1 | 2026-07-06 | Documento creado consolidando IB Macro + sub-IB SEO/GEO v2 + estado del código. 6 pendientes identificados. |
