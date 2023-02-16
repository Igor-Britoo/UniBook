import styled from "styled-components";

export const MainBook = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 86px;
    background-color: #F5F5F5;
`;
export const BackHome = styled.div`
    display: flex;
    align-self: flex-start;
    align-items: center;
    margin-left: 45px;
    margin-top: 37px;

    .back {
        font-size: 24px;
        font-weight: 600;
        color: #619885;
        margin-left: 7px;
    }
`;

export const Categories = styled.p`
    font-size: 28px;
    font-weight: 600;
    color: #1C3333;
    margin-top: 19px;
`;

export const ContainerBook = styled.div`
    display: flex;
    margin-top: 34px;

    .img_book {
        width: 327px;
        height: 497px;
        margin-right: 54px;
    }
`;

export const CardInfo = styled.div`
    background-color: #F3F3F3;
    width: 587px;
    height: 769px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #1C3333;
    margin-left: 41px;
    margin-top: 32px;
`;

export const Author = styled.h2`
    font-size: 20px;
    font-weight: 400;
    color: #1C3333;
    margin-left: 41px;
`;

export const Price = styled.p`
    font-size: 32px;
    font-weight: 600;
    color: #1C3333;
    margin-left: 41px;
    margin-top: 17px;
`;

export const ContainerButtons = styled.div`
    display: flex;
    gap: 25px;
    margin-top: 21px;
    margin-left: 41px;
`;

export const AddButton = styled.button`
    width: 240px;
    height: 31px;
    background-color: #619885;
    border-radius: 5px;
    color: #FFFFFF;
    border: transparent;
`;

export const BuyButton = styled.button`
    width: 240px;
    height: 31px;
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #619885;
    border: 1px solid #619885
`;

export const TitleDescription = styled.p`
    font-size: 22px;
    font-weight: 600;
    color: #1C3333;
    margin-left: 41px;
    margin-top: 44px;
`;

export const TextDescription = styled.p`
    font-size: 16px;
    font-weight: 400;
    margin-left: 41px;
    margin-right: 41px;
    margin-top: 14px;
`;

export const TitleProduct = styled.p`
font-size: 22px;
    font-weight: 600;
    color: #1C3333;
    margin-left: 41px;
    margin-top: 21px; 
    margin-bottom: 14px;
`;

export const ContainerDetails = styled.p`
    display: flex;
    justify-content: space-between;
    width: 100px;
    /* gap: 17px; */
    /* margin-top: 14px; */
    margin-left: 41px;
`;

export const Details = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #1C3333;
`;

export const TextDetails = styled.p`
    font-size: 16px;
    font-weight: 300;
    color: #1C3333;
`;