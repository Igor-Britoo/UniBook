import React from 'react';
import { Footer } from '../components/Footer/index';
import { Nav } from "../components/NavBar/index";
import { StyledText, 
  TitlesHome,
  ContainerSections,
  Card,
  TitleBook, } from '../components/MainPageComponents';

export const Home = () => {
  return(
    <main>
      <Nav></Nav>
  
      <StyledText>
        <img src='/images/banner.png'></img>
        <ContainerSections>
          <TitlesHome>Best Sellers of the Week</TitlesHome>
          <Card>
            <img src='./images/book.png'></img>
            <TitleBook>What I Learned from the Trees</TitleBook>
          </Card>
        </ContainerSections>

        <ContainerSections>
          <TitlesHome>On Sale</TitlesHome>
        </ContainerSections>

        <ContainerSections>
          <TitlesHome>Most Viewed</TitlesHome>
        </ContainerSections>
      </StyledText>

      <Footer/>
    </main>
  )
}