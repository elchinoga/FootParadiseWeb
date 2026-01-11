# Character Archives - GitHub Pages Website

Una página web estilo archivo de personajes, inspirada en Zenless Zone Zero.

## Vista Previa

La web incluye:
- **Navegación** con botones editables (Home, List, Agents, Shop, Info)
- **Sección Hero** con imagen de personaje, nombre y descripción
- **Sección Skills** con habilidades del personaje
- **Footer** con links editables

## Cómo Personalizar

### 1. Editar el Contenido

Todo el contenido editable está en el archivo `src/config/siteConfig.js`:

```javascript
export const siteConfig = {
  // Cambiar nombre del sitio
  siteName: "NEW ERIDU ARCHIVES",
  
  // Editar menú de navegación
  navigation: [
    { id: "home", label: "Home", href: "/", active: false },
    { id: "list", label: "List", href: "/list", active: false },
    // ... agregar o quitar items
  ],

  // Editar personaje
  character: {
    name: "NEKOMIYA MANA",
    image: "TU_IMAGEN.png", // Reemplazar con tu imagen
    description: "Tu descripción aquí...",
    ctaButtonText: "Hire an Agent",
  },

  // Editar habilidades
  skills: {
    items: [
      {
        title: "Nombre Habilidad",
        description: "Descripción...",
        icon: "target", // opciones: target, crosshair, zap, sword, shield, star
      },
      // ... agregar más
    ],
  },
};
```

### 2. Cambiar la Imagen del Personaje

1. Coloca tu imagen PNG en la carpeta `public/`
2. En `siteConfig.js`, cambia:
   ```javascript
   character: {
     image: "/tu-imagen.png", // o URL externa
   }
   ```

### 3. Cambiar Colores

Edita `src/index.css` para cambiar la paleta de colores:

```css
:root {
  /* Color principal (rosa/magenta) */
  --primary: 348 100% 55%;
  
  /* Color secundario (naranja) */
  --secondary: 32 100% 55%;
  
  /* Color de acento (amarillo-verde) */
  --accent: 70 100% 50%;
}
```

## Desplegar en GitHub Pages

### Opción 1: Manual

1. Ejecuta `npm run build` o `yarn build`
2. Sube el contenido de la carpeta `build/` a tu repositorio
3. En GitHub, ve a Settings > Pages
4. Selecciona la rama y carpeta donde subiste los archivos

### Opción 2: GitHub Actions (Automático)

1. Crea el archivo `.github/workflows/deploy.yml` (incluido en este proyecto)
2. Sube todo el código a tu repositorio
3. GitHub Pages se desplegará automáticamente

## Estructura de Carpetas

```
frontend/
├── public/
│   ├── index.html
│   └── 404.html          # Para manejar rutas en GitHub Pages
├── src/
│   ├── components/
│   │   ├── Navigation.jsx    # Barra de navegación
│   │   ├── HeroSection.jsx   # Sección del personaje
│   │   ├── SkillsSection.jsx # Sección de habilidades
│   │   └── Footer.jsx        # Pie de página
│   ├── config/
│   │   └── siteConfig.js     # ⭐ ARCHIVO PRINCIPAL DE CONFIGURACIÓN
│   ├── pages/
│   │   ├── HomePage.jsx      # Página principal
│   │   └── PlaceholderPage.jsx # Páginas en construcción
│   ├── index.css           # Estilos y colores
│   └── App.js              # Rutas de la aplicación
└── package.json
```

## Agregar Nuevas Páginas

1. Crea un nuevo archivo en `src/pages/`
2. Añade la ruta en `src/App.js`
3. Actualiza `siteConfig.js` si quieres añadir un link en la navegación

## Tecnologías Utilizadas

- React
- Tailwind CSS
- Lucide React (iconos)
- React Router (navegación)

## Licencia

MIT - Libre para uso personal y comercial.
