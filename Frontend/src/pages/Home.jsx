import React from 'react';
import { Footer } from '../components/Footer/index';
import { Nav } from "../components/NavBar/index";
import { MainHome, 
  TitleCarousel,
  Card,
  TitleBook,
  AuthorName,
  PriceBook,
  ButtonAddToCart,
  ContainerCarousel,
} from '../styles/Home';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
// import './App.css'

// import required modules
import { Pagination, Navigation } from "swiper";

export const Home = () => {
  return(
      
    <main>
      <Nav></Nav>


      <MainHome>
        <img className='banner' src='/images/banner.png'></img>

        <TitleCarousel>Best Sellers of the Week</TitleCarousel>
        
        <ContainerCarousel>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            >
            
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card>
                <img className='book' src='images/book.png'></img>
                <TitleBook>What I Lerned from the Trees</TitleBook>
                <AuthorName>L.E. Bowman</AuthorName>
                <PriceBook>$ 20.00</PriceBook>
                <ButtonAddToCart>Add to Cart</ButtonAddToCart>
              </Card>
            </SwiperSlide>
            
          </Swiper>
        </ContainerCarousel>

        <TitleCarousel>On Sale</TitleCarousel>
      </MainHome>

      <Footer/>
    </main>
  )
}