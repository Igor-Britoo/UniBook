import styled from "styled-components";

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 207px;
    height: 317px;
    border-radius: 10px;
    background-color: #F7F7F7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .book {
        margin-top: 10px;
    }
`;

export const TitleBook = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #1C3333;
    margin-top: 12px;
`;

export const AuthorName = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #1C3333;
`;

export const PriceBook = styled.p`
    font-size: 14px;
    font-weight: 700;
    color: #1C3333;
    margin-top: 8px;
`;

export const ButtonAddToCart = styled.button`
    width: 172px;
    height: 30px;
    border-radius: 5px;
    background-color: #619885;
    color: #FFFFFF;
    margin-top: 16px;
    border: transparent;
`;