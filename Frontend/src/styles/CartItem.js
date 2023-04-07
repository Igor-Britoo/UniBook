import styled from "styled-components";

export const Product = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 16px;
  border-bottom: 1px solid black;
  gap: 14px;

  img{
    max-width: 100px;
    max-height: 150px;
  }

  button{
    cursor: pointer;
  }
`;

export const ContainerInfoProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const TitleProduct = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1C3333;
`;

export const AuthorProduct = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #1C3333;
`;

export const SelectAmount = styled.select`
  width: 45px;
`;

export const PriceProduct = styled.p`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  color: #1C3333;
  margin-top: 33px;
  align-self: flex-end;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  height: 1.8em;
  border: none;
`;