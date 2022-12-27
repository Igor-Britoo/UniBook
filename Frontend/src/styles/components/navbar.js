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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);


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

  // Centralizing logo in mobile navbar
  @media screen and (max-width: 850px) {
    margin-left: 25px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 0px 20px;

  @media screen and (max-width: 850px) {
    min-width: 100px;
  }
  
`;

export const Input = styled.input`
  width: 468px;
  height: 38px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px solid #9D9F9E;
  border-right: none;

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
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  height: 38px;
  width: 56px;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid #9D9F9E;
  border-left: none;


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
    flex-direction: column;
    width: 100%;
    height: 110px;
    background-color: #619885;
  }
`;

export const MobileUpNav = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-around;
  align-items: center;

  .buttons {
    display: flex;
    gap: 5px;
  }
`;

export const MobileDownNav = styled.div`
  display: flex;
  justify-content: center;
`;

export const MobileScreamExtended = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ShowButton = styled.button`
  background: transparent;
  border: none;
`;

export const HideButton = styled.button`
  background: transparent;
  border: none;
  margin-right: 20px;
`;

export const AccountButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #619885;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;

  h3 {
    display: flex;
    margin-left: 20px;
    font-size: 24px;
    font-weight: 400;
    color: #1C3333;
  }
`;

export const SideOption = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  width: 50%;
  border-bottom: 1px solid black;
  
  p {

    font-size: 20px;
    font-weight: 400;
    color: #767D7B;
  }
`;