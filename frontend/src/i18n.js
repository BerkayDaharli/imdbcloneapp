// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "login": "Login",
      "search": "Search",
      "topMovies": "Top 10 movies on IMDb clone this week",
      "noMovies": "No movies to display.",
      "watchTrailer": "Watch Trailer",
      "register": "Register",
      "searchResultsFor": "Search Results for "
    }
  },
  tr: {
    translation: {
      "home": "Ana Sayfa",
      "login": "Giriş",
      "search": "Arama",
      "topMovies": "Bu hafta IMDb klonunda en iyi 10 film",
      "noMovies": "Gösterilecek film yok.",
      "watchTrailer": "Fragmanı İzle",
      "register": "Kaydol",
      "searchResultsFor": "Search Results for "
    }
  }
};

i18n.use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('tr') ? 'tr' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
