import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 9999;
  top: 0px;
`;

export const UpNav = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
  padding: 0px 70px;
  background-color: ${props => props.theme.colors.green[500]};
  height: 80px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 140px;
    padding: 20px 0px;
    flex-direction: column;
    gap: 20px;
  }
`;

export const DownNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.white};
  padding: 0px 110px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: ${props => props.mobileMenuOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    width: 100%;
    min-height:100vh;
    flex-direction: column;
    background-color: ${props => props.theme.colors.green[800]};
    justify-content: center;
    gap: 20px;
    padding: 20px;

    h2{
      color: ${props => props.theme.colors.white};
    }
  }
`;

export const NavOption = styled.li`
  list-style: none;
  
  a{
    display: flex;
    color: inherit;
    text-align: center;
    padding: 10px 20px
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    h2{
      font-size: ${props => props.theme.fontSizes.xxl}
    }

    h2:hover{
      color: ${props => props.theme.colors.gray[700]};
    }
  }
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;

  :hover {
    cursor: pointer;
  }

  span {
    position: relative;
    border-radius: 50px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.green[800]};
    padding: 0px 5px;
    top: -20px;
    left: -10px;
    width: 100%;
  }
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    position: absolute;
    top: 24px;
    right: 5%;
    gap: 32px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 8px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
  height: 40px;
  background-color: ${ props => props.theme.colors.white };
  border: 1px solid ${ props => props.theme.colors.gray[700] } ;
  border-radius: 20px;
  padding: 0px 18px 0px 24px;

  button{
    display: flex;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 90%;
  }  
`;

export const SearchInput = styled.input`
  height: 100%;
  width: 95%;
  min-width: 200px;
  border: none;
  background-color: transparent;
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1em;
  
  &:focus {
    outline: none;
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    position: absolute;
    top: 16px;
    left: 5% ;
    cursor: pointer;
    z-index: 9999;
  } 
`
