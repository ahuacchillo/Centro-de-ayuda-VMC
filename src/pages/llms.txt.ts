import { navigationPilars, totalArticles } from "../data/helpCenter";

/* llms.txt para motores generativos (GEO) — se genera desde helpCenter.ts */
export function GET() {
  const lines: string[] = [
    "# Centro de Ayuda Comprador · VMC Subastas",
    "",
    "Guías oficiales para compradores de VMC Subastas (subastas de vehículos,",
    `maquinaria y bienes diversos). ${totalArticles} artículos organizados por el ciclo de vida del comprador.`,
    "",
    "## Lo más consultado",
    "",
    "- [¡VIDEOTUTORIALES!](/videotutoriales): guías en video paso a paso.",
  ];

  for (const pilar of navigationPilars) {
    lines.push("", `## ${pilar.pilarTitle}`, "");
    for (const cat of pilar.categories) {
      lines.push(`- [${cat.title}](/categorias/${cat.slug})`);
      for (const article of cat.articles) {
        lines.push(article.href ? `  - [${article.title}](${article.href})` : `  - ${article.title}`);
      }
    }
  }

  lines.push("", "## Recursos", "", "- [Contacto](/contacto): soporte directo.", "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
