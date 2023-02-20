import styled from 'styled-components';

export const NavbarContainer = styled.div`
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
  position: fixed;
  top: 0px;
`;

export const UpNav = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-around;
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
    display:none
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
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;

  :hover {
    cursor: pointer;
  }
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
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
  padding: 0 24px;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 70%;
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