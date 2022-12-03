import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Tivop0P7ED81pJp0L8LiCHF9ZXfUfs6ja1H7MViVYsFSYRDhU4qdDK1jSRsWa8zC';

let customTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#363434',
            paper: '#342f2f',
        },
        primary: {
            main: '#282828',
        },
    },
});

customTheme = responsiveFontSizes(customTheme);

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={customTheme}>
                <GlobalStyle />
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
