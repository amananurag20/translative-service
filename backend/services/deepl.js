const axios = require("axios");

const DEEPL_API_KEY = process.env.DEEL_API;
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

/**
 * Translate text using DeepL API
 * @param {string} text - The text to translate
 * @param {string} targetLang - The target language code (e.g., 'ES', 'DE', 'FR')
 * @returns {Promise<object>} - DeepL API response
 */
async function translateText(text, targetLang = "ES") {
    console.log("Translating:", text, "to", targetLang);
    console.log("Using API Key:", DEEPL_API_KEY ? "Present" : "Missing");

    const response = await axios.post(
        DEEPL_API_URL,
        {
            text: [text],
            target_lang: targetLang
        },
        {
            headers: {
                'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'TranslationApp/1.0.0'
            }
        }
    );

    console.log("DeepL Response:", response.data);
    return response.data;
}

module.exports = { translateText };
