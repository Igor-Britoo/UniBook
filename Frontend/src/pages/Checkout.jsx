import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

import { api } from '../lib/axios'

import { Button, ErrorMessage, H1, H2, H3, H4, Label, Main, Paragraph } from '../styles/styles'
import { Header, UpHeader, DownHeader, Sections, OrderGeneralInfo, OrderSummary, FieldsContainer, FieldContainer, Info, ShippingAddress, TwoInputsContainer, ItemsContainer, CardItem, CardItemInfo, InfoContainer, PaymentMethod } from '../styles/Checkout'
import { InputContainer, InputNumber } from '../styles/Profile'

export const Checkout = () => {
  const defaultErrors = {
    streetName: false,
    houseNumber: false,
    state: false,
    city: false,
  }
  const navigate = useNavigate()
  const { user, isUserLoaded } = useAuth()
  const { cart, isCartLoaded, getCart } = useCart()
  const [shippingAddress, setShippingAddress] = useState(user.address)
  const [errors, setErrors] = useState(defaultErrors)

  const createOrder = async() => {
    await api.post('/customer-logged/orders/create/' , {
      address: shippingAddress,
      create_from_cart_items: true,
    })
    .then(response =>{
      //console.log(response)
      alert('Order created successfully')
    })
    .catch(error => {
      //console.log(error)
      alert('Error')
    })

    getCart()
    navigate('/')
    window.scrollTo(0, 0)
  }

  const handleAddressInput = (event) =>{
    const data = event.target

    if ((data.name === 'state' || data.name === 'house_number') && data.value === ""){
      setShippingAddress({
        ...shippingAddress,
        [data.name] : null,
      })
    }
    else{
      setShippingAddress({
        ...shippingAddress,
        [data.name] : data.value,  
      })
    }
  }

  const handleFinishOrder = () => {
    setErrors(defaultErrors)
    let canSubmit = true

    if ( shippingAddress.state === null || 
        shippingAddress.house_number === null ||
        shippingAddress.city === "" ||
        shippingAddress.street_name === ""
    ){
      canSubmit = false

      if (shippingAddress.state === null){
        setErrors((prevState) => ({
          ...prevState,
          state : true
        }))
      }

      if (shippingAddress.house_number === null){
        setErrors((prevState) => ({
          ...prevState,
          houseNumber : true
        }))
      }

      if (shippingAddress.city === ""){
        setErrors((prevState) => ({
          ...prevState,
          city : true
        }))
      }

      if (shippingAddress.street_name === ""){
        setErrors((prevState) => ({
          ...prevState,
          streetName : true
        }))
      }
    }

    if (canSubmit){
      createOrder()
    }
  }

  if (isCartLoaded && cart.cart_items.length > 0){
    return (
      <>
        <Header>
          <UpHeader>
            <H1 color="white" fontSize='xxxxl'>UniBook</H1>
          </UpHeader>
          <DownHeader>
            <H2 fontSize='xxl' fontWeight="500">Checkout ({1} Item)</H2>
          </DownHeader>
        </Header>

        <Main>
          <Sections>
            <OrderGeneralInfo>
              <Info>
                <H3 fontSize='xxxl' fontWeight="600" className='info-title'>Shipping address</H3>

                <ShippingAddress>
                  <form>

                    <TwoInputsContainer>
                      <InputContainer>
                          <Label fontSize="xxl" fontWeight={600} >Street name:</Label>
                          { errors.streetName ? <ErrorMessage>The street name is required</ErrorMessage> : null }
                          <input type="text" value={shippingAddress.street_name ? shippingAddress.street_name : ""} name="street_name" onChange={handleAddressInput}/>
                      </InputContainer>

                      <InputContainer className="house-number">
                          <Label fontSize="xxl" fontWeight={600} >Number:</Label>
                          { errors.houseNumber ? <ErrorMessage>The house number is required</ErrorMessage> : null }
                          <InputNumber value={shippingAddress.house_number ? shippingAddress.house_number : ""} name="house_number" onChange={handleAddressInput}/>
                      </InputContainer>
                    </TwoInputsContainer>

                    <TwoInputsContainer>
                      <InputContainer>
                          <Label fontSize="xxl" fontWeight={600} >State:</Label>
                          { errors.state ? <ErrorMessage>The state is required</ErrorMessage> : null }
                          <select value={shippingAddress.state ? shippingAddress.state  : ""} name="state" onChange={handleAddressInput}>
                              <option value=""></option>
                              <option value="AC">Acre</option>
                              <option value="AL">Alagoas</option>
                              <option value="AP">Amapá</option>
                              <option value="AM">Amazonas</option>
                              <option value="BA">Bahia</option>
                              <option value="CE">Ceará</option>
                              <option value="DF">Distrito Federal</option>
                              <option value="ES">Espírito Santo</option>
                              <option value="GO">Goiás</option>
                              <option value="MA">Maranhão</option>
                              <option value="MT">Mato Grosso</option>
                              <option value="MS">Mato Grosso do Sul</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="PA">Pará</option>
                              <option value="PB">Paraíba</option>
                              <option value="PR">Paraná</option>
                              <option value="PE">Pernambuco</option>
                              <option value="PI">Piauí</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="RN">Rio Grande do Norte</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="RO">Rondônia</option>
                              <option value="RR">Roraima</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="SP">São Paulo</option>
                              <option value="SE">Sergipe</option>
                              <option value="TO">Tocantins</option>
                          </select>
                      </InputContainer>

                      <InputContainer>
                          <Label fontSize="xxl" fontWeight={600} >City:</Label>
                          { errors.city ? <ErrorMessage>The city is required</ErrorMessage> : null }
                          <input type="text" value={shippingAddress.city ? shippingAddress.city : ""} name="city" onChange={handleAddressInput}/>
                      </InputContainer>
                    </TwoInputsContainer>

                  </form>  

                  {/*<Button fontSize="xxl" height="40px" >Save</Button>*/}
                </ShippingAddress>
              </Info>

              {/*
              <Info>
                <H3 fontSize='xxxl' fontWeight="600" className='info-title'>Payment method</H3>
                <PaymentMethod>
                  
                </PaymentMethod>
              </Info>
              */}      

              <Info>
                <H3 fontSize='xxxl' fontWeight="600" className='info-title'>Items</H3>

                <ItemsContainer>
                  {
                  isCartLoaded && 
                  cart.cart_items.map((item, index) => 

                  <CardItem key={index}>
                    <img className='book-cover' src={`http://localhost:8000${ item.book.cover_url}`}></img>

                    <CardItemInfo>
                        <H3 fontSize="xl" fontWeight={600} >{ item.book.title }</H3>

                        <InfoContainer>
                            <div>
                                <H4 fontSize="lg" fontWeight={400} ><strong>Author:</strong> { item.book.author }</H4>
                                <H4 fontSize="lg" fontWeight={400} ><strong>Publication year:</strong> { item.book.publication_year }</H4>
                                <H4 fontSize="lg" fontWeight={400} ><strong>ISBN:</strong> { item.book.ISBN }</H4>
                            </div>

                            <div>
                                <H4 fontSize="lg" fontWeight={400} ><strong>Unit price:</strong> $ { item.book.price }</H4>
                                <H4 fontSize="lg" fontWeight={400} ><strong>Quantity:</strong> { item.quantity }</H4>
                                <H4 fontSize="lg" fontWeight={400} ><strong>Subtotal:</strong> $ { (item.quantity * item.book.price).toFixed(2) }</H4>
                            </div>
                        </InfoContainer>
                    </CardItemInfo>
                  </CardItem>
                    
                  )}
                </ItemsContainer>
              </Info>

            </OrderGeneralInfo>

            <OrderSummary>
              <Button onClick={handleFinishOrder}>
                Finish order
              </Button>

              <Paragraph textAlign="center" fontSize="sm">
                When placing your order, you agree to UniBook's Terms of Use.
              </Paragraph>

              <H3 fontSize='xl' fontWeight="500">Order summary</H3>

              <FieldsContainer>
                <FieldContainer>
                  <Label fontWeight="500" >Items: </Label>
                  <Paragraph fontSize="md" fontWeight="500" textAlign="justify"> $ {(cart.price).toFixed(2)} </Paragraph>
                </FieldContainer>

                <FieldContainer>
                  <Label fontWeight="500" >Delivery: </Label>
                  <Paragraph fontSize="md" fontWeight="500" textAlign="justify"> $ {(0).toFixed(2)} </Paragraph>
                </FieldContainer>

                <FieldContainer>
                  <Label fontWeight="500" >Total: </Label>
                  <Paragraph fontSize="md" fontWeight="500" textAlign="justify"> $ {(cart.price).toFixed(2)} </Paragraph>
                </FieldContainer>
              </FieldsContainer>

            </OrderSummary>
          </Sections>
        </Main>
      </>
    )
  }

  else if (isCartLoaded){
    return <Navigate to='../' replace={true}/>
  }

}
