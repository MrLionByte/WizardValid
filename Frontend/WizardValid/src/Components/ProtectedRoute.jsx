import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Admin/Admin-Dashboard/admin_dashboard';

const ProtectedRoute = ({ children,root }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const {isAdminAuthenticated} = useSelector((state) => state.adminAuth);
    console.log("ADMIN",isAdminAuthenticated)
    if (!isAuthenticated && root === "home") {
        return <Navigate to="/login" />;
    } else if (!isAdminAuthenticated && root === "dashboard"){
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom"
// import {jwtDecode} from "jwt-decode"
// import api from "../api"
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constands"
// import { useEffect, useState } from "react"


// function ProtectedRoute({children}){
//     const [isAuthorized, setIsAuthorized] = useState(null)

//     useEffect(()=>{
//         auth().catch(()=> setIsAuthorized(false))
//     },[])

//     const refreshToken = async() => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN)
//         try {
//             const res = await api.post("/api/token/refresh/", {
//                 refresh: refreshToken,
//             });
//             if (res.status == 200 ){
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)
//             } else {
//                 setIsAuthorized(false)
//             }
//         } catch (error) {
//             console.log(error);
//             isAuthorized(false)
            
//         }
//     }
//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN)
//         if (!token) {
//             setIsAuthorized(false)
//             return
//         }
//         const decoded = jwtDecode(token)
//         const tokenExpiration = decoded.exp
//         const now = Date.now()/1000

//         if (tokenExpiration < now) {
//             await refreshToken()
//         } else {
//             setIsAuthorized(true)
//         }
//     }
//     if (isAuthorized === null){
//         return <div>Loading...</div>
//     }

//     return isAuthorized ? children: <Navigate to="/login/"/>
// }

// export default ProtectedRoute;
