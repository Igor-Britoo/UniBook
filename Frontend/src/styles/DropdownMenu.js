import styled from "styled-components";

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 190px;
  height: fit-content;
  position: absolute;
  right: 133px;
  top: 70px;
  padding: 16px 14px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:before{
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    top: -8px;
    right: 40px;
    background-color: ${props => props.theme.colors.white};
    transform: rotate(45deg);
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    right: 46px;
    top: 50px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    right: 22px;
    top: 50px;
  }
`

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  a {
    color: ${props => props.theme.colors.gray[800]};
    font-size : ${props => props.theme.fontSizes.lg};
  }
  
  div{
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.gray[500]};
    margin: 6px 0px;
  }

`
