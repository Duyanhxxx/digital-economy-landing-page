// Navigation Handler - Xử lý navigation và mobile menu
class NavigationHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveNavigation();
    }

    setupSmoothScrolling() {
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
    }

    setupScrollEffects() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                    navbar.classList.add('scrolled');
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    setupMobileMenu() {
        // Mobile menu toggle functionality
        const toggleMobileMenu = () => {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        };

        // Add mobile menu styles
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
        if (navContainer) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.className = 'mobile-menu-toggle';
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuButton.onclick = toggleMobileMenu;
            navContainer.appendChild(mobileMenuButton);
        }
    }

    setupActiveNavigation() {
        // Highlight active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

export default NavigationHandler;