// app/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importer les fichiers JSON de traduction
import en from "@app/locales/en/common.json";
import fr from "@app/locales/fr/common.json";
import zh from "@app/locales/zh/common.json";
import id from "@app/locales/id/common.json";
import ja from "@app/locales/ja/common.json";
import ko from "@app/locales/ko/common.json";

// Configuration d'i18next
i18n
  .use(initReactI18next) // Lien avec React
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      zh: { translation: zh },
      id: { translation: id },
      ja: { translation: ja },
      ko: { translation: ko },
    },
    lng: "fr", // Langue par défaut
    fallbackLng: "en", // Langue de secours
    interpolation: {
      escapeValue: false, // Pas besoin d'échapper les valeurs
    },
  });

export default i18n;
