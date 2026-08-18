import type { IconName } from "./icons";

/* ──────────────────────────────────────────────────────────────────────────
   DATOS EDITABLES — Centro de Ayuda Comprador
   Única fuente de verdad: alimenta el home, las páginas de categoría,
   el buscador y llms.txt. Un artículo con `href` es un link; sin `href`
   se muestra como "Próximamente".
   ────────────────────────────────────────────────────────────────────────── */

export interface Article {
  title: string;
  href?: string;
}

export interface Category {
  title: string;
  slug: string;
  icon: IconName;
  articles: Article[];
}

export interface Pilar {
  pilarTitle: string;
  description: string;
  categories: Category[];
}

export const navigationPilars: Pilar[] = [
  {
    pilarTitle: "Primeros Pasos",
    description: "Todo lo que necesitas para empezar a participar en VMC Subastas.",
    categories: [
      {
        title: "El registro",
        slug: "registro",
        icon: "userPlus",
        articles: [
          {
            title: "¡Registrarte es fácil y rápido!",
            href: "/categorias/registro/registrarte-es-facil-y-rapido",
          },
        ],
      },
      {
        title: "La billetera",
        slug: "billetera",
        icon: "wallet",
        articles: [
          {
            title: "SubasCoins: ¿Qué son, para qué sirven y cómo se adquieren?",
            href: "/categorias/billetera/subascoins",
          },
          {
            title: "La Recarga: ¿Cómo funciona?",
            href: "/categorias/billetera/la-recarga",
          },
          {
            title: "Devolución de mi saldo",
            href: "/categorias/billetera/devolucion-de-mi-saldo",
          },
          {
            title: "Fee por el uso de pasarela",
            href: "/categorias/billetera/fee-por-uso-de-pasarela",
          },
        ],
      },
      {
        title: "La consignación",
        slug: "consignacion",
        icon: "package",
        articles: [
          {
            title: "¡Consignar es necesario para participar!",
            href: "/categorias/consignacion/consignar-es-necesario-para-participar",
          },
          {
            title: "¿Cuándo me devuelven la consignación?",
            href: "/categorias/consignacion/cuando-me-devuelven-la-consignacion",
          },
          {
            title: "SubasPass: Tu pase. Tu estrategia. Tu momento.",
            href: "/categorias/consignacion/subaspass",
          },
        ],
      },
    ],
  },
  {
    pilarTitle: "El Proceso de Subasta",
    description: "Conoce cada modalidad de oferta y cómo participar con confianza.",
    categories: [
      {
        title: "Las visitas",
        slug: "visitas",
        icon: "mapPin",
        articles: [
          {
            title: "Las visitas e inspecciones físicas",
            href: "/categorias/visitas/las-visitas-e-inspecciones-fisicas",
          },
        ],
      },
      {
        title: "La oferta “Negociable”",
        slug: "oferta-negociable",
        icon: "messageCircle",
        articles: [
          {
            title: "La oferta “Negociable”: ¿Cómo funciona?",
            href: "/categorias/oferta-negociable/la-oferta-negociable-como-funciona",
          },
        ],
      },
      {
        title: "La oferta “En Vivo”",
        slug: "oferta-en-vivo",
        icon: "gavel",
        articles: [
          {
            title: "La oferta “En Vivo”: Aquí está la información que buscabas",
            href: "/categorias/oferta-en-vivo/la-oferta-en-vivo-informacion",
          },
          {
            title: "La oferta “En Vivo”: ¡Es hora de participar!",
            href: "/categorias/oferta-en-vivo/es-hora-de-participar",
          },
          {
            title: "La oferta “En Vivo”: El proceso terminó. ¿Ahora, qué sigue?",
            href: "/categorias/oferta-en-vivo/el-proceso-termino-que-sigue",
          },
          {
            title: "Gané una oferta “En Vivo”: ¿Cuáles son los siguientes pasos?",
            href: "/categorias/oferta-en-vivo/gane-una-oferta-en-vivo-siguientes-pasos",
          },
        ],
      },
    ],
  },
  {
    pilarTitle: "Cierre y Gestión",
    description: "Del martillazo a la entrega: trámites, responsabilidades y garantías.",
    categories: [
      {
        title: "La habilitación",
        slug: "habilitacion",
        icon: "badgeCheck",
        articles: [
          {
            title: "¡He sido habilitado para comprar! ¿Qué hago ahora?",
            href: "/categorias/habilitacion/he-sido-habilitado-que-hago-ahora",
          },
        ],
      },
      {
        title: "El proceso de compra venta",
        slug: "compra-venta",
        icon: "fileText",
        articles: [
          {
            title: "La Comisión, ¿Por qué, cuánto y cómo se paga?",
            href: "/categorias/compra-venta/la-comision-por-que-cuanto-y-como-se-paga",
          },
          {
            title: "¿Cómo uso el código de pago de Pacífico?",
            href: "/categorias/compra-venta/como-uso-el-codigo-de-pago-de-pacifico",
          },
        ],
      },
      {
        title: "Responsabilidades y sanciones",
        slug: "responsabilidades-sanciones",
        icon: "scale",
        articles: [
          {
            title: "Responsabilidades de los participantes y sanciones por incumplimiento.",
            href: "/categorias/responsabilidades-sanciones/responsabilidades-de-los-participantes",
          },
          {
            title: "Responsabilidades de los ganadores habilitados y sanciones por incumplimiento.",
            href: "/categorias/responsabilidades-sanciones/responsabilidades-de-los-ganadores-habilitados",
          },
          {
            title: "¿Tienes una deuda y quieres participar en una oferta?",
            href: "/categorias/responsabilidades-sanciones/tienes-una-deuda-y-quieres-participar",
          },
        ],
      },
      {
        title: "El Riesgo Usuario",
        slug: "riesgo-usuario",
        icon: "shield",
        articles: [
          {
            title: "El Riesgo Usuario y sus categorías.",
            href: "/categorias/riesgo-usuario/el-riesgo-usuario-y-sus-categorias",
          },
          {
            title: "Canjea puntos VMC y mejora tu Riesgo Usuario",
            href: "/categorias/riesgo-usuario/canjea-puntos-vmc-y-mejora-tu-riesgo-usuario",
          },
        ],
      },
    ],
  },
];

export const allCategories = navigationPilars.flatMap((p) => p.categories);

export const totalArticles = allCategories.reduce((sum, c) => sum + c.articles.length, 0);
