import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationTA from "./locales/ta.json";
import translationMA from "./locales/ml.json";
import translationHI from "./locales/hi.json";



i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ta: { translation: translationTA },
      ml: { translation: translationMA },
      hi: { translation: translationHI }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
