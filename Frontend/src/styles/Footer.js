import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
`;

export const UpFooter = styled.div`
  width: 100%;
  height: 94px;
  padding: 0px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.green[500] };

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 120px;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 0px;
  } 
`;

export const Social = styled.div`
  display: flex;
  gap: 35px;
`;

export const DownFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 330px;
  padding: 50px 150px;
  gap: 50px;
  background-color: ${props => props.theme.colors.green[800]};

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
    min-height: 750px;
  }  
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 33.3%;
  min-width: 250px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 100%;
    min-width: 300px;
    align-items: center;
  }  
`;

export const SectionsContainer = styled.div`
  display: flex;
  gap: 100px; 
`;

export const CardFlags = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
  }  
`;