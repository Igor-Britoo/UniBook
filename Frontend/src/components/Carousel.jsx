import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Card } from './Card';
import { ContainerCarousel } from '../styles/Carousel';
import { ArrowButton } from '../styles/Carousel';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export const Carousel = ({ books , carouselClassName}) => {
  return (
    <>
      <ContainerCarousel>
        <ArrowButton className={`swiper-button-prev-${carouselClassName}`}>
          <FaArrowLeft color="#1C3333" fontSize="2.5em"/>
        </ArrowButton>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: `.swiper-button-next-${carouselClassName}`,
            prevEl: `.swiper-button-prev-${carouselClassName}`
          }}
          breakpoints={{
            1024: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
          }}
          modules={[Pagination, Navigation]}
          className={carouselClassName}
        >
          
          { books.map((book, index) =>
            <SwiperSlide key={index}>
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            </SwiperSlide>
          )} 

        </Swiper>

        <ArrowButton className={`swiper-button-next-${carouselClassName}`}>
          <FaArrowRight color="#1C3333" fontSize="2.5em"/>
        </ArrowButton>
      </ContainerCarousel>
    </>
  );
}

