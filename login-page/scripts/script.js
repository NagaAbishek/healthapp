document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationBox = document.getElementById('animationBox');
    const rabbitVideo = document.getElementById('rabbitVideo');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const loginTrigger = document.getElementById('loginTrigger');
    const body = document.body;
    
    // Celebration colors
    const CELEBRATION_COLORS = [
        '#FF6B6B', '#4ECDC4', '#96CEB4', '#FF9FF3', 
        '#54A0FF', '#FF9F43', '#00D2D3', '#FECA57',
        '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
        '#536DFE', '#448AFF', '#40C4FF', '#18FFFF'
    ];
    
    // Track interactions
    let interactionCount = 0;
    let lastInteractionTime = 0;
    let isAnimationShowing = false;
    
    // Add page pulse animation
    body.style.animation = 'pagePulse 8s ease-in-out infinite';
    
    // Handle clicks/taps on the white page
    loginTrigger.addEventListener('click', function(e) {
        if (isAnimationShowing) return;
        
        const currentTime = Date.now();
        const timeDiff = currentTime - lastInteractionTime;
        
        // Check for quick successive clicks (within 500ms)
        if (timeDiff < 500) {
            interactionCount++;
            
            // Show animation on 3rd quick click
            if (interactionCount >= 3) {
                showAnimation();
                interactionCount = 0;
            }
        } else {
            interactionCount = 1;
        }
        
        lastInteractionTime = currentTime;
        
        // Create ripple effect at click location
        createRipple(e.clientX, e.clientY);
    });
    
    // Handle touch for mobile
    loginTrigger.addEventListener('touchstart', function(e) {
        if (isAnimationShowing) return;
        
        const touch = e.touches[0];
        const currentTime = Date.now();
        const timeDiff = currentTime - lastInteractionTime;
        
        // Check for quick successive taps
        if (timeDiff < 500) {
            interactionCount++;
            
            // Show animation on 3rd quick tap
            if (interactionCount >= 3) {
                showAnimation();
                interactionCount = 0;
            }
        } else {
            interactionCount = 1;
        }
        
        lastInteractionTime = currentTime;
        
        // Create ripple effect at touch location
        createRipple(touch.clientX, touch.clientY);
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (isAnimationShowing) return;
        
        // Spacebar or Enter to show animation
        if (e.code === 'Space' || e.code === 'Enter') {
            showAnimation();
        }
        
        // Escape to hide animation if showing
        if (e.code === 'Escape' && isAnimationShowing) {
            hideAnimation();
        }
    });
    
    // Show the animation box
    function showAnimation() {
        if (isAnimationShowing) return;
        
        isAnimationShowing = true;
        
        // Show animation box
        animationBox.classList.add('show');
        rabbitVideo.play();
        
        // Create celebration effects
        createCelebration();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAnimation();
        }, 5000);
    }
    
    // Hide the animation box
    function hideAnimation() {
        isAnimationShowing = false;
        
        // Hide animation box
        animationBox.classList.remove('show');
        rabbitVideo.pause();
        rabbitVideo.currentTime = 0;
        
        // Clear celebration particles
        celebrationContainer.innerHTML = '';
        
        // Reset interaction count
        interactionCount = 0;
    }
    
    // Create celebration effects
    function createCelebration() {
        // Clear any existing particles
        celebrationContainer.innerHTML = '';
        
        // Get animation box position
        const boxRect = animationBox.getBoundingClientRect();
        
        // Create particles from the bottom of the box
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createParticle(boxRect);
            }, i * 20);
        }
        
        // Continue creating particles for 4 seconds
        let duration = 4;
        const interval = setInterval(() => {
            for (let i = 0; i < 15; i++) {
                createParticle(boxRect);
            }
            
            duration--;
            if (duration <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
    
    // Create a single particle
    function createParticle(boxRect) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const color = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
        const size = Math.random() * 15 + 5;
        const duration = Math.random() * 1.5 + 1;
        
        // Position particles relative to animation box
        const left = boxRect.left + (Math.random() * boxRect.width);
        const top = boxRect.bottom;
        
        particle.style.cssText = `
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            left: ${left}px;
            top: ${top}px;
            animation: particleFloat ${duration}s ease-out forwards;
            animation-delay: ${Math.random() * 0.3}s;
            box-shadow: 0 0 15px ${color};
            z-index: 6;
        `;
        
        celebrationContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode === celebrationContainer) {
                particle.remove();
            }
        }, duration * 1000);
    }
    
    // Create ripple effect at click location
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${x - 10}px;
            top: ${y - 10}px;
            pointer-events: none;
            z-index: 2;
            animation: ripple 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add click anywhere to hide animation when it's showing
    document.addEventListener('click', function(e) {
        if (isAnimationShowing && !animationBox.contains(e.target)) {
            hideAnimation();
        }
    });
    
    // Add touch to hide animation
    document.addEventListener('touchstart', function(e) {
        if (isAnimationShowing && !animationBox.contains(e.target)) {
            hideAnimation();
        }
    });
    
    // Add CSS animations if not already added
    if (!document.querySelector('#animations')) {
        const style = document.createElement('style');
        style.id = 'animations';
        document.head.appendChild(style);
    }
});