import styled from "styled-components";
export const StyledText = styled.footer`
    /* width: 100%; */
    height: 200vh;
    background-color: #E3E4E4;
    /* color: var(--green-500); */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 10px solid black; */

    img {
        margin-top: 55px;
    }
`;

export const TitlesHome = styled.h2`
    display: flex;
    align-self: flex-start;
    color: #1C3333;
    font-size: 24px;
    font-weight: 500;
    margin-top: 73px;
    margin-bottom: 40px;
`;

export const ContainerSections = styled.div`
    width: 1024px;
    height: 395px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 207px;
    height: 317px;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin-top: 40px;
    background-image: url("./images/book.png");
    background-repeat: no-repeat;
    background-position: 50px 10px;

    /* img {
        height: 174.4px;
        width: 114.49px;
    } */
`;

export const TitleBook = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #1C3333;
    margin-top: 200px;
`;

export const AuthorName = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #1C3333;
`;

export const Price = styled.p`
    font-size: 14px;
    font-weight: 700;
    color: #1C3333;
`;

export const ButtonAddCart = styled.button`
    height: 30px;
    width: 171px;
    border-radius: 5px;
    background-color: #619885;
    color: #FFFFFF;
    border: transparent
`;

export const RowBooks = styled.div`
    display: flex;
    gap: 13px;
`;