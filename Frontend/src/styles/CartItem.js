import styled from "styled-components";

export const Product = styled.div`
  display: flex;
  padding: 40px 16px;
  border-bottom: 1px solid black;

  img{
    max-width: 100px;
    max-height: 150px;
  }
`;

export const ContainerInfoProduct = styled.div`
  margin-left: 12px;
  margin-right: 14px;

  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 16px;

    p {
      padding: 5xp;
    }
  }
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

export const Button = styled.button`
  display: flex;
  align-items: center;
  width: 1.4em;
  height: 1.4em;
  border: none;
`;