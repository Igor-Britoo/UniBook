import React, { createContext, useState, useEffect } from "react";

import { api } from "../lib/axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})

    const updateToken = async() => {
        let refreshToken = localStorage.getItem('refresh')

        if (refreshToken) {
            return await api.post('token/refresh/',  {refresh: refreshToken} )
            .then( response => {
                console.log(response)
                
                const accessToken = response.data.access
                const refreshToken = response.data.refresh  
                localStorage.setItem('access', accessToken)     
                localStorage.setItem('refresh', refreshToken)
                
                return response
            })
            .catch( error => {
                console.log(error)
                return error.response
            })
        }
        return {response : { status: 400 }}
    }

    const getCustomerInfo = async() => {
        let accessToken = localStorage.getItem('access')

        if (accessToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            
            return await api.get('customer-logged/')
            .then( response => {
                console.log(response)
    
                setUser({
                    name: response.data['name'],
                    email: response.data['email'],
                    address: response.data['address'],
                })
                return response
            })
            .catch(error =>{
                console.log(error)
                return error.response
            })
        }
        return { response : { status: 400 } }
    }

    useEffect(() => {
        getCustomerInfo()
        .then(async response => {
            if (response.status !== 200){ 
                let updateTokenResponse = await updateToken()

                if(updateTokenResponse.status === 200){
                    getCustomerInfo()
                }
            }
        })
    }, [])

    return (
        <AuthContext.Provider value = { user }>
            {children}
        </AuthContext.Provider>
    )
}