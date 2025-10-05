/**
 * Google Translate API integration for frontend
 * Uses Google Cloud Translate API v2
 */

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Translates text using Google Translate API
 * @param {string} text - The text to translate
 * @param {string} targetLang - Target language code (e.g., 'en', 'vi', 'ja')
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, targetLang) {
    if (!API_KEY) {
        console.error('Google Translate API key not found. Please set VITE_GOOGLE_TRANSLATE_KEY in your environment variables.');
        return text; // Return original text if no API key
    }

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLang,
            }),
        });

        if (!response.ok) {
            throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation failed:', error);
        return text; // Return original text on error
    }
}

/**
 * Translates all elements with class 'translatable'
 * @param {string} targetLang - Target language code
 */
export async function translatePage(targetLang) {
    const translatableElements = document.querySelectorAll('.translatable');

    // Show loading state
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.disabled = true;
        langSelect.innerHTML = '<option>Loading...</option>';
    }

    try {
        const translationPromises = Array.from(translatableElements).map(async (element) => {
            const originalText = element.dataset.originalText || element.textContent.trim();
            if (!originalText) return;

            // Store original text if not already stored
            if (!element.dataset.originalText) {
                element.dataset.originalText = originalText;
            }

            // Skip if already in target language (simple check)
            if (targetLang === 'vi' && originalText.includes('Xin chào')) return;

            const translatedText = await translateText(originalText, targetLang);
            element.textContent = translatedText;
        });

        await Promise.all(translationPromises);
    } catch (error) {
        console.error('Page translation failed:', error);
    } finally {
        // Restore dropdown
        if (langSelect) {
            langSelect.disabled = false;
            langSelect.innerHTML = `
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="fr">🇫🇷 Français</option>
            `;
            langSelect.value = targetLang;
        }
    }
}