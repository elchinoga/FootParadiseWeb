const LANG_ES = {
  // Nav
  'nav.home': 'Inicio',
  'nav.store': 'Tienda',
  'nav.commission': 'Comisiones',
  'nav.comics': 'Comics',
  'nav.app': 'App',
  'nav.connect': 'Contacto',
  // Age modal
  'age.title': 'Verificación de Edad Requerida',
  'age.body': 'Este sitio contiene contenido para adultos. Debes tener <strong>18 años o más</strong> para ingresar.',
  'age.question': '¿Tienes 18 años o más?',
  'age.yes': 'Sí, tengo 18+',
  'age.no': 'No, salir',
  'age.disclaimer': 'Al ingresar, confirmas que eres mayor de edad para ver contenido adulto en tu jurisdicción.',
  // Footer
  'footer.tagline': 'Arte exclusivo con temática de pies',
  'footer.patreon-btn': 'Apoyar en Patreon',
  'footer.copyright': '© 2025 Footparadise. Todos los derechos reservados.',
  // HOME
  'home.hero.subtitle': 'EL DESTINO DEL CULTO AL PIE',
  'home.hero.body': 'Arte de pies de anime actualizado todos los días. Cómics sin censura con tus personajes favoritos, comisiones personalizadas hechas para vos, y un lector gratis con nuevas historias cada mes. Explorá la tienda, unite al Patreon para acceso anticipado, o pedí tu propia pieza — este es el lugar para los fans del culto al pie.',
  'home.hero.desc': 'Bienvenido a Footparadise — tu destino para arte exclusivo de alta calidad y comisiones personalizadas. Explora ilustraciones únicas o solicita tu propia pieza creada por un artista independiente.',
  'home.hero.cta': 'Solicitar una Comisión',
  // STORE
  'store.title': 'Tienda',
  'store.desc': 'Explora nuestros cómics exclusivos. Cada cómic es una historia de alta calidad sin censura. Para más contenido y acceso anticipado, ¡únete a nuestro Patreon!',
  'store.patreon-btn': 'Únete al Patreon para contenido exclusivo',
  'store.search': 'Buscar cómics...',
  'store.no-results': 'No se encontraron cómics. Intenta otra búsqueda.',
  'store.buy': 'Comprar',
  'store.free-label': 'Gratis',
  // COMMISSION
  'commission.title': 'Solicitar una Comisión',
  'commission.subtitle': 'Completa el formulario para solicitar un dibujo o cómic personalizado',
  'commission.pricing-title': 'Precios',
  'commission.price': '$50 USD / personaje',
  'commission.discount': '¡20% OFF para nivel Master de Patreon!',
  'commission.type-label': 'Tipo de comisión *',
  'commission.illustration': 'Ilustración',
  'commission.comic': 'Cómic',
  'commission.chars-label': 'Número de personajes *',
  'commission.desc-label': 'Descripción del pedido *',
  'commission.desc-placeholder': 'Describe lo que deseas: personajes, pose, escenario, preferencias de estilo...',
  'commission.patreon-label': 'Usuario de Patreon (nivel Master - 20% OFF)',
  'commission.patreon-placeholder': 'Tu usuario de Patreon (opcional)',
  'commission.no-discount': 'Los cómics no son elegibles para el descuento de Patreon',
  'commission.email-label': 'Tu email de contacto *',
  'commission.email-placeholder': 'tu@email.com',
  'commission.submit': 'Enviar Solicitud',
  'commission.sending': 'Enviando...',
  'commission.success-title': '¡Solicitud Enviada!',
  'commission.success-desc': 'Te contactaremos pronto a tu email.',
  'commission.back': 'Volver al Inicio',
  // APP
  'app.title': 'App Footparadise',
  'app.desc': 'Descarga nuestra app móvil oficial para disfrutar del contenido exclusivo donde quieras.',
  'app.download': 'Descargar App',
  // INFO
  'info.title': 'Sobre Nosotros y Contacto',
  'info.body1': 'Footparadise es un artista digital independiente dedicado a crear arte exclusivo de alta calidad con temática de pies. Con pasión por las ilustraciones estilo anime y un compromiso con la excelencia artística, cada pieza se elabora con cuidado y atención al detalle.',
  'info.body2': 'Ya sea que busques packs de arte exclusivos o una comisión personalizada adaptada a tu visión, Footparadise ofrece arte profesional y personalizado que da vida a tus ideas.',
  // COMICS PAGE
  'comics.title': 'COMICS GRATIS',
  'comics.desc': 'Lee nuestros cómics gratuitos directamente en tu navegador. Sin cuenta requerida.',
  'comics.search': 'Buscar cómics...',
  'comics.read-btn': 'Leer Ahora',
  'comics.no-results': 'No se encontraron cómics para',
  'comics.loading': 'Cargando página...',
  'reader.close': 'Cerrar',
  'reader.fullscreen': 'Pantalla Completa',
  'reader.exit-fs': 'Salir',
  'reader.prev': 'Anterior',
  'reader.next': 'Siguiente',
};

let currentSiteLang = localStorage.getItem('fp_lang') || 'en';

// Cache original English text on first load so we can restore it
function cacheOriginals() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.hasAttribute('data-en')) return; // already cached
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute('data-en', el.placeholder || '');
    } else {
      el.setAttribute('data-en', el.innerHTML || '');
    }
  });
}

function applyLang(lang) {
  cacheOriginals();
  currentSiteLang = lang;
  localStorage.setItem('fp_lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (lang === 'es') {
      const val = LANG_ES[key];
      if (!val) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    } else {
      // Restore cached English
      const original = el.getAttribute('data-en');
      if (original === null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = original;
      } else {
        el.innerHTML = original;
      }
    }
  });

  updateDropdownUI(lang);
}

function selectLang(lang) {
  applyLang(lang);
  closeLangDropdown();
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function toggleLangDropdown() {
  const menu = document.getElementById('lang-menu');
  if (!menu) return;
  menu.classList.toggle('open');
  const arrow = document.getElementById('lang-arrow');
  if (arrow) arrow.style.transform = menu.classList.contains('open') ? 'rotate(180deg)' : '';
}

function closeLangDropdown() {
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('open');
  const arrow = document.getElementById('lang-arrow');
  if (arrow) arrow.style.transform = '';
}

function updateDropdownUI(lang) {
  const label = document.getElementById('lang-current-label');
  if (label) label.textContent = lang === 'es' ? 'ES' : 'EN';
  const optEn = document.getElementById('lang-opt-en');
  const optEs = document.getElementById('lang-opt-es');
  if (optEn) optEn.classList.toggle('active', lang === 'en');
  if (optEs) optEs.classList.toggle('active', lang === 'es');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) closeLangDropdown();
});

document.addEventListener('DOMContentLoaded', function() {
  cacheOriginals();
  if (currentSiteLang === 'es') applyLang('es');
  else updateDropdownUI('en');
});
