// ===== NAVBAR INTELIGENTE =====
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 150; // Mínimo scroll antes de activar el efecto
let ticking = false;

// Función optimizada con requestAnimationFrame
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Solo activar después de cierto scroll
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling DOWN - Ocultar navbar
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-visible');
        } else {
            // Scrolling UP - Mostrar navbar
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-visible');
        }
    } else {
        // En la parte superior - Siempre visible
        navbar.classList.remove('nav-hidden');
        navbar.classList.remove('nav-visible');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// ===== BACK TO TOP BUTTON =====
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos a animar
const animateElements = document.querySelectorAll(`
    .blog-card,
    .comparison-card,
    .branch-node,
    .event-card
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR MOBILE CLOSE ON CLICK =====
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarCollapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// ===== MIND MAP ANIMATIONS =====
const centerNode = document.querySelector('.center-node');
const branchNodes = document.querySelectorAll('.branch-node');

if (centerNode) {
    const mindmapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar el nodo central primero
                centerNode.style.animation = 'popIn 0.5s ease-out';
                
                // Luego animar los branches con delay
                branchNodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.style.animation = 'slideIn 0.5s ease-out forwards';
                    }, 200 * (index + 1));
                });
            }
        });
    }, { threshold: 0.3 });
    
    mindmapObserver.observe(document.querySelector('.mindmap-container'));
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== COMPARISON CARDS HOVER EFFECT =====
const comparisonCards = document.querySelectorAll('.comparison-card');

comparisonCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        comparisonCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        comparisonCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ===== BLOG CARDS READ TIME CALCULATOR =====
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    const text = card.querySelector('p').textContent;
    const wordCount = text.split(' ').length;
    const readTime = Math.ceil(wordCount / 200); // 200 words per minute
    
    const metaDiv = card.querySelector('.blog-meta');
    const readTimeSpan = document.createElement('span');
    readTimeSpan.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
    metaDiv.appendChild(readTimeSpan);
});

// ===== EVENTS COUNTDOWN (OPCIONAL) =====
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    const dayElement = card.querySelector('.day');
    const monthElement = card.querySelector('.month');
    
    if (dayElement && monthElement) {
        const day = parseInt(dayElement.textContent);
        const month = monthElement.textContent;
        
        // Puedes agregar lógica de countdown aquí si lo deseas
    }
});

// ===== FADE IN INICIAL =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PARALLAX EFFECT EN HERO =====
const heroSection = document.querySelector('.hero-blog');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===== LOG PARA DEBUGGING =====
console.log('Blog page loaded successfully!');
console.log('Navbar intelligent scroll: Active');
console.log('Animations: Active');
console.log('Mind map: Active');