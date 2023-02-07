import styled from "styled-components";
export const StyledText = styled.footer`
    width: 100%;
    /* height: 100vh; */
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
`;

export const ContainerSections = styled.div`
    width: 1024px;
    height: 395px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 207px;
    height: 317px;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin-top: 40px;

    img {
        height: 174.4px;
        width: 114.49px;
    }
`;

export const TitleBook = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #1C3333;
`;