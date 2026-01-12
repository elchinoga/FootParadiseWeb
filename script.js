 ============================================
   AGE VERIFICATION
   ============================================ */
function checkAgeVerification() {
    const modal = document.getElementById('age-modal');
    const yesBtn = document.getElementById('age-yes-btn');
    const noBtn = document.getElementById('age-no-btn');
    
    console.log('Age modal elements:', { modal: !!modal, yesBtn: !!yesBtn, noBtn: !!noBtn });
    
    if (!modal || !yesBtn || !noBtn) {
        console.error('Age modal elements not found');
        return;
    }
    
    let isVerified = false;
    try {
        isVerified = localStorage.getItem('footparadise_age_verified') === 'true';
    } catch (e) {
        console.warn('localStorage not available');
    }
    
    console.log('Is verified:', isVerified);
    
    if (isVerified) {
        modal.classList.add('hidden');
        return;
    }
    
    modal.classList.remove('hidden');
    
    // Use onclick instead of addEventListener for better compatibility
    yesBtn.onclick = function() {
        console.log('Yes button clicked!');
        try {
            localStorage.setItem('footparadise_age_verified', 'true');
        } catch (e) {
            console.warn('Could not save to localStorage');
        }
        modal.classList.add('hidden');
        console.log('Modal should be hidden now');
    };
    
    noBtn.onclick = function() {
        console.log('No button clicked!');
        window.location.href = 'https://www.google.com';
    };
}" --new-str "/* ============================================
   AGE VERIFICATION
   ============================================ */

// Global functions for inline onclick handlers (most reliable for file:// protocol)
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

function handleAgeNo() {
    console.log('handleAgeNo called!');
    window.location.href = 'https://www.google.com';
}

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
    
    // Attach click handlers directly to buttons as backup
    if (yesBtn) {
        yesBtn.onclick = handleAgeYes;
        console.log('Yes button onclick attached');
    }
    if (noBtn) {
        noBtn.onclick = handleAgeNo;
        console.log('No button onclick attached');
    }
