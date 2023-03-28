import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth'

export const ProtectedRoutes = () => {
  const { user, isUserLoaded } = useAuth()
  const userLoggedIn = Boolean(user.name) === true
  const location = useLocation()

  if (isUserLoaded) {    
    return (
      userLoggedIn ?
      <Outlet />
      :
      <Navigate to='/signin/' state={{from : location}} replace={true}/>
    )
  }
}
