import React from 'react';
import { Card } from './Card';
import { ContainerCarousel } from '../styles/Carousel';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
// import './App.css'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export const Carousel = ({ books }) => {
  return (
    <>
      <ContainerCarousel>

        <div className="swiper-button-prev-most"></div>
        <Swiper
          slidesPerView={5}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next-most',
            prevEl: '.swiper-button-prev-most'
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          
        { books.map((book, index) =>
            <SwiperSlide><Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} /></SwiperSlide>
        )}
          
        </Swiper>
        <div className="swiper-button-next-most"></div>

      </ContainerCarousel>
    </>
  );
}

