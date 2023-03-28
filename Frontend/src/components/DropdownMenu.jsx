import React from 'react'

import { DropdownContainer, LinksContainer } from '../styles/DropdownMenu'

import { useAuth } from '../hooks/useAuth'
import { Button, H4, Paragraph } from '../styles/styles'
import { Link, useNavigate } from 'react-router-dom'

export const DropdownMenu = ({dropdownMenuActive}) => {
    const { user, isUserLoaded } = useAuth()
    const userLoggedIn = Boolean(user.name) === true
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('access')     
        localStorage.removeItem('refresh')

        alert('You have been successfully logged out')
        window.location.reload(true)
    }

    const navigateToSignIn = () => {
        navigate('/signin/')
    }

    if (isUserLoaded && dropdownMenuActive){
        return (
            userLoggedIn ? 
            <DropdownContainer>
                <H4 fontSize="xl" fontWeight={400}> Your Account</H4>
                <LinksContainer>
                    <Link to="/orders/" >Orders</Link>
                    <Link to="/profile/" >Profile</Link>
                    <div></div>
                    <Link onClick={logout}>Logout</Link>
                </LinksContainer>
            </DropdownContainer>
            :
            <DropdownContainer>
                <Button fontSize="md" height="28px" onClick={navigateToSignIn}> Sign In</Button>
                <Paragraph color="gray" fontSize="sm" fontWeight="400" textAlign="center">
                    New customer ? 
                    <Link to="/signup/"> Start here.</Link>
                </Paragraph>
            </DropdownContainer>
        )
    }
    else return (<></>)
}
