/**
 * 🌍 i18n System - Multi-language Support
 * Hỗ trợ: Tiếng Việt, English, 日本語, 中文
 * Client-side only, no backend required
 */

class I18n {
    constructor() {
        this.currentLang = 'vi'; // Mặc định Tiếng Việt
        this.translations = {};
        this.fallbackLang = 'vi';
        this.supportedLanguages = {
            vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
            en: { name: 'English', flag: '🇺🇸' },
            ja: { name: '日本語', flag: '🇯🇵' },
            zh: { name: '中文', flag: '🇨🇳' }
        };
    }

    /**
     * Khởi tạo hệ thống i18n
     * - Lấy ngôn ngữ từ localStorage (nếu có)
     * - Load file JSON tương ứng
     * - Áp dụng dịch vào trang
     */
    async init() {
        try {
            // Lấy ngôn ngữ đã lưu hoặc dùng mặc định
            const savedLang = localStorage.getItem('preferred-language') || this.fallbackLang;
            await this.setLanguage(savedLang);

            // Lắng nghe sự kiện thay đổi ngôn ngữ
            this.setupLanguageSelector();

            console.log(`✅ i18n initialized with language: ${this.currentLang}`);
        } catch (error) {
            console.error('❌ Error initializing i18n:', error);
            // Fallback về tiếng Việt nếu có lỗi
            await this.setLanguage(this.fallbackLang);
        }
    }

    /**
     * Tải file JSON ngôn ngữ từ /locales/
     * @param {string} lang - Mã ngôn ngữ (vi, en, ja, zh)
     * @returns {Promise<Object>} - Object chứa translations
     */
    async loadLanguage(lang) {
        try {
            this.showLoadingState(true);

            // Thử nhiều đường dẫn fallback cho Vercel
            const paths = [
                `/locales/${lang}.json`,                    // Absolute path
                `./locales/${lang}.json`,                   // Relative path
                `${window.location.origin}/locales/${lang}.json`, // Full URL
                `/digital-economy-landing-page/locales/${lang}.json` // Subpath fallback
            ];

            let response;
            let lastError;

            for (const path of paths) {
                try {
                    console.log(`🔄 Trying to load: ${path}`);
                    response = await fetch(path, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Cache-Control': 'no-cache'
                        }
                    });

                    if (response.ok) {
                        console.log(`✅ Successfully loaded: ${path}`);
                        break;
                    } else {
                        console.warn(`⚠️ Path failed (${response.status}): ${path}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Fetch error for ${path}:`, error);
                    lastError = error;
                }
            }

            if (!response || !response.ok) {
                throw new Error(`Failed to load language file: ${lang}. Last error: ${lastError}`);
            }

            const translations = await response.json();
            this.translations = translations;

            return translations;
        } catch (error) {
            console.error(`❌ Error loading language ${lang}:`, error);

            // Nếu không load được, thử load tiếng Việt
            if (lang !== this.fallbackLang) {
                console.log(`⚠️ Fallback to ${this.fallbackLang}`);
                return await this.loadLanguage(this.fallbackLang);
            }

            throw error;
        } finally {
            this.showLoadingState(false);
        }
    }

    /**
     * Áp dụng bản dịch vào tất cả elements có data-i18n
     * @param {Object} translations - Object chứa key-value translations
     */
    applyTranslations(translations) {
        // Dịch text có data-i18n
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key, translations);

            if (translation) {
                // Thêm animation fade khi chuyển ngôn ngữ
                element.style.opacity = '0';

                setTimeout(() => {
                    element.textContent = translation;
                    element.style.opacity = '1';
                }, 150);
            } else {
                console.warn(`⚠️ Translation not found for key: ${key}`);
            }
        });

        // Dịch placeholder
        const inputElements = document.querySelectorAll('[data-i18n-placeholder]');
        inputElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getNestedTranslation(key, translations);

            if (translation) {
                element.setAttribute('placeholder', translation);
            }
        });

        // Dịch title/tooltip
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getNestedTranslation(key, translations);

            if (translation) {
                element.setAttribute('title', translation);
            }
        });

        // Cập nhật thuộc tính lang của HTML
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    /**
     * Lấy translation từ nested object (hỗ trợ key như "nav.home")
     * @param {string} key - Key có thể có dạng "section.subsection.key"
     * @param {Object} translations - Object chứa translations
     * @returns {string|null} - Giá trị translation hoặc null
     */
    getNestedTranslation(key, translations) {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }

        return typeof value === 'string' ? value : null;
    }

    /**
     * Đặt ngôn ngữ mới
     * @param {string} lang - Mã ngôn ngữ (vi, en, ja, zh)
     */
    async setLanguage(lang) {
        // Kiểm tra ngôn ngữ có được hỗ trợ không
        if (!this.supportedLanguages[lang]) {
            console.warn(`⚠️ Language ${lang} not supported, using ${this.fallbackLang}`);
            lang = this.fallbackLang;
        }

        try {
            // Load file JSON
            const translations = await this.loadLanguage(lang);

            // Áp dụng translations
            this.applyTranslations(translations);

            // Lưu vào localStorage
            this.currentLang = lang;
            localStorage.setItem('preferred-language', lang);

            // Cập nhật UI của selector
            this.updateLanguageSelectorUI();

            console.log(`✅ Language changed to: ${lang}`);
        } catch (error) {
            console.error(`❌ Error setting language to ${lang}:`, error);
        }
    }

    /**
     * Thiết lập event listeners cho language selector
     */
    setupLanguageSelector() {
        // Đợi DOM load xong
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.attachLanguageSelectorEvents();
            });
        } else {
            this.attachLanguageSelectorEvents();
        }
    }

    /**
     * Gắn events vào language selector
     */
    attachLanguageSelectorEvents() {
        const selector = document.getElementById('language-selector');

        if (selector) {
            selector.addEventListener('change', (e) => {
                const newLang = e.target.value;
                this.setLanguage(newLang);
            });
        }

        // Hỗ trợ custom dropdown nếu có
        const customButtons = document.querySelectorAll('[data-lang-switch]');
        customButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newLang = e.currentTarget.getAttribute('data-lang-switch');
                this.setLanguage(newLang);
            });
        });
    }

    /**
     * Cập nhật UI của language selector
     */
    updateLanguageSelectorUI() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLang;
        }

        // Cập nhật active state cho custom UI nếu có
        document.querySelectorAll('[data-lang-switch]').forEach(button => {
            const lang = button.getAttribute('data-lang-switch');
            if (lang === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Hiển thị/ẩn loading state
     * @param {boolean} show - true để hiện, false để ẩn
     */
    showLoadingState(show) {
        const spinner = document.getElementById('language-loading');
        if (spinner) {
            spinner.style.display = show ? 'inline-block' : 'none';
        }

        // Disable selector trong lúc loading
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.disabled = show;
        }
    }

    /**
     * Get translation cho một key cụ thể (dùng trong JS)
     * @param {string} key - Key cần dịch
     * @returns {string} - Translation hoặc key nếu không tìm thấy
     */
    t(key) {
        const translation = this.getNestedTranslation(key, this.translations);
        return translation || key;
    }
}

// Export singleton instance
const i18n = new I18n();
export default i18n;
