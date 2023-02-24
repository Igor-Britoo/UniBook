import React, { useEffect, useState } from 'react';
import { H2, Main } from '../styles/styles';
import { Container, Section } from '../styles/Home';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import { Card } from '../components/Card';

import { api } from '../lib/axios'
import { Carousel } from '../components/Carousel';

export const Home = () => {
  const [bestSellers, setBestSellers] = useState({ books: [] })
  const [mostViewed, setMostViewed] = useState({ books: [] })
  const [onSale, setOnSale] = useState({ books: [] })

  const fetchData = async() => {
    let bSellers = await api.get('books/best-sellers?limit=20&offset=0').then(response => response.data)
    let mViewed = await api.get('books/most-viewed?limit=20&offset=0').then(response => response.data)
    let oSale = await api.get('books/on-sale?limit=20&offset=0').then(response => response.data)
    
    setBestSellers(bSellers)
    setMostViewed(mViewed)
    setOnSale(oSale)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return(  
    <Main >
      <Container>
        <Section>
          <H2 fontSize="xxl" fontWeight="700" >Best Sellers</H2>
          <Carousel books={bestSellers.books} carouselClassName="best-sellers" />
        </Section>
        
        <Section>
          <H2 fontSize="xxl" fontWeight="700" >On Sale</H2>
          <Carousel books={onSale.books} carouselClassName="on-sale" />
        </Section>

        <Section>
          <H2 fontSize="xxl" fontWeight="700" >Most Viewed</H2>
          <Carousel books={mostViewed.books} carouselClassName="most-viewed" />
        </Section>
      </Container>
    </Main>
  )
}