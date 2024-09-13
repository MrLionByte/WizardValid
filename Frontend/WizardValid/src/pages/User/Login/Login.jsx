import React, { useEffect, useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import Form  from "../../../Components/Form.jsx";
import { useSelector } from "react-redux";

export default function Login_app () {
    const navigate = useNavigate();
    
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

    const handleSignUpNow = ()=>{
        navigate('/register')
    }

    useEffect(()=>{
        if (isAuthenticated) {
            navigate('/');
        }
    },[isAuthenticated, navigate])

    return (
        <div className="login-box">
            <div className="login-card">
                <p className="greeting">Welcome back to Wizard</p>

                <Form route='heart/token/' method={'login'} />

            </div>
            <div className="login-signup">
            <p>New here? <span className="signSpan" onClick={handleSignUpNow}>Sign-up now</span></p>
            </div>
        </div>
    )
}