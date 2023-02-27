import { Route, Routes } from 'react-router-dom'
import LoginUsuario from '../pages/Login'
import PaginaBase from "../pages/PageBase"
import UserRegister from "../pages/UserRegister"
import NotFound from '../pages/NotFound'
import React from 'react'
import Order from '../pages/Order'
import Graphic from '../pages/Graphic'
import Estoque from '../pages/Estoque'


const Rotas = () => {
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='' element={<Order />} />
        <Route path='login' element={<LoginUsuario />} />
        <Route path='register' element={<UserRegister />} />
        <Route path='graficos' element={<Graphic />} />
        <Route path='estoque' element={<Estoque />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>);
}

export default Rotas