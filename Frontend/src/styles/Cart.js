import styled from "styled-components";

export const ContainerCart = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 350px;
  background-color: #F3F3F3;
  box-shadow: -6px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;

  h3{
    padding: 32px 20px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.colors.green[500]};
  padding: 28px 20px;

  .row-icon-text {
    display: flex;
    gap: 24px;
  }

  .close-cart{
    cursor: pointer;
  }
  
`;

export const TitleCart = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 266px);
  overflow-y: auto;
  margin-right: 4px;
  
    /* For WebKit-based browsers */
    ::-webkit-scrollbar {
      border-radius: 10px; /* radius of the scrollbar track */
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px; /* radius of the scrollbar track */
    }
`

export const DownCart = styled.div`
  width: 350px;
  background-color: ${props => props.theme.colors.gray[300]};
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px 20px;
  position: fixed;
  bottom: 0; 
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .row-text-down-cart {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export const TextDownCart = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.green[800]};
`;

export const BuyButton = styled.button`
  width: 100%;
  height: 77px;
  background-color: ${ props => props.theme.colors.green[500] };
  color: white;
  font-size: 32px;
  border: none;
  cursor: pointer;

  transition:  0.2s background-color ease-in-out ;

  :hover {
    background-color: ${ props => props.theme.colors.green[600] }
  }
`;