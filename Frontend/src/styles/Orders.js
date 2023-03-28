import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 80%;
  max-width: 1024px;
  min-height: fit-content;
  align-items: center;

  button{
    width: 240px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;