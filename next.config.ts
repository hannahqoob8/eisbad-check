import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export: erzeugt einen reinen Static-Build in /out.
  // Ideal fuer lokales Reviewen und fuer Cloudflare Pages.
  // Die App ist vollstaendig client-seitig (Hash-Routing pro Schritt),
  // daher braucht der Export keinen Node-Server.
  output: "export",
  // Erzeugt out/impressum/index.html statt out/impressum.html -> laeuft auf
  // jedem Static-Host (und lokal mit python -m http.server) ohne Rewrite-Regeln.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
