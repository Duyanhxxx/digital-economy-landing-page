import { translatePage } from './translate.js';

/**
 * Handles language translation functionality
 */
export default class TranslationHandler {
    constructor() {
        this.currentLang = 'vi'; // Default language
        this.init();
    }

    init() {
        this.addLanguageSelector();
        this.bindEvents();
        this.storeOriginalTexts();
    }

    /**
     * Add language selector to navigation
     */
    addLanguageSelector() {
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        const langSelect = document.createElement('select');
        langSelect.id = 'langSelect';
        langSelect.className = 'lang-select';
        langSelect.innerHTML = `
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="fr">🇫🇷 Français</option>
        `;
        langSelect.value = this.currentLang;

        // Insert before nav-menu
        const navMenu = navContainer.querySelector('.nav-menu');
        if (navMenu) {
            navContainer.insertBefore(langSelect, navMenu);
        } else {
            navContainer.appendChild(langSelect);
        }
    }

    /**
     * Bind change event to language selector
     */
    bindEvents() {
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                const targetLang = e.target.value;
                this.changeLanguage(targetLang);
            });
        }
    }

    /**
     * Change language and translate page
     * @param {string} targetLang
     */
    async changeLanguage(targetLang) {
        if (targetLang === this.currentLang) return;

        this.currentLang = targetLang;
        await translatePage(targetLang);

        // Store current language in localStorage
        localStorage.setItem('selectedLanguage', targetLang);
    }

    /**
     * Store original texts for all translatable elements
     */
    storeOriginalTexts() {
        const translatableElements = document.querySelectorAll('.translatable');
        translatableElements.forEach(element => {
            if (!element.dataset.originalText) {
                element.dataset.originalText = element.textContent.trim();
            }
        });
    }

    /**
     * Restore original language (Vietnamese)
     */
    async restoreOriginalLanguage() {
        await this.changeLanguage('vi');
    }
}