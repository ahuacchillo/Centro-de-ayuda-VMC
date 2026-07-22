# Centro de Ayuda Comprador · VMC Subastas

Centro de ayuda estático para compradores de VMC Subastas, construido con
**Astro + Tailwind CSS 4** y el design system **Concorde** de Subastop.
Organiza 24+ artículos según el ciclo de vida del comprador (Primeros Pasos →
El Proceso de Subasta → Cierre y Gestión) y presenta cada artículo como una
conversación con **Subastín**, la mascota de la marca.

## Estrategia

El **porqué** de cada decisión vive en
[`docs/centro-ayuda-estrategia.md`](docs/centro-ayuda-estrategia.md)
(2026-07-06). En corto:

- **Propósito**: ser la respuesta oficial a las preguntas del comprador VMC
  en Google y en motores de IA — adquisición de confianza financiera una
  búsqueda antes del primer contacto. No es soporte, no es blog, no cubre
  vendedores.
- **SEO base, GEO diferencial**: el long-tail en Google es el piso del
  mercado peruano; la citación temprana por IA es la ventaja que ningún
  competidor local está mirando. Una misma arquitectura sirve a ambos.
- **Palancas reales (evidencia causal)**: QuickAnswer above-the-fold,
  H2-pregunta, frescura real y masa de contenido + YouTube. Schema y
  `llms.txt` son higiene gratuita, no palancas.
- **Roadmap**: completar los 24 artículos (2/24) → migrar a
  `subastop.com/ayuda` → medir desde cero → videotutoriales en YouTube.
- **6 pendientes de decidir** (orden de producción, videos, monitoreo IA,
  analítica, mecánica del deploy, proceso de frescura) — tabla al final del
  doc.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # desarrollo en http://localhost:4321
npm run build     # build estático en dist/
npm run preview   # servir el build de producción
```

> Antes de desplegar: cambiar `site` en `astro.config.mjs` por el dominio real.
> Canonical, Open Graph, sitemap y JSON-LD lo heredan automáticamente.

## Estructura

```
src/
├── data/
│   ├── helpCenter.ts        ← ÚNICA FUENTE DE VERDAD (pilares, categorías, artículos)
│   └── icons.ts             ← iconos SVG estilo Lucide (paths inline)
├── layouts/
│   └── Base.astro           ← <head> compartido: SEO, OG, fuente, canonical
├── components/              ← piezas del formato "chat con Subastín"
│   ├── ArticleHeader.astro  ← breadcrumb + H1 con acento en gradiente
│   ├── ChatIntro.astro      ← presentación de Subastín (abre todo artículo)
│   ├── ChatQ.astro          ← burbuja de pregunta (usuario, derecha)
│   ├── ChatA.astro          ← burbuja de respuesta (Subastín, izquierda)
│   ├── ChatContact.astro    ← bloque oscuro de contacto (cierra todo artículo)
│   ├── ImgPh.astro          ← placeholder de imagen (reemplazar por <img>)
│   └── BtnA.astro           ← enlace con estilo de botón primary Concorde
└── pages/
    ├── index.astro          ← home: hero + buscador + acordeones por pilar
    ├── categorias/
    │   ├── [slug].astro     ← página dinámica de categoría (las 12)
    │   └── <categoria>/<articulo>.astro   ← artículos maquetados
    ├── llms.txt.ts          ← llms.txt generado desde helpCenter.ts (GEO)
    ├── videotutoriales.astro
    └── contacto.astro
