/* ============================================
   SCRIPT PRINCIPAL
   ============================================ */

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();
    
    // Configurar navegación
    setupNavigation();
    
    console.log('✅ Página cargada correctamente');
});

/* ============================================
   NAVEGACIÓN
   ============================================ */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
}

// Función para navegar entre páginas
function navigateTo(pageName) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar la página seleccionada
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        // Si no existe la página, mostrar home
        document.getElementById('page-home').classList.add('active');
    }
    
    // Actualizar estado activo en navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Remover el dot si existe
        const dot = link.querySelector('.nav-dot');
        if (dot) dot.remove();
    });
    
    // Activar el link correspondiente
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        // Agregar dot al link activo
        const dot = document.createElement('span');
        dot.className = 'nav-dot';
        activeLink.appendChild(dot);
    }
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-inicializar iconos de Lucide para la nueva página
    lucide.createIcons();
}

/* ============================================
   FUNCIONES DE BOTONES - PERSONALIZA AQUÍ
   ============================================ */

// Función cuando se hace clic en "Hire an Agent"
function handleHireAgent() {
    // Puedes cambiar esta función para hacer lo que necesites
    alert('¡Gracias por tu interés! Esta función estará disponible pronto.');
    
    // Ejemplos de lo que podrías hacer:
    // - Abrir un modal
    // - Navegar a otra página: navigateTo('shop');
    // - Abrir un enlace externo: window.open('https://tu-link.com', '_blank');
}

/* ============================================
   UTILIDADES
   ============================================ */

// Función para cambiar la imagen del personaje dinámicamente
function setCharacterImage(imageUrl) {
    const img = document.getElementById('character-image');
    if (img) {
        img.src = imageUrl;
    }
}

// Función para actualizar el nombre del personaje
function setCharacterName(name) {
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) {
        const names = name.split(' ');
        titleElement.innerHTML = names.map(n => `<span>${n}</span>`).join('');
    }
}

// Función para actualizar la descripción
function setCharacterDescription(description) {
    const descElement = document.querySelector('.hero-description');
    if (descElement) {
        descElement.textContent = description;
    }
}
