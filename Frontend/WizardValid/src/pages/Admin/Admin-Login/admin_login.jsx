import React, { useState } from "react";
import './admin-login.css'

export default function Login_app () {
    const [email,setEmail] = useState("")
    const handleChange =(event)=>{
        setEmail(event.target.value)
    }
    console.log(email);
    

    return (
        <div className="login-box">
            <div className="login-card">
                <p className="greeting">Hello Admin</p>
                <form action="">
                    <input type="text" placeholder="Email" onChange={handleChange} />
                    <input type="password" placeholder="Password" />
                    <button> LOGIN </button>
                </form>
            </div>

        </div>
    )
}