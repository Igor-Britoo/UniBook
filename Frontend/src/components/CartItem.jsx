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

export const CartItem = ({ item }) => {
  const [infoBook, setInfoBook] = useState({ book: [] })

  const fetchData = async() => {
    await api.get(`books/${item.book}/`)
    .then( response => {
      // console.log(response.data)
      setInfoBook(response.data)
    })
    .catch( error => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  function refreshPage() {
    window.location.reload();
  }
    

  const handleRemoveToCart = async(event) => {
    // event.preventDefault();
    await api.delete(`customer-logged/cart/cart-items/${item.id}/delete/`)

    refreshPage()
  }
  return(
    <Product>
          <img src={`http://localhost:8000/${infoBook.book.cover_url}`} alt="book"></img>
          <ContainerInfoProduct>
            <TitleProduct>
              { infoBook.book.title }
            </TitleProduct>
            <AuthorProduct>
              { infoBook.book.author }
            </AuthorProduct>

            {/* <SelectAmount>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3} >3</option>
              <option value={4} selected>4</option>
              <option value={5}>5</option>
            </SelectAmount> */}
            <div className='row'>

            <FaMinus color='black' fontSize='0.8em'/>
            <p>{ item.quantity }</p>
            <FaPlus color='black' fontSize='0.8em'/>
            </div>

            <PriceProduct>$ { item.price.toFixed(2) }</PriceProduct>
          </ContainerInfoProduct>
          <Button onClick={handleRemoveToCart}>
            <FaTimes color="black" fontSize="1.4em"/>
          </Button>
        </Product>
  );
}