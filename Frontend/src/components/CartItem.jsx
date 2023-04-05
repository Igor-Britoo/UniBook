import React, { useEffect, useState } from 'react';

import { Product,
ContainerInfoProduct,
TitleProduct,
AuthorProduct,
SelectAmount,
PriceProduct,
Button, } from "../styles/CartItem";
 

import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";

import { api } from '../lib/axios'

import { useCart } from '../hooks/useCart';

export const CartItem = ({ item }) => {
  const { deleteCartItem } = useCart()

  useEffect(() => {
    //fetchData();
  }, [])

  return(
    <Product>
          <img src={`http://localhost:8000/${item.book.cover_url}`} alt="book"></img>
          <ContainerInfoProduct>
            <TitleProduct>
              { item.book.title }
            </TitleProduct>
            <AuthorProduct>
              { item.book.author }
            </AuthorProduct>

            <SelectAmount>
              <option value={1} selected>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </SelectAmount>
            <div className='row'>

            </div>

            <PriceProduct>$ { item.book.price }</PriceProduct>
          </ContainerInfoProduct>
          <Button onClick={() => deleteCartItem(item.id)}>
            <FaTimes color="black" fontSize="1.4em"/>
          </Button>
        </Product>
  );
}