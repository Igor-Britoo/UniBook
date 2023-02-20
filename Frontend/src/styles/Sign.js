import styled from "styled-components"

export const Main = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: ${ props => props.theme.colors.gray[400] };
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding-top: 70px;
`;

export const ContainerForm = styled.div`
    width: 450px;
    padding: 60px 50px;
    margin-bottom: 50px;
    gap: 40px;
    background-color: ${ props => props.theme.colors.white };
    border-radius: 10px;
    border: 1px solid ${ props => props.theme.colors.gray[700] };;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: ${ props => props.theme.breakpoints.md}){    
        width: 60%;
        min-width: 380px;
    }

    @media screen and (max-width: ${ props => props.theme.breakpoints.xs}){
        min-width: 310px;
        padding: 40px 30px;
    }
    
`;

export const Form = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    gap: 15px;

    input {
        height: 40px;
        padding: 0px 20px;
        font-weight: 400;
        font-size: ${ props => props.theme.fontSizes.md};
        border-radius: 5px;
        border: 1px solid ${ props => props.theme.colors.gray[700] };
    }

    input::placeholder {
        color: ${ props => props.theme.colors.gray[700] };
    }
`;