```

## Flujo de contenido

Todo se edita en **`src/data/helpCenter.ts`**. Cada artículo es
`{ title, href? }`:

- **Sin `href`** → aparece como "Próximamente" en el home y en su categoría.
- **Con `href`** → se vuelve clickeable en el acordeón del home, en la página
  de categoría, entra al buscador y al `llms.txt`. Todo automático.

Para publicar un artículo nuevo: crear
`src/pages/categorias/<categoria>/<slug>.astro` usando los componentes de chat
(copiar `subascoins.astro` como plantilla) y agregar el `href` en
`helpCenter.ts`. Los contadores del home se recalculan solos.

---

## Estilos Concorde

Concorde es el design system de Subastop
([catálogo vivo](https://concorde-v2-theta.vercel.app/r/registry.json)). Este
proyecto no instala sus componentes React: replica sus **tokens** en
`src/styles/global.css` vía `@theme` de Tailwind 4.

### Tokens

| Token | Valor | Uso |
|---|---|---|
| `font-display` | Plus Jakarta Sans | Única familia tipográfica (400–800) |
| `vault-50` | `#f4f5f9` | Fondo de página y chips de icono |
| `vault-100` | `#e9e6f7` | Bordes tenues de tarjetas |
| `vault-300` | `#ae8eff` | Chevrons, acentos suaves |
| `vault-400` | `#9c96f8` | Borde hover, glow radial |
| `vault-500` | `#8460e5` | Acento principal, links, marcadores |
| `vault-700` | `#3b1782` | Titulares secundarios, texto sobre claro |
| `vault-900` | `#200068` | Texto principal, fondos oscuros, **sombras** |
| `teal-vmc` | `#00aeb1` | Gradiente del banner videotutoriales |
| `orange-vmc` | `#ed8936` | Inicio del gradiente del botón primary |

### Firmas visuales (recurrentes en todo el proyecto)

- **Sombra púrpura**, nunca negra: `rgba(32,0,104,…)` en dos capas
  (`0_2px_10px` reposo → `0_8px_16px` hover). Viene de la `categorycard`
  oficial de Concorde.
- **Hover con elevación**: `-translate-y-0.5` (o `-1` en piezas grandes) +
  borde que pasa de `vault-100` a `vault-400`, transición 200ms con curva
  `cubic-bezier(0.25, 0.8, 0.25, 1)`.
- **Fondos oscuros**: gradiente `from-vault-900 via/to-vault-700` + overlay
  `radial-gradient` lila (`rgba(156,150,248,0.3)`) como glow.
- **Botón primary** (`BtnA.astro`): pill (`rounded-full`), gradiente
  `orange-vmc → vault-500`, anillo claro `ring-2 ring-white/50`, sombra
  naranja en reposo y púrpura al hover.
- **Gradiente teal→púrpura** (`teal-vmc → vault-500`): reservado al banner
  destacado de videotutoriales.
- **Texto con gradiente** `orange-vmc → vault-500` (`bg-clip-text`): solo en
  el acento del H1 de cada artículo — mismo par de colores del botón primary.

---

## Anatomía de un artículo (formato "chat con Subastín")

Cada artículo es una conversación: **el usuario pregunta** (burbujas moradas a
la derecha) y **Subastín responde** (burbujas blancas a la izquierda). Modelo
mental WhatsApp: cero curva de aprendizaje.

### Esqueleto

```astro
<Base title={title} description={description}>
  <script slot="head" type="application/ld+json" set:html={JSON.stringify(faqJsonLd)} />

  <ArticleHeader category="La billetera" categorySlug="billetera" subtitle="…">
    Título con <span class="bg-gradient-to-r from-orange-vmc to-vault-500
    bg-clip-text text-transparent">acento en gradiente</span>
  </ArticleHeader>

  <main class="mx-auto max-w-2xl space-y-10 px-4 pt-10 pb-16 sm:px-6">
    <ChatIntro imageLabel="Foto de personaje real saludando" />

    <section aria-labelledby="mi-pregunta" class="space-y-3">
      <ChatQ id="mi-pregunta">¿La pregunta del usuario?</ChatQ>
      <ChatA>…contenido de la respuesta…</ChatA>
    </section>

    <ChatContact imageLabel="Ilustración de cierre" />
  </main>
</Base>
```

### Reglas del formato

