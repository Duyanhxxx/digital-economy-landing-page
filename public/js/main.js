import ComponentLoader from './componentLoader.js';
import NavigationHandler from './navigation.js';
import ChatboxHandler from './chatbox.js';
import AnimationHandler from './animations.js';
import InteractiveHandler from './interactive.js';

// Initialize the application
class App {
    constructor() {
        this.componentLoader = new ComponentLoader();
        this.init();
    }

    async init() {
        try {
            console.log('Starting component loading...');
            
            // Load all components first
            await this.componentLoader.loadAllComponents();
            console.log('Components loaded successfully');
            
            // Wait a bit more for DOM to be fully ready
            await this.waitForDOM();
            
            // Initialize handlers after components are loaded
            this.initializeHandlers();
            
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    async waitForDOM() {
        return new Promise(resolve => {
            // Check if chatbox is loaded
            const checkChatbox = () => {
                const chatbox = document.getElementById('ai-chatbox');
                const toggle = document.getElementById('chatbox-toggle');
                
                if (chatbox && toggle) {
                    console.log('Chatbox DOM elements found');
                    resolve();
                } else {
                    console.log('Waiting for chatbox elements...');
                    setTimeout(checkChatbox, 50);
                }
            };
            
            // Start checking after a short delay
            setTimeout(checkChatbox, 100);
        });
    }

    initializeHandlers() {
        try {
            console.log('Initializing handlers...');
            
            // Initialize navigation
            this.navigationHandler = new NavigationHandler();
            console.log('Navigation handler initialized');
            
            // Initialize chatbox with extra checks
            try {
                const chatboxElement = document.getElementById('ai-chatbox');
                const toggleElement = document.getElementById('chatbox-toggle');
                
                if (chatboxElement && toggleElement) {
                    this.chatboxHandler = new ChatboxHandler();
                    console.log('Chatbox handler initialized successfully');
                } else {
                    console.error('Chatbox elements not found:', {
                        chatbox: !!chatboxElement,
                        toggle: !!toggleElement
                    });
                }
            } catch (chatboxError) {
                console.error('Error initializing chatbox:', chatboxError);
            }
            
            // Initialize animations
            this.animationHandler = new AnimationHandler();
            console.log('Animation handler initialized');
            
            // Initialize interactive features
            this.interactiveHandler = new InteractiveHandler();
            console.log('Interactive handler initialized');
            
            // Initialize other features
            this.initializeScrollEffects();
            this.initializeDownloadButton();
            
            console.log('All handlers initialized successfully');
            
        } catch (error) {
            console.error('Error during handler initialization:', error);
        }
    }

    initializeScrollEffects() {
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

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    initializeDownloadButton() {
        // Download report functionality - make it global for backward compatibility
        window.downloadReport = function() {
            alert('Tính năng tải báo cáo sẽ được cập nhật sớm!');
        };
        
        // Add event listener for the new download button
        const downloadBtn = document.getElementById('download-report-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.downloadReport();
            });
        }
        
        // Also handle any remaining onclick buttons
        const downloadBtns = document.querySelectorAll('[onclick*="downloadReport"]');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.downloadReport();
            });
        });
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting app...');
    startAppOnce();
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Document still loading, wait for DOMContentLoaded
} else {
    // Document already loaded
    console.log('Document already loaded, starting app immediately...');
    startAppOnce();
}

function startAppOnce() {
    if (window.__appInitialized) return;
    window.__appInitialized = true;
    new App();
}