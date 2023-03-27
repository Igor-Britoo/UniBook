import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  gap: 50px;
  height: fit-content;
  justify-content: center;
`

export const ProfileNav = styled.ul`
  width: 120px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li{
    display: flex;
    gap: 20px
  }

  div{
    width:6px;
    height: 48px;
    background-color: ${props => props.theme.colors.green[500]}
  };

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`