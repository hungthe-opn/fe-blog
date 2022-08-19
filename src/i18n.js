import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
//import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json"
import translationDE from "./locales/de/translations.json";
const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        lng: "en",
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        detection:{
            order:['querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain']
        }
    });

export default i18n;
