import styled from "styled-components";

export const ContainerCarousel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .swiper {
    width: 70%;
    height: 325px;
    }
    
    .swiper-button-prev-sale {
        position: relative;
        margin-left: 100px;
        background-color: #619885;
        border-radius: 50%;
        color: black !important;
        width: 64px !important; 
        height: 64px !important;
        background-image: url('./images/arrow-left.svg');
        background-repeat: no-repeat;
        background-position: center;
    }

    .swiper-button-next-sale {
        position: relative;
        margin-right: 100px;
        background-color: #619885;
        border-radius: 50%;
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