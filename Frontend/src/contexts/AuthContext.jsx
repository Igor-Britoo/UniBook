import React, { createContext, useState, useEffect } from "react";

import { api } from "../lib/axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [isUserLoaded, setIsUserLoaded] = useState(false)

    const updateTokens = async(refreshToken) => {
        await api.post('token/refresh/',  {refresh: refreshToken})
        .then( response => {
            //console.log(response) 
            localStorage.setItem('access', response.data.access)     
            localStorage.setItem('refresh', response.data.refresh)            
        })
        .catch( error => {
            //console.log(error)
            localStorage.removeItem('access')     
            localStorage.removeItem('refresh')  
        })
    }

    const getCustomerInfo = async(accessToken) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        let response =  await api.get('customer-logged/')
        .then((response =>{
            //console.log(response)
            return response.data.customer
        }))
        .catch((error) => {
            //console.log(error)
        })

        return response
    }

    const fetchData = async() => {
        let accessToken = localStorage.getItem('access')
        let refreshToken = localStorage.getItem('refresh')

        if (accessToken) {
            let customer = await getCustomerInfo(accessToken)
            if (customer){
                setUser(customer)
            }
            else{
                refreshToken = localStorage.getItem('refresh')
                if(refreshToken) {
                    await updateTokens(refreshToken)

                    accessToken = localStorage.getItem('access')
                    if (accessToken) {
                        customer = await getCustomerInfo(accessToken)
                        setUser(customer)
                    }
                }else{
                    localStorage.removeItem('access')
                }
            }
        }
        else if (refreshToken){
            await updateTokens(refreshToken)

            accessToken = localStorage.getItem('access')
            if (accessToken) {
                let customer = await getCustomerInfo(accessToken)
                setUser(customer)
            }
        }
        
        setIsUserLoaded(true)
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AuthContext.Provider value = {{ user, isUserLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}