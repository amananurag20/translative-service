const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { translateText } = require("./services/deepl");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
    try {
        const { text, target_lang } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const data = await translateText(text, target_lang);
        res.json(data);
    } catch (error) {
        console.error("Translation Error Name:", error.name);
        console.error("Translation Error Message:", error.message);

        if (error.response) {
            console.error("DeepL Error Status:", error.response.status);
            console.error("DeepL Error Data:", JSON.stringify(error.response.data));
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error("No response received from DeepL");
            res.status(500).json({ error: "No response from translation service" });
        } else {
            console.error("Error setting up request:", error.message);
            res.status(500).json({ error: "Internal server error during translation setup" });
        }
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});