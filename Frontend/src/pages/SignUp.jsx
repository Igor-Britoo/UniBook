import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { H1, H2, Button, Paragraph, ErrorMessage } from '../styles/styles';
import { Main, ContainerForm, Form } from '../styles/Sign'

import { api } from '../lib/axios';
import axios from 'axios';

export const SignUp = () => {
    const defaultUser = {
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
    }
    const defaultErrors = {
        email: false,
        name: false,
        password: false,
        passwordConfirmation: false,
    }
    const [user, setUser] = useState(defaultUser)
    const [errors, setErrors] = useState(defaultErrors)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInput = (event) =>{
        const data = event.target

        setUser({
            ...user,
            [data.name] : data.value,
        })
    }

    const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))

    const signUp = () => {
        api.post('/signup/', user)
        .then(response => {
            console.log(response)

            axios.post('http://24.199.78.112:8001/api/send-email', {
                "to": user.email,
                "subject": "Bem-vindo ao UniBook!",
                "text": `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2 style="color: #333;">Olá ${user.name},</h2>
                        <p>Obrigado por criar uma conta no UniBook. Estamos muito felizes em tê-lo conosco!</p>
                        <p>Atenciosamente,<br>A equipe UniBook</p>
                    </div>
                `
            }).then(response => {
                console.log(response)
                alert('Congratulations! Your account has been successfully created.')
                setUser(defaultUser)
            }
            ).catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
            if(error.response.status === 409){
                alert('A user with that email already exists.')
            }
        })
    }

    const submit = () => {
        let canSubmit = true;
        setErrors(defaultErrors)
        setIsSubmitting(true)                  

        if ( user.email === "" || !isValidEmail(user.email)){
            setErrors(prevState =>({
                ...prevState,
                email : true
            }))
            canSubmit = false
        }

        if ( user.name === ""){
            setErrors(prevState =>({
                ...prevState,
                name : true,
            }))
            canSubmit = false
        }

        if ( user.password === "" ) {
            setErrors(prevState =>({
                ...prevState,
                password : true,
            }))
            canSubmit = false

        }else{  
            if( user.password !== user.passwordConfirmation ){
                setErrors(prevState =>({
                    ...prevState,
                    passwordConfirmation : true,
                }))
                canSubmit = false
            }
        }

        if(canSubmit) {      
            signUp()
            setTimeout(() => {setIsSubmitting(false)}, 500)
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

            <H1 fontSize='xxxxxl'><Link to="/"> UniBook </Link></H1>

            <ContainerForm>
                <H2 fontSize='xxxxl' fontWeight="500">Create an Account</H2>

                <Form onKeyDown={submitOnEnter}>
                    
                    { errors.email ? <ErrorMessage>Invalid email address</ErrorMessage> : null }
                    <input type='text' name='email' placeholder='Email' value={user.email} onChange={handleInput}></input>
                    
                    { errors.name ? <ErrorMessage>The name is required</ErrorMessage> : null }
                    <input type='text' name='name' placeholder='Name' value={user.name} onChange={handleInput}></input>
                    
                    { errors.password ? <ErrorMessage>The password is required</ErrorMessage> : null }
                    { errors.passwordConfirmation ? <ErrorMessage>The passwords don't match</ErrorMessage> : null }

                    <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleInput}></input>
                    <input type='password' name='passwordConfirmation' placeholder='Password Confirmation' value={user.passwordConfirmation} onChange={handleInput}></input>
                    
                </Form>
                
                <Button onClick={submit} disabled={isSubmitting}>Create</Button>
                
                <Paragraph color="gray" fontSize="md" fontWeight="400" textAlign="center">
                    Already have an account?    
                    <Link to="/signin/"> Sign in. </Link>
                </Paragraph>
            </ContainerForm>
        </Main>
    )
}