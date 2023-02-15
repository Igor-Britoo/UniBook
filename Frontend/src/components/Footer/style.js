import styled from "styled-components";

export const UpFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 94px;
  background-color: #619885;
`;

export const Logo = styled.p`
  font-size: 48px;
  color: #FFFFFF;
  font-weight: 500;
  margin-left: 101px;
`;

export const Social = styled.div`
  display: flex;
  gap: 35px;
  margin-right: 101px;
`;

export const DownFooter = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 330px;
  background-color: #1C3333;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    height: 800px;
  }
`;

export const Sections = styled.div`
  margin-top: 47px;

  .spacing {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const TitleSections = styled.p`
  font-size: 28px;
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 31px;
`;

export const TextSections = styled.p`
  font-size: 24px;
  color: #FFFFFF;
  font-weight: 400;
`;

export const RowCards = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 25px;
`;