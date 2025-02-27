import React, { useEffect, useState } from 'react';

import { Product,
ContainerInfoProduct,
TitleProduct,
AuthorProduct,
SelectAmount,
PriceProduct,
Button, } from "../styles/CartItem";
 
import { MdClose } from 'react-icons/md'

import { useCart } from '../hooks/useCart';

export const CartItem = ({ item }) => {
  const { deleteCartItem, updateCartItem, getCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleDeleteCartItem = () => {
    getCart()
    deleteCartItem(item.id)
    getCart()
  }

  const handleUpdateCartItemQuantity = (event) => {
    getCart()
    // eslint-disable-next-line
    if (event.target.value == quantity) {
      updateCartItem(item.id, 10)
    }else{
      updateCartItem(item.id, event.target.value)
    }
    getCart()
  }

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])

  return(
    <Product>
      <img src={`http://24.199.78.112:8000/${item.book.cover_url}`} alt="Book cover"></img>
      <ContainerInfoProduct>
        <TitleProduct>{ item.book.title }</TitleProduct>
        <AuthorProduct>{ item.book.author }</AuthorProduct>

        <SelectAmount value={quantity ? quantity : 1} onChange={handleUpdateCartItemQuantity}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={quantity}>10+</option>
        </SelectAmount>

        <PriceProduct>$ { item.book.price }</PriceProduct>
      </ContainerInfoProduct>

      <Button onClick={handleDeleteCartItem}>
        <MdClose color="black" fontSize="1.6em"/>
      </Button>
    </Product>
  );
}