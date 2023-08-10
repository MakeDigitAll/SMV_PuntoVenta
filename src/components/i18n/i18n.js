import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'Es',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      En: {
        translation: {
          login:{
            Welcome: 'Welcome',
            Password: 'Password',
            Email: 'Email',
            Login: 'Login',
            StayLogged: 'Remember me',
            AllRights: 'All rights reserved'
          }
        }
      },
      Es: {
        translation: {
          login:{
            Welcome: 'Bienvenido',
            Password: 'Contraseña',
            Email: 'Correo electrónico',
            Login: 'Iniciar sesión',
            StayLogged: 'Recuerdame',
            AllRights: 'Todos los derechos reservados'
          }
        }
      }
    }
  });

export default i18n;