import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import trJSON from './locale/tr.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    tr: { ...trJSON },
  },
  lng: "en",
});