import React from 'react';
import { Footer } from '../components/Footer/index';
import { Nav } from "../components/NavBar/index";
import { MainHome, TitleCarousel,} from '../styles/Home';
import { CarouselBest } from '../components/CarouselBest';
import { CarouselOnSale } from '../components/CarouselOnSale';
import { CarouselMost } from '../components/CarouselMost';

export const Home = () => {
  return(
      
    <main>
      <Nav></Nav>


      <MainHome>
        <img className='banner' src='/images/banner.png' alt='banner'></img>

        <TitleCarousel>Best Sellers of the Week</TitleCarousel>
        <CarouselBest/>

        <TitleCarousel>On Sale</TitleCarousel>
        <CarouselOnSale/>

        <TitleCarousel>Most Viewed</TitleCarousel>
        <CarouselMost/>

      </MainHome>

      <Footer/>
    </main>
  )
}