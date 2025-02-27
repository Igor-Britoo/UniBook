import React from 'react';
import { Link } from 'react-router-dom';
import { Button, H3, Span } from '../styles/styles';
import { ContainerCard } from '../styles/Card';

import { useCart } from '../hooks/useCart'

export const Card = ({ISBN, coverUrl ,title, author, price}) => {
  const { createCartItem, getCart } = useCart()
  
  const handleAddToCart = (event) => {
    event.preventDefault()
    getCart()
    createCartItem(ISBN)
    getCart()
  }

  return (
    <Link to={`/books/${ISBN}/`}>
      <ContainerCard>
        <img className='book-cover' src={`http://24.199.78.112:8000${coverUrl}`} alt="Book cover"></img>
        
        <div className='title-author'>
          <H3 fontSize="sm" fontWeight="600" maxChars={20}>{ title }</H3>
          <Span fontSize="sm" fontWeight="400" maxChars={20}>{ author }</Span>
        </div>

        <Span fontSize="md" fontWeight="700">$ { price }</Span>

        <Button height="30px" fontSize="sm" onClick={handleAddToCart}>Add to Cart</Button>
      </ContainerCard>
    </Link>
  );
}