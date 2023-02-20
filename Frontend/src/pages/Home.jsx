import React, { useEffect, useState } from 'react';
import { H2, Main } from '../styles/styles';
import { Container, Section, ArrowButton } from '../styles/Home';

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
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.680984 11.6192L13.8409 0.572634C14.7505 -0.190878 16.2214 -0.190878 17.1213 0.572634L19.3081 2.40831C20.2177 3.17182 20.2177 4.40644 19.3081 5.16182L9.98972 13L19.3178 20.8301C20.2274 21.5936 20.2274 22.8282 19.3178 23.5836L17.1309 25.4274C16.2214 26.1909 14.7505 26.1909 13.8506 25.4274L0.690661 14.3808C-0.228601 13.6173 -0.228601 12.3827 0.680984 11.6192Z" fill="black"/>
              </svg>
            </ArrowButton>

            { bestSellers.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3187 14.3808L6.15236 25.4274C5.24233 26.1909 3.7708 26.1909 2.87045 25.4274L0.682519 23.5917C-0.227506 22.8282 -0.227506 21.5936 0.682519 20.8382L10.0151 13.0081L0.682519 5.17807C-0.227506 4.41456 -0.227506 3.17994 0.682519 2.42456L2.86077 0.572634C3.7708 -0.190878 5.24233 -0.190878 6.14267 0.572634L19.309 11.6192C20.2287 12.3827 20.2287 13.6173 19.3187 14.3808Z" fill="black"/>
              </svg>
            </ArrowButton>
          </div>
              
        </Section>
        
        <Section>
          <H2 fontSize="xxl" fontWeight="700" margin="0px 0px 20px 0px ">On Sale</H2>
          
          <div style={{display: "flex", gap:"20px"}}>
            <ArrowButton>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.680984 11.6192L13.8409 0.572634C14.7505 -0.190878 16.2214 -0.190878 17.1213 0.572634L19.3081 2.40831C20.2177 3.17182 20.2177 4.40644 19.3081 5.16182L9.98972 13L19.3178 20.8301C20.2274 21.5936 20.2274 22.8282 19.3178 23.5836L17.1309 25.4274C16.2214 26.1909 14.7505 26.1909 13.8506 25.4274L0.690661 14.3808C-0.228601 13.6173 -0.228601 12.3827 0.680984 11.6192Z" fill="black"/>
              </svg>
            </ArrowButton>

            { onSale.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3187 14.3808L6.15236 25.4274C5.24233 26.1909 3.7708 26.1909 2.87045 25.4274L0.682519 23.5917C-0.227506 22.8282 -0.227506 21.5936 0.682519 20.8382L10.0151 13.0081L0.682519 5.17807C-0.227506 4.41456 -0.227506 3.17994 0.682519 2.42456L2.86077 0.572634C3.7708 -0.190878 5.24233 -0.190878 6.14267 0.572634L19.309 11.6192C20.2287 12.3827 20.2287 13.6173 19.3187 14.3808Z" fill="black"/>
              </svg>
            </ArrowButton>
          </div>
        </Section>

        <Section>
          <H2 fontSize="xxl" fontWeight="700" margin="0px 0px 20px 0px ">Most Viewed</H2>

          <div style={{display: "flex", gap:"20px"}}>
            <ArrowButton>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.680984 11.6192L13.8409 0.572634C14.7505 -0.190878 16.2214 -0.190878 17.1213 0.572634L19.3081 2.40831C20.2177 3.17182 20.2177 4.40644 19.3081 5.16182L9.98972 13L19.3178 20.8301C20.2274 21.5936 20.2274 22.8282 19.3178 23.5836L17.1309 25.4274C16.2214 26.1909 14.7505 26.1909 13.8506 25.4274L0.690661 14.3808C-0.228601 13.6173 -0.228601 12.3827 0.680984 11.6192Z" fill="black"/>
              </svg>
            </ArrowButton>

            { mostViewed.books.map((book, index) => index < 5 && 
              <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
            )}

            <ArrowButton>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3187 14.3808L6.15236 25.4274C5.24233 26.1909 3.7708 26.1909 2.87045 25.4274L0.682519 23.5917C-0.227506 22.8282 -0.227506 21.5936 0.682519 20.8382L10.0151 13.0081L0.682519 5.17807C-0.227506 4.41456 -0.227506 3.17994 0.682519 2.42456L2.86077 0.572634C3.7708 -0.190878 5.24233 -0.190878 6.14267 0.572634L19.309 11.6192C20.2287 12.3827 20.2287 13.6173 19.3187 14.3808Z" fill="black"/>
              </svg>
            </ArrowButton>
          </div>
        </Section>
      </Container>
    </Main>
  )
}