import I18n from 'ex-react-native-i18n';
import en from './locales/en';
import ja from './locales/ja';

I18n.fallbacks = true;

// If an English translation is not available in vi.js, it will look inside en.js
I18n.fallbacks = true;

// It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn"t exist in any of the translation files.
I18n.missingBehaviour = 'guess';

// If the current locale in device is not en or vi
// I18n.defaultLocale = "en";

// If we do not want the framework to use the phone"s locale by default
I18n.locale = 'en';

I18n.translations = {
  en,
  ja
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export default I18n;
