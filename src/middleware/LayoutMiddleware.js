import React from 'react'
import { Auth } from '../utils/Auth'
import LayoutGuest from '../ver2/layouts/LayoutGuest'
import LayoutUser from '../ver2/layouts/LayoutUser'

const LayoutMiddleware = () => {
  const isLogin = new Auth().isLogin()
  return isLogin ? <LayoutUser /> : <LayoutGuest />
}

export default LayoutMiddleware