| Pieza | Estilo |
|---|---|
| Ancho de lectura | `max-w-2xl` (ancho de chat, no de blog) |
| Pregunta (`ChatQ`) | h2 → burbuja derecha, gradiente `vault-700 → vault-500`, texto blanco bold, esquina inferior-derecha recta (`rounded-br-md`) |
| Respuesta (`ChatA`) | burbuja izquierda blanca, borde `vault-100`, sombra púrpura tenue, esquina superior-izquierda recta (`rounded-tl-md`), indentada `ml-12` bajo el avatar |
| Avatar Subastín | círculo 36px, gradiente `vault-500 → vault-900`, letra "S" (reemplazar por foto del personaje real) |
| Cuerpo de texto | `text-sm sm:text-base`, color `text-vault-900/80`, énfasis con `<strong>` |
| Listas | `list-[square]` con `marker:text-vault-500` |
| Caja destacada | borde `border-2 border-vault-500`, redondeada, dentro de la respuesta |
| Nota de advertencia | borde izquierdo `border-l-4 border-red-500` + `bg-red-50`, texto rojo bold |
| Alerta fuerte | burbuja propia con `role="alert"`, `border-2 border-red-500 bg-red-50` |
| CTA | `BtnA` (botón primary Concorde), centrado cuando cierra un bloque |
| Imágenes pendientes | `ImgPh` con descripción del asset; variante `dark` sobre fondos oscuros. **Acotación:** las imágenes usan fotos de personajes reales — no ilustraciones de la mascota Subastín |
| Animación | clase `msg` + `style="--d:.2s"` → entrada tipo chat (fade + slide 10px), respeta `prefers-reduced-motion` |
| Cierre | `ChatContact`: única zona oscura del artículo (gradiente vault + glow) |

### SEO/GEO por artículo (reglas v2 — ver `docs/IB_SEO-GEO_2026-07-03.md`)

Gate obligatorio: ningún artículo se publica sin estas piezas.

1. **`QuickAnswer`** inmediatamente después del H1 — el 44% de las citaciones
   de IA salen del primer 30% de la página. Debe responder la query principal
   en 2-3 líneas, con datos concretos si existen (estadísticas = +32% de
   visibilidad según Princeton/KDD 2024).
2. **H2 = pregunta natural del comprador** (nunca keyword-stuffed: reduce
   visibilidad en Google Y en motores generativos). La **primera frase debajo
   de cada H2 responde de forma autosuficiente** — el motor cita el bloque
   aislado, sin el resto de la página.
3. **`updated` (ISO)** visible + `datePublished`/`dateModified` en el schema.
   Solo actualizar la fecha cuando el contenido se revisa de verdad —
   contenido <3 meses se cita ~2x más.
4. **Breadcrumb** de 3 niveles (visible + `BreadcrumbList` vía prop de Base).
5. **`faqJsonLd` (FAQPage)** con las Q&A exactas de los H2 — es higiene, no
   palanca: Google ya no da rich results de FAQ (mayo 2026) y el test causal
   de Ahrefs mostró que el schema solo no mueve citaciones. Se mantiene
   porque cuesta cero y alimenta a Bing/Copilot.
6. **Videos**: cuando existan videotutoriales, publicarlos en YouTube con
   título = la pregunta del comprador y enlazarlos bidireccional con su
   artículo — menciones en YouTube son el factor de mayor correlación con
   visibilidad en ChatGPT (0.737, Ahrefs 75k marcas).

`Base.astro` aporta canonical, Open Graph y `theme-color`.

## SEO / GEO del sitio

- **JSON-LD** en el home: `Organization` + `WebSite` (con `SearchAction` hacia
  `/?q=`) + `CollectionPage` con `ItemList` de las 12 categorías.
- **Sitemap** (`@astrojs/sitemap`) referenciado desde `robots.txt`.
- **`/llms.txt`** generado en build desde `helpCenter.ts` con el índice
  completo para crawlers de IA (ClaudeBot, GPTBot, PerplexityBot).
- **Buscador client-side** sin dependencias: filtra categorías y artículos
  ignorando tildes, soporta `?q=` como entrada directa.
