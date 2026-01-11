/**
 * Site Configuration
 * ==================
 * Este archivo contiene toda la configuración editable del sitio.
 * Modifica estos valores para personalizar el contenido de tu web.
 */

export const siteConfig = {
  // Información del sitio
  siteName: "NEW ERIDU ARCHIVES",
  siteTagline: "Character Database",
  
  // Navegación - Edita los items del menú aquí
  // Para que funcionen los links, crea las páginas correspondientes
  navigation: [
    { id: "home", label: "Home", href: "/", active: false },
    { id: "list", label: "List", href: "/list", active: false },
    { id: "agents", label: "Agents", href: "/agents", active: true, hasIcon: true },
    { id: "shop", label: "Shop", href: "/shop", active: false },
    { id: "info", label: "Info", href: "/info", active: false },
  ],

  // Información del personaje principal (Hero)
  character: {
    archiveLabel: "NEW ERIDU ARCHIVES",
    code: "004",
    name: "NEKOMIYA MANA",
    // Imagen del personaje - reemplaza esta URL con tu propia imagen PNG
    image: "https://www.pngmart.com/files/5/Boruto-PNG-Photo.png",
    // Descripción del personaje
    description: "Spirited and mischievous, she likes to play tricks on others. Your wallet is her wallet. (Really... It's hers now.) Athletic and daring, no Hollow is too dangerous for her.",
    // Texto del botón principal
    ctaButtonText: "Hire an Agent",
  },

  // Sección de habilidades (Skills)
  skills: {
    sectionTitle: "Skills",
    items: [
      {
        id: 1,
        icon: "target", // Opciones: target, crosshair, zap, sword, shield, star
        title: "Kitty Slash",
        description: "Slashes enemies in front and passes through them, dealing Physical damage.",
      },
      {
        id: 2,
        icon: "crosshair",
        title: "Super Surprise Attack!",
        description: "Downward strike enemies in front, dealing Physical damage. Anti-Interrupt level is increased while using this skill.",
      },
      {
        id: 3,
        icon: "zap",
        title: "Claw Smash",
        description: "Unleashes a powerful slash at enemies in a large area, dealing massive Physical damage.",
      },
    ],
  },

  // Logo/Branding
  branding: {
    logoText: "E.C.F",
    showLogo: true,
  },

  // Footer
  footer: {
    showFooter: true,
    copyright: "© 2024 New Eridu Archives. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export default siteConfig;
