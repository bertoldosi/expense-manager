import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
    }

    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }

    html,
    body {
        font-family: 'Source Sans Pro', sans-serif;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        
    }

    body{
        color: ${(props) => props.theme.textPrimary};
        background: ${(props) => props.theme.backgroundPrimary};
        user-select: none;
    }

    button{
        cursor: pointer;    
        border: none;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1.2rem;
    }

    a{
        color: ${(props) => props.theme.textSecondary};
        font-size: 1.5rem;
    }
`;

export default GlobalStyle;
