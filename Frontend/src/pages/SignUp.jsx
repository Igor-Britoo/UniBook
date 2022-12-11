import React, { useState } from 'react';
import { Main, 
    Logo, 
    ContainerForm, 
    TitleForm, 
    Form, 
    ButtonForm,
    ParagraphForm } from '../styles/sign';

import { api } from '../lib/axios';

export const SignUp = () =>{
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const handleInput = (event) =>{
        const data = event.target

        setUser({
            ...user,
            [data.name] : data.value,
        })
    }

    const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))

    const confirmPassword = (password, passwordConfirmation) => password === passwordConfirmation && password !== ''

    const submit = () =>{
        console.log(JSON.stringify(user))

        let canSubmit = true;

        if(! isValidEmail(user.email)) canSubmit = false
        if (! confirmPassword(user.password, user.passwordConfirmation)) canSubmit = false

        if(canSubmit) {
            console.log('submitted')
             /*
            api.post('/api/', user).
            then(response => (
                console.log(response)
            ))
            .catch(error => {
                console.log(error)
            })
            */
        }else{
            console.log('error')
        }
    }

    return(
        <Main>

            <Logo>UniBook</Logo>

            <ContainerForm>

                <TitleForm>Create an Account</TitleForm>

                <Form>
                    <input type='text' name='email' placeholder='Email' onChange={handleInput}></input>
                    <input type='password' name='password' placeholder='Password' onChange={handleInput}></input>
                    <input type='password' name='passwordConfirmation' placeholder='Password Confirmation' onChange={handleInput}></input>
                </Form>

                <ButtonForm onClick={submit}>Create</ButtonForm>
                
                <ParagraphForm>
                    Already have an account?    
                    <a href="/signin"> Sign in. </a> 
                </ParagraphForm>
            </ContainerForm>
        </Main>
    )
}