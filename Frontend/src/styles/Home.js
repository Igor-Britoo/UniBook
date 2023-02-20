import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 90px;
  align-items: center;
  padding: 50px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ArrowButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50px;
  border: none;
  background-color: ${props => props.theme.colors.green[500]};
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  align-self: center;
  transition:  0.2s background-color ease-in-out ;


  :hover{
    background-color: ${props => props.theme.colors.green[600]};
  }

`;