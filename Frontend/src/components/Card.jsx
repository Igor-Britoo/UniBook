import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, H3, Span } from '../styles/styles';
import { ContainerCard } from '../styles/Card';

import { api } from '../lib/axios';

export const Card = ({ISBN, coverUrl ,title, author, price}) => {
  const defaultItem = {
    book: '',
  }

  const [item, setItem] = useState(defaultItem)
  
  const handleAddToCart = (event) => {
    
    let accessToken = localStorage.getItem('access')

    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      event.preventDefault();

      setItem({
        ...item,
        book: ISBN,
      })

      console.log(item)

      api.post('customer-logged/cart/cart-items/create/', item)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
    
  }

  return (
    <Link to={`/books/${ISBN}/`}>
      <ContainerCard>
        <img className='book-cover' src={`http://localhost:8000${coverUrl}`}></img>
        
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