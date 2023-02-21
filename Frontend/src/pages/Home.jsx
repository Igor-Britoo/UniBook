import React, { useEffect, useState } from 'react';
import { H2, Main } from '../styles/styles';
import { Container, Section, ArrowButton } from '../styles/Home';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import { Card } from '../components/Card';

import { api } from '../lib/axios'

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
          <H2 fontSize="xxl" fontWeight="700" margin="0px 0px 20px 0px ">Best Sellers</H2>

          <div style={{display: "flex", gap:"20px"}}>
          
            <ArrowButton>
              <FaArrowLeft color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>
            
            { bestSellers.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <FaArrowRight color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>
          </div>
              
        </Section>
        
        <Section>
          <H2 fontSize="xxl" fontWeight="700" margin="0px 0px 20px 0px ">On Sale</H2>
          
          <div style={{display: "flex", gap:"20px"}}>
            <ArrowButton>
              <FaArrowLeft color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>

            { onSale.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <FaArrowRight color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>
          </div>
        </Section>

        <Section>
          <H2 fontSize="xxl" fontWeight="700" margin="0px 0px 20px 0px ">Most Viewed</H2>

          <div style={{display: "flex", gap:"20px"}}>
            <ArrowButton>
              <FaArrowLeft color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>

            { mostViewed.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <FaArrowRight color="#1C3333" fontSize="2.5em"/>
            </ArrowButton>
          </div>
        </Section>
      </Container>
    </Main>
  )
}