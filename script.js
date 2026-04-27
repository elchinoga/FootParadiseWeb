/* ============================================
   MAIN SCRIPT - Footparadise (Static Multi-Page Version)
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

// Gallery images - detect base path for images
var basePath = window.location.pathname.includes('/store/') || 
               window.location.pathname.includes('/commission/') || 
               window.location.pathname.includes('/app/') || 
               window.location.pathname.includes('/info/') ? '../' : '';

var galleryImages = [
    {
        id: 1,
        src: basePath + "imagenes/personaje.jpg",
        alt: "Gogeta"
    },
    {
        id: 2,
        src: basePath + "imagenes/1.jpg",
        alt: "Hinata and Nishinoya"
    },
    {
        id: 3,
        src: basePath + "imagenes/2.jpg",
        alt: "Akaza and Douma"
    },
    {
        id: 4,
        src: basePath + "imagenes/3.jpg",
        alt: "Bakugo and Deku"
    },
    {
        id: 5,
        src: basePath + "imagenes/4.jpg",
        alt: "Luffy"
    },
    {
        id: 6,
        src: basePath + "imagenes/5.jpg",
        alt: "Kiawe and Ash"
    }
];

var carouselProgress = 0.0;
var carouselItems = [];
var carouselPaused = false;
var carouselLastTs = null;
var CAROUSEL_SPEED = 1 / 3800;

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
    
    // Only setup carousel if on home page
    if (document.getElementById('carousel-track')) {
        try {
            setupCarousel();
            console.log('Carousel setup complete');
        } catch (e) {
            console.error('Error in setupCarousel:', e);
        }
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
   CAROUSEL — continuous 3D flow
   ============================================ */
function setupCarousel() {
    var track = document.getElementById('carousel-track');
    var wrapper = document.querySelector('.carousel-wrapper-hero');

    if (!track) { console.warn('Carousel track not found'); return; }
    if (galleryImages.length === 0) return;

    // Build all items once
    galleryImages.forEach(function(image) {
        var item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.opacity = '0';
        item.innerHTML = '<img src="' + image.src + '" alt="' + image.alt + '" class="carousel-image">' +
            '<div class="carousel-item-overlay"><i class="fas fa-expand"></i></div>';
        item.addEventListener('click', function() { openLightbox(image); });
        track.appendChild(item);
        carouselItems.push(item);
    });

    // Pause on hover
    if (wrapper) {
        wrapper.addEventListener('mouseenter', function() { carouselPaused = true; });
        wrapper.addEventListener('mouseleave', function() { carouselPaused = false; });
    }

    requestAnimationFrame(carouselLoop);
}

// Compute per-item inline style from continuous float offset
function getCarouselItemStyle(offset) {
    var abs = Math.abs(offset);
    var HIDE = 1.75;
    if (abs >= HIDE) return null;

    var w = window.innerWidth;
    var spread = w <= 480 ? 0 : w <= 768 ? 120 : w <= 1024 ? 175 : 230;

    var scale  = 1.0 - abs * 0.165;
    var xPx    = offset * spread;
    var rotY   = -offset * 45;
    var opacity = abs <= 1.0
        ? (1.0 - abs * 0.48)
        : ((HIDE - abs) / (HIDE - 1.0)) * 0.52;
    var zIndex = Math.max(1, 3 - Math.floor(abs * 2));

    return {
        transform: 'translate(calc(-50% + ' + xPx.toFixed(1) + 'px), -50%) rotateY(' + rotY.toFixed(1) + 'deg) scale(' + scale.toFixed(4) + ')',
        opacity:   Math.max(0, opacity).toFixed(4),
        zIndex:    zIndex,
        boxShadow: abs < 0.4 ? '0 0 50px rgba(255,140,26,0.4),0 15px 45px rgba(0,0,0,0.65)' : '0 10px 30px rgba(0,0,0,0.5)'
    };
}

