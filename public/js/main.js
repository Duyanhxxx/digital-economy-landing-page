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
        // Load all components first
        await this.componentLoader.loadAllComponents();
        
        // Initialize handlers after components are loaded
        // Use setTimeout to ensure DOM is fully updated
        setTimeout(() => {
            this.initializeHandlers();
        }, 100);
    }

    initializeHandlers() {
        // Initialize navigation
        this.navigationHandler = new NavigationHandler();
        
        // Initialize chatbox
        this.chatboxHandler = new ChatboxHandler();
        
        // Initialize animations
        this.animationHandler = new AnimationHandler();
        
        // Initialize interactive features
        this.interactiveHandler = new InteractiveHandler();
        
        // Initialize other features
        this.initializeScrollEffects();
        this.initializeDownloadButton();
        
        console.log('All handlers initialized');
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
    new App();
});