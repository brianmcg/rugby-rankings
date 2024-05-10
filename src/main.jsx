// import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider  } from '@mui/material/styles';
import i18n from '@utils/i18n';
import App from './App';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ParallaxProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
      </I18nextProvider>
    </ParallaxProvider>
  // </StrictMode>
);
