import React, { createContext, useState, useEffect } from "react";

import { api } from "../lib/axios";

import { useAuth } from "../hooks/useAuth"

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const { user, isUserLoaded } = useAuth()
    const [isCartLoaded, setIsCartLoaded] = useState(false)
    const [cart, setCart] = useState({})

    const getCart = async() => {
        let accessToken = localStorage.getItem('access')

        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    
          await api.get('customer-logged/cart/')
          .then( response => {
            console.log(response.data.cart)
            setCart(response.data.cart)
          })
          .catch( error => {
            //console.log(error)
          })
        }
    }

    const createCartItem = async(bookISBN) => {
        let accessToken = localStorage.getItem('access')

        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    
          await api.post('customer-logged/cart/cart-items/create/', {
            book: bookISBN,
          })
          .then(response => {
            console.log(response.data, response.status)
          })
          .catch(error => {
            //console.log(error)
          })
        } 
    }

    const updateCartItem = async(cartItemID, newQuantity) => {
        let accessToken = localStorage.getItem('access')

        if (accessToken) {
            await api.patch(`customer-logged/cart/cart-items/${cartItemID}/update/`, {
                quantity: newQuantity
            })
            .then(response => {
                //console.log(response.data, response.status)
            })
            .catch(error => {
                //console.log(error)
            })
        } 
    }

    const deleteCartItem = async(cartItemID) => {
        let accessToken = localStorage.getItem('access')

        if (accessToken) {
            await api.delete(`customer-logged/cart/cart-items/${cartItemID}/delete/`)
            .then(response => {
                console.log(response.data, response.status)
              })
              .catch(error => {
                //console.log(error)
              })
        } 
    }
    
    useEffect(() => {
        getCart()
        /* TESTE
            createCartItem("2145820837329")
            updateCartItem(5, 2) 
            deleteCartItem(5)
        */

        // eslint-disable-next-line
    }, [])
    
    return (
        <CartContext.Provider value = {{ getCart, createCartItem, updateCartItem, deleteCartItem, cart, isCartLoaded }}>
            {children}
        </CartContext.Provider>
    )
}