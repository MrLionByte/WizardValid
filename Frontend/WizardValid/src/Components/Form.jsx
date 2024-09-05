import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../assets/style/form.css'
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constands";
import LoadingIndicator from "./LoadingIndicator";

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const checkMethod = method === "login" ? "LOGIN" : "SIGN UP";

    const navigate = useNavigate()

    const handleSubmit = async (e)=> {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username,email,password,phone})
            console.log(res.data);
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log("ERROR 1 :",error);
            alert(error)
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("ERROR Response Data:", error.response.data);
                console.log("ERROR Response Status:", error.response.status);
                console.log("ERROR Response Headers:", error.response.headers);
                alert(JSON.stringify(error.response.data));
            } else if (error.request) {
                // The request was made but no response was received
                console.log("ERROR Request Data:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("ERROR Message:", error.message);
            }

        }finally{
            setLoading(false)
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    {method !== 'login' && (
                        <>
                        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        
                        <input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        </>
                     )}
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit">{checkMethod}</button>
            </form>
            {loading && <LoadingIndicator />}
        </>
    )
}
export default Form;