import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-locize-backend';
// import LastUsed from 'locize-lastused';
// import { locizePlugin, locizeEditorPlugin } from 'locize';



i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    supportedLngs : ['en', 'de'],
    resources: {
        en: {
            navigation: {
                Clients: "Clients",
                Emails: "Emails",
                Settings: "Settings",
            },
            translation: {

            }
        },
        de: {
            navigation:{
                Clients: "Kunden",
                Emails: "E-Mails",
                Settings: "Einstellungen",
            },
            translation: {

            }
        }
    }
}).catch((error) => {console.error(error)});