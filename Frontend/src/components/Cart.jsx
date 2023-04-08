import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { MdClose } from 'react-icons/md'

import { ContainerCart,
CartHeader,
TitleCart,
DownCart,
TextDownCart,
BuyButton, 
CartItemsContainer} from "../styles/Cart";
import { H3 } from "../styles/styles"

import { CartItem } from "./CartItem";

import {useAuth} from '../hooks/useAuth'
import { useCart } from '../hooks/useCart';

export const Cart = ({cartActive, setCartMode}) => {
  const { cart, isCartLoaded } = useCart()
  const {user, isUserLoaded} = useAuth()
  const userLoggedIn = Boolean(user.name) === true

  if (cartActive) {
    return (
      <ContainerCart>          
        <CartHeader>
          <div className="row-icon-text">
            <FaShoppingCart color="white" fontSize="2.2em"/>
            <TitleCart>Cart</TitleCart>
          </div>
            <MdClose color="black" fontSize="2.8em" onClick={() => setCartMode(false)} className='close-cart'/>
        </CartHeader>

        {
          isUserLoaded && !userLoggedIn &&
          <H3 fontSize="xl" fontWeight={400}>You need to be logged to see your cart items</H3>
        }

        {
          isCartLoaded &&
          <CartItemsContainer>
          {cart.cart_items.map((item, index) => 
            <CartItem item={item} key={index}/>
          )}
          </CartItemsContainer>
        }
          <DownCart>
            <div className="row-text-down-cart">
              <TextDownCart>Total</TextDownCart>
              <TextDownCart>${ cart.price ? (cart.price).toFixed(2) : (0).toFixed(2) }</TextDownCart>
            </div>

            <BuyButton>Buy</BuyButton>
          </DownCart>


      </ContainerCart>
    )
  } 
}