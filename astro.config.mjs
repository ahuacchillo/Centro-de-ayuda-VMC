// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Cambia esto por el dominio real al desplegar — alimenta canonical, OG y sitemap
  site: "https://ayuda.vmcsubastas.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
