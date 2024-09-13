import React, { useEffect, useState } from "react";
import './admin-login.css'
import {adminAuthActions} from '../../../services/services.js'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login_app () {
    const [admin,setAdmin] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("");

    const {isAdminAuthenticated} = useSelector((state)=>state.adminAuth)

    const navigate = useNavigate();

    const { loginAdmin } = adminAuthActions();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        if (!admin || !password) {
            setError("Please fill in all the required fields.");
            return;
        }
    
        const data = {
            username:admin,
            password,
        };
        try {
            console.log(data.password, data.admin)
            await loginAdmin(data)
            if ( isAdminAuthenticated) {
                navigate('/dashboard')
            } else {
                setError("Only admin is authorized to login")
            console.log("NONE")
            }
        
        } catch (error) {
            setError(error)
            console.log("Error",error)
        }
        // try {
        //     console.log(data.password, data.admin)
        //     const res = await api.post("heart/admin/login/", data);
        //     console.log(res.data);
    
        //     localStorage.setItem(ACCESS_TOKEN, res.data.access);
        //     localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        //     navigate('/dashboard');

        // } catch (error) {
        //     console.log("ERROR:", error);
        //     if (error.response) {
        //         console.log("An error occurred ,Try again");
        //         setError(JSON.stringify(error.response.data));
        //     } else if (error.request) {
        //         setError("An error occurred ,Try again");
        //         console.log("ERROR Request Data:", error.request);
        //     } else {
        //         setError("An error occurred ,Try again ");
        //         console.log("ERROR Message:", error.message);
        //     }
        // }
    };

    useEffect(()=>{
        if (isAdminAuthenticated) {
            navigate('/dashboard');
        }
    },[isAdminAuthenticated, navigate])

    return (
        <div className="login-box">
            <div className="login-card">
                <h1 className="admin">ADMIN SPACE</h1>
                <p className="greeting">Hello Admin</p>
                <form action="">
                    <input type="text" placeholder="Admin admin" onChange={(e) => setAdmin(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={handleSubmit}> LOGIN </button>
                     
                </form>
                <p className="error"><b>{error}</b></p>
            </div>

        </div>
    )
}