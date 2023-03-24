import styled from "styled-components";

export const ContainerCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 350px;
  background-color: #F3F3F3;
  box-shadow: -6px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 999;
`;

export const UpCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 101px;
  background-color: #619885;
  padding: 0px 16px;

  .row-icon-text {
    display: flex;
    gap: 32px;
  }
`;

export const TitleCart = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF;
`;

export const Product = styled.div`
  display: flex;
  padding: 40px 16px;
  border-bottom: 1px solid black;
`;

export const ContainerInfoProduct = styled.div`
  margin-left: 12px;
  margin-right: 14px;
`;

export const TitleProduct = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1C3333;
`;

export const AuthorProduct = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-top: 16px;
  color: #1C3333;
`;

export const SelectAmount = styled.select`
  margin-top: 16px;
`;

export const PriceProduct = styled.p`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  color: #1C3333;
  margin-top: 33px;
  margin-left: 124px;
`;

export const DownCart = styled.div`
  width: 100%;
  height: 187px;
  background-color: #F3F3F3;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  padding: 0px 24px;

  .row-text-down-cart {
    display: flex;
    gap: 180px;
    margin: 21px 0px;
  }
`;

export const TextDownCart = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: black;
`;

export const BuyButton = styled.button`
  width: 300px;
  height: 77px;
  background-color: #619885;
  color: white;
  font-size: 32px;
  border: none;

  :hover {
    cursor: pointer;
  }
`;