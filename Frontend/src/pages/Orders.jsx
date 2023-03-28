import React, { useEffect, useState } from 'react';

import { Container, OrdersContainer } from '../styles/Orders';

import { CardOrder } from '../components/CardOrder';

import { api } from '../lib/axios'
import { Button, H3 } from '../styles/styles';

export const Orders = () => {
  const [orders, setOrders] = useState({ orders: [] })
  const [currentPage, setCurrentPage] = useState(1)

  const fetchData = async(page=1) => {
    let accessToken = localStorage.getItem('access')
    
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      await api.get(`customer-logged/orders/?limit=5&offset=${page-1}`)			
      .then( response => {
        //console.log(response.data) 
        const hasNoOrders = response.data.detail
        if (!hasNoOrders){
          const ordersConcat = orders.orders.concat(response.data.orders)
          setOrders({
            ...response.data,
            orders: ordersConcat,
          })							
        }
      })
      .catch(error => {
        //console.log(error)
      })
    }
  }

  const handleSeeMore = () => {
    if (orders.number_of_pages > currentPage){
      fetchData(currentPage+1)
      setCurrentPage(currentPage+1)
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
      { orders.orders.length === 0 || orders.number_of_pages === currentPage?
        <></>
        :
        <Button fontSize="xxl" height="40px" onClick={handleSeeMore}>See more</Button>
      }
      { orders.orders.length === 0 ?
        <H3 fontSize="xxxl" fontWeight={600}>You have no orders yet</H3>
        :
        <></>
      }
    </Container>
    )
}
