import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    height: 100vh;
    min-height: 750px;
    background-color: var(--gray-400);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const Logo = styled.h2`
    color: var(--green-500);
    margin-top: 3%;
    font-size: 3em;
    font-weight: 500;

    @media screen and (max-width: 450px){
        min-width: 310px;
        margin-top: 5%;
        font-size: 2.5em;
        display: flex;
        justify-content: center;
    }
`;

export const ContainerForm = styled.div`
    width: 450px;
    background-color: #fff;
    padding: 60px 50px;
    border-radius: 10px;
    border: 1px solid var(--gray-700);
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (max-width: 768px){    
        width: 60%;
        min-width: 380px;
    }

    @media screen and (max-width: 450px){
        min-width: 310px;
        padding: 40px 30px;
    }
`;

export const TitleForm = styled.h3`
    color: var(--green-800);
    font-size: 2.25em;
    font-weight: 500;

    @media screen and (max-width: 450px){
        min-width: 200px;
        font-size: 2em;
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
        font-size: 1em;
        font-weight: 400;
        border-radius: 5px;
        border: 1px solid var(--gray-700);

        @media screen and (max-width: 450px){
            min-width: 200px;
            font-size: 1em;
        }

    }
    
    input::placeholder {
        color: var(--gray-700);
    }
`;

export const ButtonForm = styled.button`
    height: 35px;
    background-color: var(--green-500);
    color: #fff;
    font-size: 1.25em;
    font-weight: 700;
    border-radius: 5px;
    border: 0px;

    transition:  0.2s background-color ease-in-out ;

    @media screen and (max-width: 450px){
        min-width: 200px;
        font-size: 1em;
    }

    :hover {
        background-color: var(--green-600);
    }
`;

export const ParagraphForm = styled.label`
    color: var(--gray-700);
    text-align: center;

    a {
        text-decoration: none;
    }
`;