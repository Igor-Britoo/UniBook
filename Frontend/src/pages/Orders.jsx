import React, { useEffect, useState } from 'react';

import { api } from '../lib/axios'

import { Main } from "../styles/styles";
import { Back,
TextBack,
PersonalButton,
OrdersButton, } from "../styles/Account";

import { ContainerOrders,
ContainerButtons,
ContainerCard,
SeeMoreButton, } from "../styles/Orders";

import { CardOrder } from '../components/CardOrder';

export const Orders = () => {
  const [orders, setOrders] = useState({ orders: [] })

  const fetchData = async() => {
    let accessToken = localStorage.getItem('access')		// Recupera o token de acesso no localStorage
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`	// Adiciona o token de acesso ao cabeçalho da requisição
      
      await api.get('customer-logged/orders/?limit=20&offset=0')			// Faz a requisição ao endpoint de pedidos do usuario logado
      .then( response => { 
        console.log(response.data)
        setOrders(response.data)							// Seta os pedidos
      })
      .catch(error => {
          console.log(error)
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  return(
    <Main>
      <ContainerOrders>
        <Back>
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.44264 9.38472L8.99661 0.462512C9.58784 -0.154171 10.5439 -0.154171 11.1288 0.462512L12.5503 1.94517C13.1415 2.56186 13.1415 3.55904 12.5503 4.16917L6.49332 10.5L12.5566 16.8243C13.1478 17.441 13.1478 18.4381 12.5566 19.0483L11.1351 20.5375C10.5439 21.1542 9.58784 21.1542 9.0029 20.5375L0.448929 11.6153C-0.148591 10.9986 -0.148591 10.0014 0.44264 9.38472Z" fill="#619885"/>
          </svg>
          <TextBack>Back</TextBack>
        </Back>

        <ContainerCard>

          <ContainerButtons>
            <PersonalButton>Personal Data</PersonalButton>
            <OrdersButton>Orders</OrdersButton>
          </ContainerButtons>
          
          <div className="position-form">
          <CardOrder orders={orders.orders}/>

            <SeeMoreButton>See More</SeeMoreButton>
          </div>

        </ContainerCard>
      </ContainerOrders>
    </Main>
  );
}