function carouselLoop(ts) {
    if (carouselLastTs !== null && !carouselPaused) {
        carouselProgress += CAROUSEL_SPEED * (ts - carouselLastTs);
    }
    carouselLastTs = ts;

    var n = galleryImages.length;
    carouselItems.forEach(function(item, idx) {
        var offset = ((idx - carouselProgress) % n + n) % n;
        if (offset > n / 2) offset -= n;

        var s = getCarouselItemStyle(offset);
        if (s) {
            item.style.transform  = s.transform;
            item.style.opacity    = s.opacity;
            item.style.zIndex     = s.zIndex;
            item.style.boxShadow  = s.boxShadow;
            item.style.visibility = '';
        } else {
            item.style.visibility = 'hidden';
            item.style.opacity    = '0';
        }
    });

    requestAnimationFrame(carouselLoop);
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
            closePurchaseModal();
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

// Commission type selector
function selectCommissionType(type) {
    var btnIllustration = document.getElementById('btn-illustration');
    var btnComic = document.getElementById('btn-comic');
    var numCharsGroup = document.getElementById('num-characters-group');
    var numCharsInput = document.getElementById('num-characters');
    var typeInput = document.getElementById('commission-type-input');
    var patreonField = document.getElementById('patreon-field');
    var comicNotice = document.getElementById('comic-notice');
    var pricingDiscount = document.getElementById('pricing-discount');
    
    if (!btnIllustration || !btnComic) return;
    
    if (type === 'comic') {
        btnComic.classList.add('active');
        btnIllustration.classList.remove('active');
        if (numCharsGroup) numCharsGroup.style.display = 'none';
        if (numCharsInput) {
            numCharsInput.removeAttribute('required');
            numCharsInput.value = '';
        }
        if (typeInput) typeInput.value = 'comic';
        if (patreonField) patreonField.style.display = 'none';
        if (comicNotice) comicNotice.style.display = 'block';
        if (pricingDiscount) pricingDiscount.style.display = 'none';
    } else {
        btnIllustration.classList.add('active');
        btnComic.classList.remove('active');
        if (numCharsGroup) numCharsGroup.style.display = 'block';
        if (numCharsInput) numCharsInput.setAttribute('required', 'required');
        if (typeInput) typeInput.value = 'illustration';
        if (patreonField) patreonField.style.display = 'block';
        if (comicNotice) comicNotice.style.display = 'none';
        if (pricingDiscount) pricingDiscount.style.display = 'flex';
    }
}

function submitForm(event) {
    event.preventDefault();
    
    var form = document.getElementById('commission-form');
    var submitBtn = document.getElementById('submit-btn');
    
    if (!form || !submitBtn) return false;
    
    var formData = new FormData(form);
    
    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    fetch('https://formspree.io/f/xgooezyp', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function(response) {
        if (response.ok) {
            showSuccessMessage();
        } else {
            alert('There was an error sending your request. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('There was an error sending your request. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
    });
    
    return false;
}

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

/* ============================================
   PURCHASE MODAL (Custom iframe for Payhip)
   ============================================ */
function openPurchaseModal(url) {
    var modal = document.getElementById('purchase-modal');
    var iframe = document.getElementById('purchase-iframe');
    
    if (modal && iframe) {
        // Add ?embed=1 to Payhip URL for cleaner embed view
        var embedUrl = url;
        if (url.indexOf('payhip.com') !== -1) {
            embedUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + 'embed=1';
        }
        
        iframe.src = embedUrl;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Purchase modal opened:', embedUrl);
    }
}

function closePurchaseModal() {
    var modal = document.getElementById('purchase-modal');
    var iframe = document.getElementById('purchase-iframe');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear iframe src to stop any loading
        if (iframe) {
            iframe.src = '';
        }
        console.log('Purchase modal closed');
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePurchaseModal();
    }
});
// Bloquear click derecho en imágenes
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Bloquear arrastrar imágenes
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
