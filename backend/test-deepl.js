require("dotenv").config();
const axios = require("axios");

const DEEPL_API_KEY = process.env.DEEL_API;
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

console.log("Testing DeepL API...");
console.log("API Key found:", DEEPL_API_KEY ? "Yes" : "No");

async function testTranslation() {
    try {
        const response = await axios.post(
            DEEPL_API_URL,
            {
                text: ["Hello, world!"],
                target_lang: "ES"
            },
            {
                headers: {
                    'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Success!");
        console.log("Translation:", response.data.translations[0].text);
    } catch (error) {
        console.error("Test Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
}

testTranslation();
