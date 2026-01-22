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
        
        item.innerHTML = '<img src="' + image.src + '" alt="' + image.alt + '" class="carousel-image" loading="lazy">' +
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
    } else {
        btnIllustration.classList.add('active');
        btnComic.classList.remove('active');
        if (numCharsGroup) numCharsGroup.style.display = 'block';
        if (numCharsInput) numCharsInput.setAttribute('required', 'required');
        if (typeInput) typeInput.value = 'illustration';
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
