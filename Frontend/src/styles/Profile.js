import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 80%;
  max-width: 1024px;
  min-height: fit-content;
  background-color: ${props => props.theme.colors.white};
  padding: 50px 40px;
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
    align-self: end;
    width: 240px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    padding: 40px 30px;

    button{
      align-self: center;
      width: 100%;
    }
  }
  
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`

export const TwoInputsContainer = styled.div`
  display: flex;
  gap: 32px;

  .house-number{
    width: 20%;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;

    .house-number{
      width: 100%;
    }
  }
`

export const InputNumber = styled.input.attrs({type:"number"})`
  // Hide the arrows 
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`

