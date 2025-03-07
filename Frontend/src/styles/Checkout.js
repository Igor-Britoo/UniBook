import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 9999;
  top: 0px;
`

export const UpHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.colors.green[500]};
  display: flex;
  align-items: center;
  padding: 0px 70px;
`

export const DownHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.white};
  padding: 10px 110px;

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 10px 0px;
  }
`

export const Sections= styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  max-width: 1586px;
  justify-content: center;

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

export const OrderSummary= styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  padding: 20px 18px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);
  height: fit-content;
  width: 20%;
  min-width: 200px;
  gap: 8px;

  h3{
    margin-top: 12px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`

export const FieldsContainer= styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FieldContainer= styled.div`
  display: flex;
  justify-content: space-between;
`

export const OrderGeneralInfo= styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 50px;
`

export const Info = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;

  .info-title{
    min-width: fit-content;
    width: 250px;
    text-align: end;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    flex-direction: column;

    .info-title{
      width: fit-content;
      text-align: start;
    }
  }
`

export const ShippingAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  min-height: fit-content;
  width: 80%;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
  padding: 40px 28px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);
  
  form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  input, select{
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 0px;
    background-color: ${props => props.theme.colors.gray[500]};
    font-size: ${props => props.theme.fontSizes.xxl};
    padding: 0px 20px;
  }

  button{
    width: 100%;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    width: 100%;
  }

`

export const TwoInputsContainer = styled.div`
  display: flex;
  gap: 32px;

  .house-number{
    width: 20%;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    flex-direction: column;

    .house-number{
      width: 100%;
    }
  }
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  width: 80%;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
  padding: 40px 28px;
  gap: 50px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    width: 100%;
  }
`

export const CardItem = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  img{
    width: 150px;
    height: 225px;
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
  padding-right: 28px;
  justify-content: space-between;
  flex-direction: column;
  gap: 5px;

  div{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`

export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  width: 80%;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
  padding: 40px 28px;
  gap: 50px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}){
    width: 100%;
  }
`