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