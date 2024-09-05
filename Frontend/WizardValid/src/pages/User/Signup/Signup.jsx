import React, { useState } from "react";
import './Signup.css'
import Form from "../../../Components/Form";
import { useNavigate } from "react-router-dom";

export default function Register () {
    const navigate = useNavigate();
    const handleLoginNow = () => {
        navigate('/login')
    }

    return (
        <div className="login-box">
            <div className="login-card">
                <p className="greeting">Be a part of wizards<br /><span>Create an Account</span> </p>
                <Form route='heart/user/register/' method={'register'} />
            </div>
            <div className="login-signup">
            <p>Already a member? <span onClick={handleLoginNow}>Login now</span></p>
            </div>
        </div>
    )
}