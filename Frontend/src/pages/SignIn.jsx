import React, { useState } from 'react';

import { api } from '../lib/axios';

import '../styles/Sign.css';

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
        <main className='sign'>
            <h2 className='logo' >UniBook</h2>

            <div className='form-container'>
                <h3 className='form-title' >Sign in</h3>

                <form className='form-sign'>
                    <input type='email' name='email' placeholder='Email' onChange={handleInput}></input>
                    <input type='password' name='password' placeholder='Password' onChange={handleInput}></input>
                </form>

                <button className='btn-login' onClick={submit} >Login</button>
                
                <label>
                    Don't have an account? 
                    <a href="/signup"> Sign up. </a>
                </label>
            </div>
        </main>
    )
}