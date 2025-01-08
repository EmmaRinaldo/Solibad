// lib/transalte.js
import axios from "axios";

// Service pour la traduction avec LibreTranslate
const translateText = async (text, targetLanguage) => {
  const url = "https://libretranslate.com/translate";  // URL de l'API de LibreTranslate
  try {
    const response = await axios.post(url, {
      q: text,
      source: "en", // Langue source
      target: targetLanguage, // Langue cible
      format: "text",
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Error while translating:", error);
    return text; // En cas d'erreur, on retourne le texte original
  }
};

export default translateText;