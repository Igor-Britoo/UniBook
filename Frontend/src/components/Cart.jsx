import React, { useEffect, useState } from 'react';

import { ContainerCart,
UpCart,
TitleCart,
DownCart,
TextDownCart,
BuyButton, } from "../styles/Cart";

import { FaShoppingCart, FaTimes } from "react-icons/fa";

import { CartItem } from "./CartItem";

import { api } from '../lib/axios'

export const Cart = ({cartActive, setCartMode}) => {
  const [cart, setCart] = useState({ cart: [] })


  const fetchData = async() => {
    let accessToken = localStorage.getItem('access')

    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      await api.get('customer-logged/cart/')
      .then( response => {
        // console.log(response.data)
        setCart(response.data)
      })
      .catch( error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return(
    // eslint-disable-next-line
    cartActive == false ? 
      <></> 
    :
    <ContainerCart>
      <div>
        <UpCart>
          <div className="row-icon-text">

          <FaShoppingCart color="white" fontSize="2.4em"/>
          <TitleCart>Cart</TitleCart>
          </div>
          <FaTimes color="black" fontSize="2.4em" onClick={() => setCartMode(false)}/>
        </UpCart>
          {cart.cart.cart_items.map((item, index) => 
          <CartItem item={item} key={index}/>
          )}
        
      </div>

      <DownCart>
        <div className="row-text-down-cart">

          <TextDownCart>Total</TextDownCart>
          <TextDownCart>$ { cart.cart.price.toFixed(2) }</TextDownCart>
        </div>

        <BuyButton>Buy</BuyButton>
      </DownCart>
      
    </ContainerCart>
  );
}