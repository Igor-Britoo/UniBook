import styled from "styled-components";

export const MainHome = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #F5F5F5;

    .banner {
        margin-top: 55px;
    }


`;

export const TitleCarousel = styled.h2`
    display: flex;
    align-self: flex-start;
    margin-top: 73px;
    margin-left: 132px;
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 700;
    color: #1C3333;
`;

export const ContainerCarousel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .swiper {
    width: 80%;
    height: 325px;
    }
    
    .swiper-button-prev {
        margin-left: 100px;
        background-color: #619885;
        border-radius: 50%;
        margin-top: 200px !important;
        color: black !important;
        width: 64px !important; 
        height: 64px !important;
        background-image: url('./images/arrow-left.svg');
        background-repeat: no-repeat;
        background-position: center;
    }

    .swiper-button-next {
        margin-right: 100px;
        background-color: #619885;
        border-radius: 50%;
        margin-top: 200px !important;
        color: black !important;
        width: 64px !important;
        height: 64px !important;
        background-image: url('./images/arrow-right.svg');
        background-repeat: no-repeat;
        background-position: center;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        display: none;
    }


    .swiper-pagination-bullets {
        display: none;
    }
`;

export const Card = styled.div`
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