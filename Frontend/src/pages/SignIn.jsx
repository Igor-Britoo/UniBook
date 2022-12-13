import React, { useState } from 'react';
import { Main, 
    Logo, 
    ContainerForm, 
    TitleForm, 
    Form, 
    ButtonForm,
    ParagraphForm } from '../styles/sign';

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
    
    const submit = () =>{
        console.log(JSON.stringify(user))
        
        if(! isValidEmail(user.email)) console.log('invalid email')
        if(user.password === '')  console.log('invalid password')

        /*
        api.post('/api/', user).
        then(response => (
            console.log(response)
        ))
        .catch(error => {
            console.log(error)
        })
        */
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
                    <a href="/signup"> Sign up. </a>
                </ParagraphForm>
            </ContainerForm>
        </Main>
    )
}