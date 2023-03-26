import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { BackButton as BackButtonStyled } from '../styles/BackButton'
import { Span } from '../styles/styles'

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Link onClick={() => navigate(-1)}>
            <BackButtonStyled>
                <FaAngleLeft color="#619885" fontSize="2.1em"/>
                <Span fontSize="xxl" fontWeight="600" color="green500">Back</Span>
            </BackButtonStyled>
        </Link>
    )
}
