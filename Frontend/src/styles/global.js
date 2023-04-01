import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${ props => props.theme.fonts.default };
        letter-spacing: -4.5%;

        /* For WebKit-based browsers */
        ::-webkit-scrollbar {
            width: 8px; /* width of the scrollbar */
            background-color: #fff; /* color of the scrollbar track */
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${props => props.theme.colors.gray[900]}; /* color of the scrollbar thumb */
        }

        /* For Firefox */
        scrollbar-color: ${props => props.theme.colors.gray[900]};
    }

    body{
        scroll-behavior: smooth;
    }

    a{
        text-decoration: none;
    }
`
export default GlobalStyle