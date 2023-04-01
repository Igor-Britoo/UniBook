import React from 'react'
import { Main, Span } from '../styles/styles'

export const PageNotFound = () => {
  return (
    <Main>
      <Span fontSize='xxxl' fontWeight="500">
        <strong>OOPS..</strong><br/>
        The page you were looking for was not found..
      </Span>
    </Main>
  )
}