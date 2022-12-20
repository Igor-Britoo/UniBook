import styled from 'styled-components';

export const NavBar = styled.div`
  width: 100%;
  height: 155px;

  @media screen and (max-width: 850px) {
    display: none;
  }
`;

export const UpNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 101px;
  background-color: #619885;
  
  /* @media screen and (max-width: 1440px) {
    display: flex;
    justify-content: initial;
  } */

  .buttons {
    display: flex;
    gap: 52px;

    @media screen and (max-width: 1000px) {
      gap: 18px;
    }
  }
`;

export const DownNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 120px;
  height: 54px;

  @media screen and (max-width: 1200px) {
    gap: 100px;
  }

  @media screen and (max-width: 1000px) {
    gap: 70px;
  }
`;

export const Logo = styled.h2`
  font-size: 48px;
  color: #FFFFFF;
  font-weight: 500;

  @media screen and (max-width: 1000px) {
    font-size: 38px;
  }
`;

export const Form = styled.form`
  display: flex;

  
`;

export const Input = styled.input`
  width: 524px;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #9D9F9E;
  position: absolute;

  ::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #9D9F9E;
    padding-left: 26px;
  }

  :focus {
    padding-left: 26px;
  }
`;

export const Search = styled.button`
  border: none;
  background: transparent;
  position: relative;
  margin-left: 480px;
  margin-top: 9px;

  :hover {
    cursor: pointer;
  }
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;

  :hover {
    cursor: pointer;
  }
`;

export const Option = styled.h3`
  font-size: 24px;
  font-weight: 500;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

// MOBILE
export const MobileNavBar = styled.div`
  display: none;

  @media screen and (max-width: 850px){
    display: flex;
    width: 100%;
    height: 101px;
    background-color: black;

  }
`;