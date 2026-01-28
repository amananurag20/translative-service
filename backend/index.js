const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DeepL API Configuration
const DEEPL_API_KEY = process.env.DEEL_API; // Using the key name provided in user's .env
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

app.post("/translate", async (req, res) => {
    try {
        const { text, target_lang } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        console.log("Translating:", text, "to", target_lang);
        console.log("Using API Key:", DEEPL_API_KEY ? "Present" : "Missing");

        // Use JSON body and Authorization header for better compatibility
        const response = await axios.post(
            DEEPL_API_URL,
            {
                text: [text], // DeepL expects an array of strings for JSON input
                target_lang: target_lang || "ES"
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
        res.json(response.data);
    } catch (error) {
        console.error("Translation Error Name:", error.name);
        console.error("Translation Error Message:", error.message);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("DeepL Error Status:", error.response.status);
            console.error("DeepL Error Data:", JSON.stringify(error.response.data));
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from DeepL");
            res.status(500).json({ error: "No response from translation service" });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", error.message);
            res.status(500).json({ error: "Internal server error during translation setup" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});