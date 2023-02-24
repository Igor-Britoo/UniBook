import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 90px;
  align-items: center;
  padding: 50px 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 1108px;

  @media screen and (max-width: ${props => props.theme.breakpoints.xl}){
    width: 916px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    width: 724px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}){
    width: 532px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}){
    width: 308px;
  }
`;