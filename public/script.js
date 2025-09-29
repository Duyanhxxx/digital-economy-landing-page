// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.concept-card, .impact-card, .solution-card, .conclusion-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [70, 85, 95];
                setTimeout(() => {
                    animateCounter(stat, targets[index]);
                }, index * 200);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// CTA Button functionality
function downloadReport() {
    // Create a simple modal or alert for demonstration
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1f2937;">Báo Cáo Chi Tiết</h3>
        <p style="margin-bottom: 1.5rem; color: #6b7280;">
            Cảm ơn bạn đã quan tâm! Báo cáo chi tiết sẽ được gửi đến email của bạn.
        </p>
        <div style="margin-bottom: 1.5rem;">
            <input type="email" placeholder="Nhập email của bạn" 
                   style="width: 100%; padding: 0.8rem; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 1rem;">
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="submitEmail()" 
                    style="background: #667eea; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer;">
                Gửi
            </button>
            <button onclick="closeModal()" 
                    style="background: #6b7280; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer;">
                Đóng
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal function
    window.closeModal = function() {
        document.body.removeChild(modal);
    };
    
    // Submit email function
    window.submitEmail = function() {
        const email = modal.querySelector('input[type="email"]').value;
        if (email && email.includes('@')) {
            alert('Cảm ơn bạn! Báo cáo sẽ được gửi đến ' + email);
            closeModal();
        } else {
            alert('Vui lòng nhập email hợp lệ');
        }
    };
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Landing page loaded successfully!');
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.concept-card, .impact-card, .solution-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu styles if needed
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Add mobile menu button to navbar
const navContainer = document.querySelector('.nav-container');
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-toggle';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuButton.onclick = toggleMobileMenu;
navContainer.appendChild(mobileMenuButton);