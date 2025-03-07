import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  background-color: ${ props => props.theme.colors.gray[200]};
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  strong{
    font-weight: 600;
  }
`;

export const CardHeader = styled.div`
  width: 100%;
  padding: 10px 30px;
  border-radius: 10px 10px 0px 0px;
  background-color: ${ props => props.theme.colors.green[500]};
  display: flex;
  justify-content: space-between;
`

export const CardInfo = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;

  a{
    text-decoration: underline;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
`

export const CardItem = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  gap: 30px;
  border-top: 1px solid ${ props => props.theme.colors.green[800]};

  img{
    width: 115px;
    height: 175px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

export const CardItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    align-items: center;
  }
`

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  padding-right: 40px;
  justify-content: space-between;

  div{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding-right: 0;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
`

export const ShippingAddress = styled.div`
  width: 100%;
  padding: 16px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border-top: 1px solid ${ props => props.theme.colors.green[800]};
`