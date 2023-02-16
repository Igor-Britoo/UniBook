import React from 'react';
import { ContainerCard,
  TitleBook,
  AuthorName,
  PriceBook,
  ButtonAddToCart,} from './style';

export const Card = () => {
  return (
    <>
      <ContainerCard>
        <img className='book' src='images/book.png'></img>
        <TitleBook>What I Lerned from the Trees</TitleBook>
        <AuthorName>L.E. Bowman</AuthorName>
        <PriceBook>$ 20.00</PriceBook>
        <ButtonAddToCart>Add to Cart</ButtonAddToCart>
      </ContainerCard>
    </>
  );
}