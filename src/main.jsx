// import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import i18n from '@utils/i18n';
import App from './App'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ParallaxProvider>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ParallaxProvider>
  // </React.StrictMode>
);
