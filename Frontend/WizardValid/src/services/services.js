import { useDispatch } from "react-redux";
import api from "../api";
import {setUser,logout,adminLogout,setAdmin } from '../Redux-Toolkit/slice';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constands';

export const useAuthActions = () => {
    const dispatch = useDispatch();
    const loginUserOrRegister = async (route, data, method=null) => {
    
    try {
        console.log("Method", method)
        const response = await api.post(route, data);
        console.log("Response", response)
        
        
        if (method === 'login') {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access);
                        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                        const userData = await api.get('/heart/user-profile/');
                        console.log("Response", userData)
                        dispatch(setUser(userData));
        } 
        return response.data
    } catch(error){
        console.log("Error" ,error)
        throw error;
    }
};

    const logoutUser = async () => {
    
        try {
            dispatch(logout());
        }   catch (error) {
            throw error;
        }
    };
    return { loginUserOrRegister, logoutUser }
};

export const adminAuthActions = ()=> {
    const dispatchAdmin = useDispatch();

    const loginAdmin = async (data) => {
    try {

        const res = await api.post("heart/token/", data);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        const adminData = await api.get("/heart/user-profile/")
        const { id, username, email, is_superuser } = adminData.data;
        dispatchAdmin(setAdmin({ id, username, email, is_superuser }));
    } catch (error) {
        console.log("ERROR:", error);
        };
    };
    const logoutAdmin = ()=> {
        try {
            dispatchAdmin(logout());
        }   catch (error) {
            throw error;
        }
    }
    return { loginAdmin, logoutAdmin }
};


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


// export const useAuthActions = () => {
//     const dispatch = useDispatch();

//     const loginOrRegister = async (route, data) => {
//         try {
//             const userData = await api.post(route, data);
//             dispatch(setUser(userData));
//             return userData;
//         } catch(error){
//             throw error;
//         }
//     };

//     const logoutUser = async () => {
//         try {
//             await api.post('heart/logout/');
//             dispatch(logout());
//         } catch (error) {
//             throw error;
//         }
//     };

//     return { loginOrRegister, logoutUser };
// };