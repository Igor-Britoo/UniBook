import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Main, 
    Logo, 
    ContainerForm, 
    TitleForm, 
    Form, 
    ButtonForm,
    ParagraphForm } from '../components/SignComponents';
    
import { api } from '../lib/axios';

export const SignIn = () =>{
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

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
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    const submit = async () =>{     
        let canSubmit = true;
        
        if(! isValidEmail(user.email)) canSubmit = false
        if(user.password === '')  canSubmit = false

        if(canSubmit) {    
            getTokens(user)
        }else{
            console.log('cannot submit')
        }
        
    }

    return(
        <Main>
            <Logo>UniBook</Logo>

            <ContainerForm>
                <TitleForm>Sign in</TitleForm>

                <Form>
                    <input type='email' name='email' placeholder='Email' onChange={handleInput}></input>
                    <input type='password' name='password' placeholder='Password' onChange={handleInput}></input>
                </Form>

                <ButtonForm onClick={submit} >Login</ButtonForm>
                
                <ParagraphForm>
                    Don't have an account? 
                    <Link to="/signup/"> Sign up. </Link>
                </ParagraphForm>
            </ContainerForm>
        </Main>
    )
}