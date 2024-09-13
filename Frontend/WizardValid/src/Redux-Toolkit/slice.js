import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constands';


const initialState = {
    isEdit: JSON.parse(localStorage.getItem('isEdit')) || false, 
};

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
            localStorage.setItem('isEdit', JSON.stringify(state.isEdit)); 
        },
    },
});


// const initialUserState = {
//     user: null,
//     isAuthenticated: false
// };

const savedAuthState = JSON.parse(localStorage.getItem('authState'));

const initialUserState = {
    user: savedAuthState?.user || null,
    isAuthenticated: savedAuthState?.isAuthenticated || false,
};

const userAuth = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers :{
        setUser: (state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state)=> {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('authState');
            
        },
    },
})

const savedAdminAuthState = JSON.parse(localStorage.getItem('adminAuthState'));

const initialAdminState = {
    admin: savedAdminAuthState?.admin || null,
    isAdminAuthenticated: savedAdminAuthState?.isAdminAuthenticated || false,
}

const adminAuth = createSlice({
    name: "adminAuth",
    initialState: initialAdminState,
    reducers :{
        setAdmin: (state, action)=>{
            const { id, username, email, is_superuser } = action.payload;
            state.admin = { id, username, email, is_superuser };
            console.log("Is ADmin", is_superuser)
            if (is_superuser){
                state.isAdminAuthenticated = true;
                localStorage.setItem('adminAuthState', JSON.stringify(state));
            }
        },
        adminLogout(state) {
            state.admin = null;
            state.isAdminAuthenticated = false;
            localStorage.removeItem('adminAuthState');
        },
    },
})

export const { setIsEdit } = editSlice.actions;
export const {setAdmin, adminLogout} = adminAuth.actions;
export const {setUser, logout} = userAuth.actions;

export default {
    editReducer: editSlice.reducer,
    userAuthReducer: userAuth.reducer,
    adminAuthReducer: adminAuth.reducer,
};