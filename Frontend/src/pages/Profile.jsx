import React, { useState } from 'react'

import { Button, ErrorMessage, Label } from '../styles/styles'
import { FormContainer, InputContainer, TwoInputsContainer, InputNumber } from '../styles/Profile'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/axios'

export const Profile = () => {
    const defaultErrors = {
        email: false,
        name: false,
    }

    const defaultAddress = {
        streetName: "",
        houseNumber: null,
        state: null,
        city: "",
    }

    const [editMode, setEditMode] = useState(false)
    const { user } = useAuth()
    const [userLoggedData, setUserLoggedData] = useState(user)
    const [errors, setErrors] = useState(defaultErrors)

    const handleNameAndEmailInput = (event) =>{
        const data = event.target
        setUserLoggedData({
            ...userLoggedData,
            [data.name] : data.value,
        })
    }

    const handleAddressInput = (event) =>{
        const data = event.target

        if ((data.name === 'state' || data.name === 'house_number') && data.value === ""){
            setUserLoggedData({
                ...userLoggedData,
                address:{
                    ...userLoggedData.address,
                    [data.name] : null,
                }
            })
        }
        else{
            setUserLoggedData({
                ...userLoggedData,
                address:{
                    ...userLoggedData.address,
                    [data.name] : data.value,
                }
            })
        }

    }

    const handleEditAndSaveButton = () => {
        if (editMode) {
            setErrors(defaultErrors)

            if (userLoggedData !== user){
               submit()
            }
            else setEditMode(false)
        }else{
            setEditMode(true)
        }
    }

    const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))

    const updateUserLogged = async() => {
        let accessToken = localStorage.getItem('access')

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        await api.put('/customer-logged/', userLoggedData)
        .then(response => {
            //console.log(response)
            alert('Your account data has been successfully updated.')
            window.location.reload(true)
        })
        .catch(error => {
            //console.log(error)
            if(error.response.status === 409){
                alert('A user with that email already exists.')
            }
        })
    }

    const submit = () => {
        let canSubmit = true;

        if ( userLoggedData.email === "" || !isValidEmail(userLoggedData.email)){
            setErrors(prevState =>({
                ...prevState,
                email : true
            }))
            canSubmit = false
        }

        if ( userLoggedData.name === ""){
            setErrors(prevState =>({
                ...prevState,
                name : true,
            }))
            canSubmit = false
        }
        
        const hasStreetName = userLoggedData.address.street_name !== defaultAddress.streetName
        const hasHouseNumber = userLoggedData.address.house_number !== defaultAddress.houseNumber
        const hasState = userLoggedData.address.state !== defaultAddress.state
        const hasCity = userLoggedData.address.city !== defaultAddress.city
        
        if (hasStreetName  || hasHouseNumber || hasState || hasCity){
            if (!hasStreetName  || !hasHouseNumber || !hasState || !hasCity){
                canSubmit = false
                alert('To update the address, you need to fill in all its fields')
            }

        }
        
        if (canSubmit) {
            updateUserLogged()
        }
    }

    const submitOnEnter = (event) => {
        if (event.keyCode === 13) {
            submit()
        }
    }

    return (
        <FormContainer>
            <form onKeyDown={submitOnEnter}>
                <InputContainer>
                    <Label fontSize="xxl" fontWeight={600} >Name:</Label>
                    { errors.name ? <ErrorMessage>The name is required</ErrorMessage> : null }
                    <input type="text" disabled={ editMode ? false : true} value={userLoggedData.name} name="name" onChange={handleNameAndEmailInput}/>
                </InputContainer>

                <InputContainer>
                    <Label fontSize="xxl" fontWeight={600} >E-mail:</Label>
                    { errors.email ? <ErrorMessage>Invalid email address</ErrorMessage> : null }
                    <input type="text" disabled={ editMode ? false : true} value={userLoggedData.email} name="email" onChange={handleNameAndEmailInput}/>
                </InputContainer>

                <TwoInputsContainer>
                    <InputContainer>
                        <Label fontSize="xxl" fontWeight={600} >Street name:</Label>
                        <input type="text" disabled={ editMode ? false : true} value={userLoggedData.address?.street_name ? userLoggedData.address.street_name : ""} name="street_name" onChange={handleAddressInput}/>
                    </InputContainer>

                    <InputContainer className="house-number">
                        <Label fontSize="xxl" fontWeight={600} >Number:</Label>
                        <InputNumber disabled={ editMode ? false : true } value={userLoggedData.address?.house_number ? userLoggedData.address.house_number : ""} name="house_number" onChange={handleAddressInput}/>
                    </InputContainer>
                </TwoInputsContainer>
                
                <TwoInputsContainer>
                    <InputContainer>
                        <Label fontSize="xxl" fontWeight={600} >State:</Label>
                        <select disabled={ editMode ? false : true } value={userLoggedData.address?.state ? userLoggedData.address.state  : ""} name="state" onChange={handleAddressInput}>
                            <option value=""></option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </InputContainer>

                    <InputContainer>
                        <Label fontSize="xxl" fontWeight={600} >City:</Label>
                        <input type="text" disabled={ editMode ? false : true} value={userLoggedData.address?.city ? userLoggedData.address.city : ""} name="city" onChange={handleAddressInput}/>
                    </InputContainer>
                </TwoInputsContainer>
            </form>  

            <Button fontSize="xxl" height="40px" onClick={handleEditAndSaveButton}>{ editMode ? "Save" : "Edit"}</Button>
        </FormContainer>
     )
}
