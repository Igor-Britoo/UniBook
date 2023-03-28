import React, { useEffect, useState } from 'react';

import { Container, OrdersContainer } from '../styles/Orders';

import { CardOrder } from '../components/CardOrder';

import { api } from '../lib/axios'
import { Button } from '../styles/styles';

export const Orders = () => {
  const [orders, setOrders] = useState({ orders: [] })
  const [currentPage, setCurrentPage] = useState(1)

  const fetchData = async(page=1) => {
    let accessToken = localStorage.getItem('access')
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      
      await api.get(`customer-logged/orders/?limit=20&offset=${page-1}`)			
      .then( response => { 
        //console.log(response.data)
        setOrders(response.data)							
      })
      .catch(error => {
        //console.log(error)
      })
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  return(
    <Container>
      <OrdersContainer>
        {orders.orders.map((order, index) => 
          <CardOrder order={order} key={index} />
        )}
      </OrdersContainer>

      <Button fontSize="xxl" height="40px" >See more</Button>
    </Container>
  )
}