/* ============================================
   MAIN SCRIPT - Footparadise (Static Version)
   ============================================ */

// Configuration
const CONFIG = {
    PATREON_URL: "https://www.patreon.com/c/foot_paradise",
    TWITTER_URL: "https://x.com/FootParadiseArt",
    MEDIAFIRE_URL: "https://www.mediafire.com/folder/hf64gqdx25wld/APK+updates",
    EMAIL: "drawingspirit.videos@gmail.com",
    FORMSPREE_URL: "https://formspree.io/f/xgooezyp"
};

// Gallery images (including Gogeta)
const galleryImages = [
    {
        id: 1,
        src: "imagenes/personaje.jpg",
        alt: "Gogeta"
    },
    {
        id: 2,
        src: "https://customer-assets.emergentagent.com/job_sole-sanctuary/artifacts/1u1yr2gq_Hinata%20and%20Nishinoya_Bronze%20a.jpg",
        alt: "Hinata and Nishinoya"
    },
    {
        id: 3,
        src: "https://customer-assets.emergentagent.com/job_sole-sanctuary/artifacts/5sh1jlrl_Bakugo%20x%20Deku_bronze%20a.jpg",
        alt: "Bakugo x Deku"
    },
    {
        id: 4,
        src: "https://customer-assets.emergentagent.com/job_sole-sanctuary/artifacts/3ckpiwdi_1_Akaza%20and%20Douma%20Bronce%20a.jpg",
        alt: "Akaza and Douma"
    },
    {
        id: 5,
        src: "https://customer-assets.emergentagent.com/job_sole-sanctuary/artifacts/bb0prwl1_luffy%20bronze_a.jpg",
        alt: "Luffy"
    },
    {
        id: 6,
        src: "https://customer-assets.emergentagent.com/job_sole-sanctuary/artifacts/gy7u0wcp_Kiawe%20and%20ash_bronze%20a.jpg",
        alt: "Kiawe and Ash"
    }
];

let carouselIndex = 0;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    checkAgeVerification();
    setupNavigation();
    setupCarousel();
    setupLightbox();
    console.log('✅ Footparadise loaded successfully');
});

/* ============================================
   AGE VERIFICATION
   ============================================ */
function checkAgeVerification() {
    const modal = document.getElementById('age-modal');
    const yesBtn = document.getElementById('age-yes-btn');
    const noBtn = document.getElementById('age-no-btn');
    
    const isVerified = localStorage.getItem('footparadise_age_verified');
    
    if (isVerified === 'true') {
        modal.classList.add('hidden');
        return;
    }
    
    modal.classList.remove('hidden');
    
    yesBtn.addEventListener('click', function() {
        localStorage.setItem('footparadise_age_verified', 'true');
        modal.classList.add('hidden');
    });
    
    noBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
}

/* ============================================
   NAVIGATION
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

function navigateTo(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('page-home').classList.add('active');
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const dot = link.querySelector('.nav-dot');
        if (dot) dot.remove();
    });
    
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        const dot = document.createElement('span');
        dot.className = 'nav-dot';
        activeLink.appendChild(dot);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================
   CAROUSEL
   ============================================ */
function setupCarousel() {
    const track = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track || galleryImages.length === 0) return;
    
    galleryImages.forEach((_, idx) => {
        const indicator = document.createElement('button');
        indicator.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Go to image ${idx + 1}`);
        indicator.addEventListener('click', () => {
            carouselIndex = idx;
            updateCarousel();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    prevBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + galleryImages.length) % galleryImages.length;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % galleryImages.length;
        updateCarousel();
    });
    
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    track.innerHTML = '';
    
    const positions = [-1, 0, 1];
    positions.forEach(pos => {
        const idx = (carouselIndex + pos + galleryImages.length) % galleryImages.length;
        const image = galleryImages[idx];
        
        const item = document.createElement('div');
        item.className = `carousel-item ${pos === 0 ? 'carousel-item-center' : ''} ${pos === -1 ? 'carousel-item-left' : ''} ${pos === 1 ? 'carousel-item-right' : ''}`;
        item.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" class="carousel-image">
            <div class="carousel-item-overlay">
                <i class="fas fa-expand"></i>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(image));
        track.appendChild(item);
    });
    
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === carouselIndex);
    });
}

/* ============================================
   LIGHTBOX
   ============================================ */
function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    
    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(image) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    
    img.src = image.src;
    img.alt = image.alt;
    caption.textContent = image.alt;
    modal.style.display = 'flex';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.style.display = 'none';
}

/* ============================================
   FORM
   ============================================ */
function showSuccessMessage() {
    const form = document.getElementById('commission-form');
    const successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
}

function resetForm() {
    const form = document.getElementById('commission-form');
    const successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

function clearAgeVerification() {
    localStorage.removeItem('footparadise_age_verified');
    location.reload();
}
