import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;

    a{
        align-self: start;
        color: inherit;
    }

`;

export const ContainerBook = styled.div`
    display: flex;
    margin-top: 34px;
    gap: 40px;

    .book-cover {
        width: 327px;
        height: 497px;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: column;
        align-items: center;
        margin: 0;

        .book-cover {
            width: 80%;
            height: 90%;
        }
    }
`;

export const CardInfo = styled.div`
    width: 600px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${props => props.theme.colors.gray[300]};
    border-radius: 10px;
    box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);

    @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 95%;
        min-width: 300px;
        padding: 32px;
    }
`;

export const ContainerButtons = styled.div`
    width: 100%;
    display: flex ;
    gap: 25px;

    button{
        width: 50%;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        button{
            width: 100%;
        }
    }
`;

export const Detail = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;

    label{
        width: 58px;
    }
    p{
        width: 90%;
    }
`;

export const ContainerDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;