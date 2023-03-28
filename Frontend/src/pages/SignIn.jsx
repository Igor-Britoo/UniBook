import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { H1, H2, Button, Paragraph, ErrorMessage } from '../styles/styles';
import { Main, ContainerForm, Form } from '../styles/Sign'
    
import { api } from '../lib/axios';

export const SignIn = () =>{
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
        
    const defaultUser = {
        email: '',
        password: ''
    }
    const defaultErrors = {
        email: false,
        password: false,
    }

    const [user, setUser] = useState(defaultUser)
    const [errors, setErrors] = useState(defaultErrors)

    const handleInput = (event) =>{
        const data = event.target
        setUser({
            ...user,
            [data.name] : data.value,
        })
    }

    const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))

    const getTokens = user => {
        api.post('/token/', user)
        .then(response => {
            console.log(response)
    
            const accessToken = response.data.access
            const refreshToken = response.data.refresh
            localStorage.setItem('access', accessToken)     
            localStorage.setItem('refresh', refreshToken) 
            
            alert('Login successful!')
            setUser(defaultUser)
            navigate(from, { replace: true })
            window.location.reload(true)
        })
        .catch(error => {
            console.log(error)
            if(error.response.status === 401){
                alert('The email address or password is incorrect. Please retry.')
            }
        })
    }
    
    const submit = () =>{     
        let canSubmit = true;
        setErrors(defaultErrors)
        
        if ( user.email === "" || !isValidEmail(user.email)){
            setErrors(prevState =>({
                ...prevState,
                email : true
            }))
            canSubmit = false
        }

        if ( user.password === "" ) {
            setErrors(prevState =>({
                ...prevState,
                password : true,
            }))
            canSubmit = false
        }

        if(canSubmit) {    
            getTokens(user)
        }else{
            console.log('cannot submit')
        }
        
    }

    const submitOnEnter = (event) => {
        if (event.keyCode === 13) {
            submit()
        }
    }

    return(
        <Main>
            <H1 fontSize='xxxxxl' ><Link to="/"> UniBook </Link></H1>

            <ContainerForm>
                <H2 fontSize='xxxxl' fontWeight="500">Sign in</H2>

                <Form onKeyDown={submitOnEnter}>
                    { errors.email ? <ErrorMessage>Invalid email address</ErrorMessage> : null }
                    <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleInput}></input>

                    { errors.password ? <ErrorMessage>The password is required</ErrorMessage> : null }
                    <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleInput}></input>
                    
                </Form>
                
                <Button onClick={submit} >Login</Button>

                <Paragraph color="gray" fontSize="md" fontWeight="400" textAlign="center">
                    Don't have an account? 
                    <Link to="/signup/"> Sign up. </Link>
                </Paragraph>
            </ContainerForm>
        </Main>
    )
}