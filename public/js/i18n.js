/**
 * i18n (Internationalization) Module
 * Client-side language switching without page reload
 */
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'vi';
        this.translations = {};
        this.isLoading = false;
        this.init();
    }

    async init() {
        await this.loadLanguage(this.currentLang);
        this.createLanguageSelector();
        this.applyTranslations();
    }

    /**
     * Load language file from /locales/ directory
     */
    async loadLanguage(lang) {
        if (this.isLoading) return;

        this.isLoading = true;
        this.showLoadingSpinner();

        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${response.status}`);
            }
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('selectedLanguage', lang);
        } catch (error) {
            console.error('Error loading language:', error);
            // Fallback to Vietnamese if loading fails
            if (lang !== 'vi') {
                await this.loadLanguage('vi');
            }
        } finally {
            this.isLoading = false;
            this.hideLoadingSpinner();
        }
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (translation) {
                // Add fade effect
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = translation;
                    element.style.opacity = '1';
                }, 100);

                // Update document title if it's a title element
                if (element.tagName === 'TITLE') {
                    document.title = translation;
                }
            }
        });
    }

    /**
     * Get translation for a key
     */
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            value = value && value[k];
        }

        return value || key;
    }

    /**
     * Set language and apply changes
     */
    async setLanguage(lang) {
        if (lang === this.currentLang) return;

        await this.loadLanguage(lang);
        this.applyTranslations();
        this.updateLanguageSelector();
    }

    /**
     * Create language selector dropdown
     */
    createLanguageSelector() {
        // Check if dropdown already exists in navigation
        const existingDropdown = document.querySelector('.nav-language .lang-dropdown');
        if (existingDropdown) {
            this.bindEvents();
            this.updateLanguageSelector();
            return;
        }

        // Fallback: create dropdown if not found in navigation
        const selector = document.createElement('div');
        selector.id = 'language-selector';
        selector.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-button" id="current-lang">
                    <span id="current-lang-flag">🇻🇳</span>
                    <span id="current-lang-text">VI</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="lang-options" id="lang-options">
                    <div class="lang-option" data-lang="vi">
                        <span class="lang-flag">🇻🇳</span>
                        <span class="lang-text">Tiếng Việt</span>
                    </div>
                    <div class="lang-option" data-lang="en">
                        <span class="lang-flag">🇺🇸</span>
                        <span class="lang-text">English</span>
                    </div>
                    <div class="lang-option" data-lang="ja">
                        <span class="lang-flag">🇯🇵</span>
                        <span class="lang-text">日本語</span>
                    </div>
                    <div class="lang-option" data-lang="zh">
                        <span class="lang-flag">🇨🇳</span>
                        <span class="lang-text">中文</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(selector);
        this.bindEvents();
        this.updateLanguageSelector();
    }

    /**
     * Bind events for language selector
     */
    bindEvents() {
        const button = document.getElementById('current-lang');
        const options = document.getElementById('lang-options');

        // Toggle dropdown
        button.addEventListener('click', () => {
            options.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!button.contains(e.target) && !options.contains(e.target)) {
                options.classList.remove('show');
            }
        });

        // Language selection
        options.addEventListener('click', (e) => {
            const option = e.target.closest('.lang-option');
            if (option) {
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                options.classList.remove('show');
            }
        });
    }

    /**
     * Update language selector display
     */
    updateLanguageSelector() {
        const languages = {
            vi: { flag: '🇻🇳', text: 'VI' },
            en: { flag: '🇺🇸', text: 'EN' },
            ja: { flag: '🇯🇵', text: 'JA' },
            zh: { flag: '🇨🇳', text: 'ZH' }
        };

        const current = languages[this.currentLang];
        if (current) {
            const flagElement = document.getElementById('current-lang-flag');
            const textElement = document.getElementById('current-lang-text');
            if (flagElement) flagElement.textContent = current.flag;
            if (textElement) textElement.textContent = current.text;
        }
    }

    /**
     * Show loading spinner
     */
    showLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'block';
        }
    }

    /**
     * Hide loading spinner
     */
    hideLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});
