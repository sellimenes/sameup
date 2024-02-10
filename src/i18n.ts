import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import trJSON from './locale/tr.json'

const resources = {
  en: { ...enJSON },
  tr: { ...trJSON },
};

// Get the first part of the browser language code
const browserLang = navigator.language.split('-')[0];

// Use the browser language if it's in the resources, otherwise default to 'en'
const defaultLang = resources[browserLang as keyof typeof resources] ? browserLang : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
});