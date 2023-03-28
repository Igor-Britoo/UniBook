import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: ${ props => props.theme.colors.gray[400] };
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    padding: 160px 50px 60px 50px;

    @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
        padding: 160px 20px 60px 20px;
    }
`;

export const H1 = styled.h1`
    color: ${ props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.green[500] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: 500;
    line-height: 1em;
    overflow-y: hidden;
    margin: ${ props => props.margin ? props.margin : 0 };

    a {
        text-decoration: none;
        color: inherit;
    } 
`;

export const H2 = styled.h2`
    color: ${ props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    margin: ${ props => props.margin ? props.margin : 0 };

    a {
        text-decoration: none;
        color: inherit;
    } 
`;

export const H3 = styled.h3`
    color: ${ props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    margin: ${ props => props.margin ? props.margin : 0 };

    ${props => props.maxChars && `
    text-overflow: ellipsis;
    overflow-x: hidden;
    max-width: ${props.maxChars}ch;
    display: inline-block;
    white-space: nowrap;`}

    a {
        text-decoration: none;
        color: inherit;
    } 
`;

export const H4 = styled.h4`
    color: ${ props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    margin: ${ props => props.margin ? props.margin : 0 };

    ${props => props.maxChars && `
    text-overflow: ellipsis;
    overflow-x: hidden;
    max-width: ${props.maxChars}ch;
    display: inline-block;
    white-space: nowrap;`}

    a {
        text-decoration: none;
        color: inherit;
    } 
`;

export const Label = styled.label`
    color: ${ props => props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    margin: ${ props => props.margin ? props.margin : 0 };
`;

export const Paragraph = styled.p`
    color: ${ props => props.color === "gray" ? props.theme.colors.gray[700] : props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    text-align: ${ props => props.textAlign };;
    margin: ${ props => props.margin ? props.margin : 0 };
    
    a {
        text-decoration: none;
    }    
`;

export const Span = styled.span`
    color: ${ props => props.color ? props.theme.colors[props.color.replace(/[\d{3}]+/, "")][props.color.replace(/[^\d{3}]+/, "")] : props.theme.colors.green[800] };
    font-size: ${ props => props.theme.fontSizes[props.fontSize] };
    font-weight: ${ props => props.fontWeight };
    margin: ${ props => props.margin ? props.margin : 0 };

    ${props => props.maxChars && `
    text-overflow: ellipsis;
    overflow-x: hidden;
    max-width: ${props.maxChars}ch;
    display: inline-block;
    white-space: nowrap;`}
`;

export const ErrorMessage = styled.span`
    color: ${ props => props.theme.colors.red };
    font-size: ${ props => props.theme.fontSizes.sm };
`;

export const Button = styled.button`
    height: ${ props => props.height };
    background-color: ${ props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.green[500] };
    color: ${ props => props.color === 'white' ? props.theme.colors.green[500] : props.theme.colors.white };
    font-size: ${ props => props.fontSize ? props.theme.fontSizes[props.fontSize] : props.theme.fontSizes.xl };
    font-weight: 700;
    border: 1px solid ${ props => props.theme.colors.green[500]};
    border-radius: 5px;
    cursor: pointer;

    transition:  0.2s background-color ease-in-out ;

    :hover {
        background-color: ${ props => props.color === 'white' ? props.theme.colors.gray[300] : props.theme.colors.green[600] }
    }
`;

