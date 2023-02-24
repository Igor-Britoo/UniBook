import styled from "styled-components";

export const ContainerCarousel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 16px;

    .swiper-wrapper{
        margin: 0;
        width: 1000px;
        padding: 40px 0;
    }

    .swiper-slide{
        margin: 0;
    }

    .swiper-pagination-bullet{
        background-color: ${props => props.theme.colors.green[600]};
        margin: 0 50px;
    }
`;

export const ArrowButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50px;
  border: none;
  background-color: ${props => props.theme.colors.green[500]};
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  align-self: center;
  transition:  0.2s background-color ease-in-out ;

  :hover{
    background-color: ${props => props.theme.colors.green[600]};
  }
`;