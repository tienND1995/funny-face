import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Auth } from '../utils/Auth'

const AuthMiddleware = () => {
  const isLogin = new Auth().isLogin()
  return isLogin ? <Navigate to="/" /> : <Outlet />
}

export default AuthMiddleware
