import React, { useState } from "react";
import { Link } from 'react-router-dom'

import { Card, CardHeader, CardInfo, CardItem, CardItemInfo, InfoContainer, ShippingAddress } from "../styles/CardOrder";
import { H3, H4 } from "../styles/styles";

import { api } from "../lib/axios";

export const CardOrder = ({order}) => {
    const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
    const [orderInfo, setOrderInfo] = useState({})

    const getOrderStatus = (statusAcronym) => {
        switch (statusAcronym) {
            case 'P':
                return 'Pending';
            case 'OC':
                return 'Order confirmed';
            case 'PA':
                return 'Payment approved';
            case 'S':
                return 'Shipped';
            case 'T':
                return 'In transit';
            case 'D':
                return 'Delivered';
            case 'C':
                return 'Cancelled';
            default:
                return ''
        }
    }

    const getDate = (date) => {
        return String(date).replace('-', '/').replace('-', '/')
    }

    const fetchData = async() => {
        let accessToken = localStorage.getItem('access')
        if (accessToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            
            await api.get(`customer-logged/orders/${order.code}/`)			
            .then( response => { 
                //console.log(response.data.order)
                setOrderInfo(response.data.order)	
            })
            .catch(error => {
                //console.log(error)
            })
        }
    }

    const handleShowDetails = async() => {
        if (!orderDetailsOpen){
            await fetchData()
            setOrderDetailsOpen(true)

        }else setOrderDetailsOpen(false)

    }

    return(
        <>
            <Card>
                <CardHeader>
                    <H3 fontSize="xl" fontWeight={400} color="white" ><strong>Code:</strong> { order.code }</H3>
                    <H3 fontSize="xl" fontWeight={400} color="white" ><strong>Date:</strong> { getDate(order.date) }</H3>
                </CardHeader>
                <CardInfo>
                    <H3 fontSize="xl" fontWeight={400} ><strong>Price:</strong> $ { order.price }</H3>
                    <H3 fontSize="xl" fontWeight={400} ><strong>Status:</strong> { getOrderStatus(order.status) }</H3>                    
                    <H3 fontSize="xl" fontWeight={600} >
                        <Link onClick={handleShowDetails}>Show details</Link>
                    </H3>
                </CardInfo>

                { orderDetailsOpen ?
                    <>
                        {orderInfo.order_items.map((orderItem, index) => 
                            <CardItem key={index}>
                                <img className='book-cover' alt="book cover" src={`${ orderItem.book.cover_url }`}></img>

                                <CardItemInfo>
                                    <H3 fontSize="xl" fontWeight={600} >{ orderItem.book.title }</H3>

                                    <InfoContainer>
                                        <div>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>Author:</strong> { orderItem.book.author }</H4>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>Publication year:</strong> { orderItem.book.publication_year }</H4>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>ISBN:</strong> { orderItem.book.ISBN }</H4>
                                        </div>

                                        <div>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>Unit price:</strong> $ { orderItem.price }</H4>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>Quantity:</strong> { orderItem.quantity }</H4>
                                            <H4 fontSize="lg" fontWeight={400} ><strong>Subtotal:</strong> $ { (orderItem.quantity * orderItem.price).toFixed(2) }</H4>
                                        </div>
                                    </InfoContainer>
                                </CardItemInfo>
                            </CardItem>
                        )}

                        <ShippingAddress>
                            <H3 fontSize="xl" fontWeight={600} >Shipping address</H3>
                            <H4 fontSize="lg" fontWeight={400} >
                            {
                                orderInfo.shipping_address.street_name + ", " +
                                orderInfo.shipping_address.house_number + ", " +
                                orderInfo.shipping_address.city + "-" +
                                orderInfo.shipping_address.state + ", Brasil."
                            }
                            </H4>
                        </ShippingAddress>
                    </>

                    :
                    
                    <></>
                }
            </Card>
        </>
    );
}