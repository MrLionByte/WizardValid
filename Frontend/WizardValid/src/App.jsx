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

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogOut(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
        <Routes>

                <Route path='/' element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
                } />
                <Route path='/login' element={
                    <Login_app />
                } />
                <Route path='/logout' element={
                    <Logout />
                } />
                <Route path='/register' element={
                    <RegisterAndLogOut />
                } />
                <Route path='/admin-login' element={
                    <Admin_login />
                } />
                <Route path='/dashboard' element={
                    <Dashboard />
                } />
                <Route path='*' element={
                    <NotFound />
                } />
                      
        </Routes>
    </BrowserRouter>

  )
  };

export default App
