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

        const params = new URLSearchParams();
        params.append("auth_key", DEEPL_API_KEY);
        params.append("text", text);
        params.append("target_lang", target_lang || "ES"); // Default to Spanish

        const response = await axios.post(DEEPL_API_URL, params);

        res.json(response.data);
    } catch (error) {
        console.error("Translation Error:", error.message);
        if (error.response) {
            console.error(error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Failed to translate text" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});