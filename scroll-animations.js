function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Modified to show elements as soon as they're 20% visible
    return (
        rect.top <= windowHeight * 0.8 &&
        rect.bottom >= 0 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .example-item, .importance ul, h1, .practice-area');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Initial check on load
window.addEventListener('load', handleScrollAnimations);

// Check on scroll
window.addEventListener('scroll', handleScrollAnimations);