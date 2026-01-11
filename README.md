# FootParadiseWeb - Página para GitHub Pages

Página web estilo archivo de personajes, lista para publicar en GitHub Pages.

## 📁 Estructura de Archivos

```
FootParadiseWeb/
├── index.html      ← Página principal (edita el contenido aquí)
├── styles.css      ← Estilos y colores
├── script.js       ← Funcionalidad JavaScript
├── assets/         ← Carpeta para archivos adicionales
└── imagenes/       ← Carpeta para tus imágenes PNG
```

## 🚀 Cómo Publicar en GitHub Pages

### Paso 1: Crear Repositorio
1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. Nombra el repositorio (ej: `FootParadiseWeb`)
3. Hazlo público

### Paso 2: Subir Archivos
1. Sube todos los archivos de esta carpeta al repositorio
2. Asegúrate de que `index.html` esté en la raíz

### Paso 3: Activar GitHub Pages
1. Ve a **Settings** > **Pages**
2. En "Source" selecciona **Deploy from a branch**
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Haz clic en **Save**

### Paso 4: ¡Listo!
Tu página estará disponible en:
`https://TU-USUARIO.github.io/FootParadiseWeb/`

---

## ✏️ Cómo Personalizar

### Cambiar la Imagen del Personaje
1. Coloca tu imagen PNG en la carpeta `imagenes/`
2. Abre `index.html`
3. Busca esta línea y cambia el nombre del archivo:
```html
<img src="imagenes/personaje.png" alt="Character">
```

### Cambiar Nombre del Personaje
En `index.html`, busca:
```html
<h1 class="hero-title">
    <span>NEKOMIYA</span>
    <span>MANA</span>
</h1>
```
Cambia el texto entre `<span>` y `</span>`.

### Cambiar Descripción
Busca el párrafo con clase `hero-description` y edita el texto.

### Cambiar Habilidades (Skills)
Busca las secciones con clase `skill-card` y edita:
- `skill-name`: Nombre de la habilidad
- `skill-desc`: Descripción
- Icono: cambia `data-lucide="target"` por otro icono

**Iconos disponibles:** target, crosshair, zap, sword, shield, star, flame, heart, etc.
[Ver todos los iconos](https://lucide.dev/icons/)

### Cambiar Colores
Abre `styles.css` y edita las variables al inicio:
```css
:root {
    --color-primary: #ff1a6c;    /* Rosa */
    --color-secondary: #ff8c1a;  /* Naranja */
    --color-accent: #c8ff00;     /* Amarillo-verde */
}
```

### Cambiar Menú de Navegación
En `index.html`, busca la sección `nav-menu` y edita los links:
```html
<a href="#" class="nav-link" data-page="home">Home</a>
```

---

## 📝 Agregar Nuevas Páginas

1. En `index.html`, agrega una nueva sección de página:
```html
<div id="page-nueva" class="page">
    <!-- Tu contenido aquí -->
</div>
```

2. Agrega el link en la navegación:
```html
<a href="#" class="nav-link" data-page="nueva">Nueva Página</a>
```

---

## 🎨 Paleta de Colores

Basada en tu imagen "papel tapiz":
- **Rosa/Magenta:** #ff1a6c
- **Naranja:** #ff8c1a  
- **Amarillo-verde:** #c8ff00

---

## 💡 Tips

- Las imágenes PNG con fondo transparente se ven mejor
- Usa imágenes optimizadas para que carguen rápido
- Prueba tu página localmente antes de subirla (abre index.html en el navegador)
