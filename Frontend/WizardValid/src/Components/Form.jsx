import React,{ useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../assets/style/form.css';
import LoadingIndicator from "./LoadingIndicator";
import { useDispatch,useSelector } from "react-redux";
import {useAuthActions} from '../services/services.js';


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loginUserOrRegister } = useAuthActions();

    const {isAuthenticated} = useSelector((state)=>state.auth)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    };
    
    const checkMethod = method === "login" ? "LOGIN" : "SIGN UP";
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!validateEmail(email) && method !== 'login') {
            setEmailError("Please enter a valid email.");
            setLoading(false);
            return;
        } else {
            setEmailError("");
        }

        if (!validateUsername(username)) {
            setUsernameError("Username should be alphanumeric and 3-20 characters long.");
            setLoading(false);
            return;
        } else {
            setUsernameError("");
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must include uppercase, lowercase, number, and special character.");
            setLoading(false);
            return;
        } else {
            setPasswordError("");
        }

    

        // if (method === 'login' ) {
        //     const userData = {username,password};
        //     dispatch(setUser(userData));
        // } else {
        //     const signupData = {username, password, email};
        //     dispatch(setUser(signupData));
        // }

        try {
            console.log(method, route)
            if (method === 'login') {
                await loginUserOrRegister(route, {username, password}, method);
                console.log('WORKINGGG')
                navigate('/'); // Ensure this line is reached
                console.log('WORKINGGG')
            } else {
                await loginUserOrRegister(route, {username, password, email}, method);
                navigate('/login')
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    
        useEffect(() => {
            if (password.length > 0) {
                if (password.length < 8) {
                    setPasswordStrength("Password is too short (minimum 8 characters)");
                } else if (!validatePassword(password)) {
                    setPasswordStrength("Password must include uppercase, lowercase, number, and special character.");
                } else {
                    setPasswordStrength("Password is strong!");
                }
            } else {
                setPasswordStrength("");
            }
        }, [password]);
    
        // if (method !== 'login') {
        //     data.email = email;
        //     dispatch(registerUser(route,data))
        // } else {
        //     dispatch(loginUser(route, data))
        // }
        
        

    //     try {
    //         console.log(data.password, data.username)
    //         const res = await api.post(route, data);
    //         console.log("RES :",res.data);
    //         const { is_superuser } = res.data;
    
    //         if (method === 'login') {
    //             localStorage.setItem(ACCESS_TOKEN, res.data.access);
    //             localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    //             navigate('/');
    //         } else {
    //             navigate('/login');
    //         }
    //     } catch (error) {
    //         console.log("ERROR:", error);
    //         if (error.response) {
    //             console.log("An error occurred ,Try again");
    //             setError(JSON.stringify(error.response.data));
    //         } else if (error.request) {
    //             setError("An error occurred ,Try again");
    //             console.log("ERROR Request Data:", error.request);
    //         } else {
    //             setError("An error occurred ,Try again ");
    //             console.log("ERROR Message:", error.message);
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
     };
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" autoComplete="username"  id="username" placeholder="Username" required
                    value={username} onChange={(e) => setUsername(e.target.value)}  />
                     {usernameError && <p className="error">{usernameError}</p>}
                {method !== 'login' && (
                    <>
                        <input type="email" name="email" placeholder="Email" required
                         value={email} onChange={(e) => setEmail(e.target.value)} />
                         {emailError && <p className="error">{emailError}</p>}
                    </>
                )}
                <input type="password" name="password" placeholder="Password" required
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordStrength && <p>{passwordStrength}</p>}
                    {passwordError && <p className="error">{passwordError}</p>}
                    
                <button type="submit" disabled={loading}> 
                {loading ? <LoadingIndicator /> : checkMethod}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
          
        </>
    );
}

export default Form;
