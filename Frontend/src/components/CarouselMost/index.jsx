import React from 'react';
import { Card } from '../Card';
import { ContainerCarousel } from './style';

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

export const CarouselMost = () => {
  return (
    <>
      <ContainerCarousel>

        <div className="swiper-button-prev-most"></div>
        <Swiper
          slidesPerView={5}
          spaceBetween={50}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next-most',
            prevEl: '.swiper-button-prev-most'
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          >
          
          <SwiperSlide><Card/></SwiperSlide>
          
          <SwiperSlide><Card/></SwiperSlide>
          
          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>
          
          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>

          <SwiperSlide><Card/></SwiperSlide>
          
        </Swiper>
        <div className="swiper-button-next-most"></div>

      </ContainerCarousel>
    </>
  );
}