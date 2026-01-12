/* ============================================
   MAIN SCRIPT - Footparadise (Static Version)
   ============================================ */

/* ============================================
   AGE VERIFICATION - MUST BE FIRST!
   These functions are called from inline onclick
   in HTML, so they must be available immediately.
   ============================================ */

// Global function for "Yes, I am 18+" button
function handleAgeYes() {
    console.log('handleAgeYes called!');
    var modal = document.getElementById('age-modal');
    if (modal) {
        try {
            localStorage.setItem('footparadise_age_verified', 'true');
            console.log('Saved to localStorage');
        } catch (e) {
            console.warn('localStorage not available, continuing anyway');
        }
        modal.style.display = 'none';
        modal.classList.add('hidden');
        console.log('Modal hidden successfully');
    } else {
        console.error('Modal not found!');
    }
}

// Global function for "No, I'm under 18" button
function handleAgeNo() {
    console.log('handleAgeNo called!');
    window.location.href = 'https://www.google.com';
}

/* ============================================
   CONFIGURATION
   ============================================ */
var CONFIG = {
    PATREON_URL: "https://www.patreon.com/c/foot_paradise",
    TWITTER_URL: "https://x.com/FootParadiseArt",
    MEDIAFIRE_URL: "https://www.mediafire.com/folder/hf64gqdx25wld/APK+updates",
    EMAIL: "drawingspirit.videos@gmail.com",
    FORMSPREE_URL: "https://formspree.io/f/xgooezyp"
};

// Gallery images (including Gogeta)
var galleryImages = [
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

var carouselIndex = 0;

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    try {
        checkAgeVerification();
        console.log('Age verification setup complete');
    } catch (e) {
        console.error('Error in checkAgeVerification:', e);
    }
    
    try {
        setupNavigation();
        console.log('Navigation setup complete');
    } catch (e) {
        console.error('Error in setupNavigation:', e);
    }
    
    try {
        setupCarousel();
        console.log('Carousel setup complete');
    } catch (e) {
        console.error('Error in setupCarousel:', e);
    }
    
    try {
        setupLightbox();
        console.log('Lightbox setup complete');
    } catch (e) {
        console.error('Error in setupLightbox:', e);
    }
    
    console.log('✅ Footparadise loaded successfully');
});

/* ============================================
   AGE VERIFICATION CHECK
   ============================================ */
function checkAgeVerification() {
    var modal = document.getElementById('age-modal');
    var yesBtn = document.getElementById('age-yes-btn');
    var noBtn = document.getElementById('age-no-btn');
    
    console.log('Age modal elements:', { modal: !!modal, yesBtn: !!yesBtn, noBtn: !!noBtn });
    
    if (!modal) {
        console.error('Age modal not found');
        return;
    }
    
    var isVerified = false;
    try {
        isVerified = localStorage.getItem('footparadise_age_verified') === 'true';
    } catch (e) {
        console.warn('localStorage not available');
    }
    
    console.log('Is verified:', isVerified);
    
    if (isVerified) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        console.log('User already verified, hiding modal');
        return;
    }
    
    // Show modal
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    console.log('Modal displayed');
    
    // Attach click handlers as backup (in case inline onclick doesn't work)
    if (yesBtn) {
        yesBtn.onclick = handleAgeYes;
        console.log('Yes button onclick attached');
    }
    if (noBtn) {
        noBtn.onclick = handleAgeNo;
        console.log('No button onclick attached');
    }
}

/* ============================================
   NAVIGATION
   ============================================ */
function setupNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.onclick = function(e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');
            navigateTo(page);
        };
    });
}

function navigateTo(pageName) {
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    
    var targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('page-home').classList.add('active');
    }
    
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        var dot = link.querySelector('.nav-dot');
        if (dot) dot.remove();
    });
    
    var activeLink = document.querySelector('.nav-link[data-page="' + pageName + '"]');
    if (activeLink) {
        activeLink.classList.add('active');
        var dot = document.createElement('span');
        dot.className = 'nav-dot';
        activeLink.appendChild(dot);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================
   CAROUSEL
   ============================================ */
function setupCarousel() {
    var track = document.getElementById('carousel-track');
    var indicatorsContainer = document.getElementById('carousel-indicators');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    
    if (!track || !indicatorsContainer || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found');
        return;
    }
    
    if (galleryImages.length === 0) return;
    
    galleryImages.forEach(function(_, idx) {
        var indicator = document.createElement('button');
        indicator.className = 'carousel-indicator' + (idx === 0 ? ' active' : '');
        indicator.setAttribute('aria-label', 'Go to image ' + (idx + 1));
        indicator.onclick = function() {
            carouselIndex = idx;
            updateCarousel();
        };
        indicatorsContainer.appendChild(indicator);
    });
    
    prevBtn.onclick = function() {
        carouselIndex = (carouselIndex - 1 + galleryImages.length) % galleryImages.length;
        updateCarousel();
    };
    
    nextBtn.onclick = function() {
        carouselIndex = (carouselIndex + 1) % galleryImages.length;
        updateCarousel();
    };
    
    updateCarousel();
}

function updateCarousel() {
    var track = document.getElementById('carousel-track');
    var indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!track) return;
    
    track.innerHTML = '';
    
    var positions = [-1, 0, 1];
    positions.forEach(function(pos) {
        var idx = (carouselIndex + pos + galleryImages.length) % galleryImages.length;
        var image = galleryImages[idx];
        
        var item = document.createElement('div');
        var classes = 'carousel-item';
        if (pos === 0) classes += ' carousel-item-center';
        if (pos === -1) classes += ' carousel-item-left';
        if (pos === 1) classes += ' carousel-item-right';
        item.className = classes;
        
        item.innerHTML = '<img src="' + image.src + '" alt="' + image.alt + '" class="carousel-image">' +
            '<div class="carousel-item-overlay"><i class="fas fa-expand"></i></div>';
        
        item.onclick = function() {
            openLightbox(image);
        };
        track.appendChild(item);
    });
    
    indicators.forEach(function(indicator, idx) {
        if (idx === carouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/* ============================================
   LIGHTBOX
   ============================================ */
function setupLightbox() {
    var modal = document.getElementById('lightbox-modal');
    var closeBtn = document.getElementById('lightbox-close');
    
    if (!modal || !closeBtn) {
        console.warn('Lightbox elements not found');
        return;
    }
    
    closeBtn.onclick = closeLightbox;
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    };
    
    // Close on Escape key
    document.onkeydown = function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    };
}

function openLightbox(image) {
    var modal = document.getElementById('lightbox-modal');
    var img = document.getElementById('lightbox-image');
    var caption = document.getElementById('lightbox-caption');
    
    if (!modal || !img || !caption) return;
    
    img.src = image.src;
    img.alt = image.alt;
    caption.textContent = image.alt;
    modal.style.display = 'flex';
}

function closeLightbox() {
    var modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/* ============================================
   FORM
   ============================================ */
function showSuccessMessage() {
    var form = document.getElementById('commission-form');
    var successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
}

function resetForm() {
    var form = document.getElementById('commission-form');
    var successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

function clearAgeVerification() {
    try {
        localStorage.removeItem('footparadise_age_verified');
    } catch(e) {
        console.warn('Could not clear localStorage');
    }
    location.reload();
}
