import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${ props => props.theme.fonts.default };
        letter-spacing: -4.5%;
    }

    body{
        scroll-behavior: smooth;
    }

    a{
        text-decoration: none;
    }
`
export default GlobalStyle