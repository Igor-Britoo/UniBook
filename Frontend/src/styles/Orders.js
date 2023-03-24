import styled from "styled-components";

export const ContainerOrders = styled.div`
  width: 100%;
  height: 100vh;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  align-items: flex-start;
`;

export const ContainerCard = styled.div`
  display: flex;
  margin-top: 130px;
  gap: 54px;

  .position-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 80%;
  }
`;

export const Card = styled.div`
  background-color: white;
  padding: 16px 90px 22px 38px;
  border-radius: 10px;
  width: 80%;
`;

export const Text = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #1C3333;
`;

export const RowOrderStatus = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowBook = styled.div`
  display: flex;
  gap: 28px;
  margin-top: 13px;

  .img {
    height: 174px;
    width: 115px;
  }
`;

export const Author = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #1C3333;
  margin-top: 16px;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #1C3333;
  margin-top: 8px;
`;

export const Buyer = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-top: 26px;
`;

export const SeeMoreButton = styled.button`
  width: 240px;
  height: 31px;
  border-radius: 5px;
  border: transparent;
  color: white;
  font-size: 16px;
  font-weight: 700;
  background-color: #619885;
  margin-top: 96px;
`;