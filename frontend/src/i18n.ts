import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {makeZodI18nMap} from "zod-i18n-map";
import {z} from "zod";
import zod_en from "zod-i18n-map/locales/en/zod.json";
import zod_de from "zod-i18n-map/locales/de/zod.json";

i18n.use(HttpApi).use(LanguageDetector).use(initReactI18next).init({
    partialBundledLanguages: true,
    fallbackLng: 'en',
    debug: true,
    supportedLngs: ['en', 'de'],
    load: 'languageOnly',
    resources: {
        en: {
            zod: zod_en,
            zod_custom: {
                InvalidDate: "Invalid Date. Must be YYYY-MM."
            }
        },
        de: {
            zod: zod_de,
            zod_custom: {
                InvalidDate: "Ungültiges Datum. Muss YYYY-MM sein."
            }
        },
    },
}).catch((error) => {
    console.error(error)
});

z.setErrorMap(makeZodI18nMap({ns: ["zod", "zod_custom"]}));
export {z};