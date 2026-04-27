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
  'footer.copyright': '© 2024 Footparadise. Todos los derechos reservados.',
  // HOME
  'home.hero.desc': 'Bienvenido a Footparadise — tu destino para arte exclusivo de alta calidad y comisiones personalizadas. Explora ilustraciones únicas o solicita tu propia pieza creada por un artista independiente.',
  'home.hero.cta': 'Solicitar una Comisión',
  // STORE
  'store.title': 'Tienda',
  'store.desc': 'Explora nuestros cómics exclusivos. Cada cómic es una historia de alta calidad sin censura. Para más contenido y acceso anticipado, ¡únete a nuestro Patreon!',
  'store.patreon-btn': 'Únete al Patreon para contenido exclusivo',
  'store.search': 'Buscar cómics...',
  'store.no-results': 'No se encontraron cómics. Intenta otra búsqueda.',
  'store.buy': 'Comprar',
  'store.free': 'Gratis',
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
  'comics.series-label': 'Serie',
  'comics.pages-label': 'páginas',
  'comics.no-results': 'No se encontraron cómics para',
  'comics.loading': 'Cargando página...',
  'reader.close': 'Cerrar',
  'reader.fullscreen': 'Pantalla Completa',
  'reader.exit-fs': 'Salir',
  'reader.prev': 'Anterior',
  'reader.next': 'Siguiente',
};

const LANG_EN = {}; // English is the default (original HTML text)

let currentSiteLang = localStorage.getItem('fp_lang') || 'en';

function applyLang(lang) {
  currentSiteLang = lang;
  localStorage.setItem('fp_lang', lang);
  const dict = lang === 'es' ? LANG_ES : LANG_EN;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = dict[key];
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.dataset.i18nHtml) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Update lang button label
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'es' ? '🌐 EN' : '🌐 ES';
}

function toggleLang() {
  applyLang(currentSiteLang === 'en' ? 'es' : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
  if (currentSiteLang === 'es') applyLang('es');
  // Set correct label on load
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = currentSiteLang === 'es' ? '🌐 EN' : '🌐 ES';
});
