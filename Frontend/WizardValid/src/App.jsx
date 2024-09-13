import React,{ useState } from 'react'
import './App.css'
import Login_app from './pages/User/Login/Login.jsx'
import Register from './pages/User/Signup/Signup.jsx'
import Home from './pages/User/Home/Home.jsx'
import Admin_login from './pages/Admin/Admin-Login/admin_login.jsx'
import Dashboard from './pages/Admin/Admin-Dashboard/admin_dashboard.jsx'
import NotFound from './pages/notFound.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from './Redux-Toolkit/slice.js';



function RegisterAndLogOut(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
        <Routes>
          
                <Route path='/' element={
                  <ProtectedRoute root={"home"}>
                      <Home />
                  </ProtectedRoute>
                } />
                <Route path='/login' element={
                    <Login_app />
                } />
                <Route path='/register' element={
                    <RegisterAndLogOut />
                } />
                <Route path='/admin-login' element={
                    <Admin_login />
                } />
                <Route path='/dashboard' element={
                  <ProtectedRoute root={"dashboard"}>
                    <Dashboard />
                    </ProtectedRoute>
                } />
                {/* <Route path='/logout' element={
                    <HandleLogout />
                } /> */}
                <Route path='*' element={
                    <NotFound />
                } />
                      
        </Routes>
    </BrowserRouter>

  )
  };

export default App
