// Optimized scroll handler with throttling
let ticking = false;
let scrolled = 0;

// Cache DOM elements
const parallaxHeader = document.getElementById('parallaxHeader');
const scrollProgress = document.getElementById('scrollProgress');
const heroContent = document.querySelector('.hero-content');
const winHeight = window.innerHeight;

function updateScrollEffects() {
    // Gentle parallax effect - only when header is visible
    if (parallaxHeader && scrolled < winHeight) {
        const speed = scrolled * 0.3;
        parallaxHeader.style.transform = `translate3d(0, ${speed}px, 0)`;
    }

    // Hero content fade and movement
    if (heroContent && scrolled < winHeight) {
        const opacity = Math.max(0, 1 - scrolled / (winHeight * 0.8));
        const translateY = scrolled * 0.15;
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }

    // Scroll progress indicator
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (scrolled / docHeight) * 100;
    scrollProgress.style.width = `${scrolledPercentage}%`;

    ticking = false;
}

function handleScroll() {
    scrolled = window.pageYOffset;

    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Smooth scroll to main content
function scrollToMain() {
    document.getElementById('main').scrollIntoView({
        behavior: 'smooth'
    });
}

// Optimized Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effects to achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        }, { passive: true });
    });
});