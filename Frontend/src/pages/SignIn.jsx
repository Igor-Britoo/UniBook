import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Main, 
    Logo, 
    ContainerForm, 
    TitleForm, 
    Form, 
    ButtonForm,
    ParagraphForm, 
    ErrorMessage } from '../components/SignComponents';
    
import { api } from '../lib/axios';

export const SignIn = () =>{
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
        })
        .catch(error => {
            console.log(error)
            if(error.response.status === 401){
                alert('The email address or password is incorrect. Please retry.')
            }
        })
    }
    
    const submit = async () =>{     
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

    return(
        <Main>
            <Logo>UniBook</Logo>

            <ContainerForm>
                <TitleForm>Sign in</TitleForm>

                <Form>
                    { errors.email ? <ErrorMessage>Invalid email address</ErrorMessage> : null }
                    <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleInput}></input>

                    { errors.password ? <ErrorMessage>The password is required</ErrorMessage> : null }
                    <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleInput}></input>
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