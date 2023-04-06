import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaTimes } from "react-icons/fa";

import { ContainerCart,
UpCart,
TitleCart,
DownCart,
TextDownCart,
BuyButton, } from "../styles/Cart";

import { CartItem } from "./CartItem";

import {useAuth} from '../hooks/useAuth'
import { useCart } from '../hooks/useCart';

export const Cart = ({cartActive, setCartMode}) => {
  const { cart, getCart } = useCart()
  const {user, isUserLoaded} = useAuth()
  const userLoggedIn = Boolean(user.name) === true

  useEffect(() => {
    getCart()
    console.log(cart)
  }, [cartActive])

  if (cartActive) {
    return (
      <ContainerCart>
        <div>
          <UpCart>
            <div className="row-icon-text">

            <FaShoppingCart color="white" fontSize="2.4em"/>
            <TitleCart>Cart</TitleCart>
            </div>
            <FaTimes color="black" fontSize="2.4em" onClick={() => setCartMode(false)} className='close-cart'/>

          </UpCart>
          {cart.cart_items.map((item, index) => 
          <CartItem item={item} key={index}/>
          )}

        </div>

        {  
        isUserLoaded && userLoggedIn ?
          <DownCart>
            <div className="row-text-down-cart">

              <TextDownCart>Total</TextDownCart>
              <TextDownCart>${ cart.price.toFixed(2) }</TextDownCart>
            </div>

            <BuyButton>Buy</BuyButton>
          </DownCart>

          :

          <h3>You need to be logged to see your cart</h3>
        }

      </ContainerCart>
    )
  } 
}