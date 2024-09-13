import { configureStore } from '@reduxjs/toolkit';
import reducers from './slice.js';

const store = configureStore({
    reducer: {
        edit: reducers.editReducer,
        auth: reducers.userAuthReducer,
        adminAuth: reducers.adminAuthReducer,
    },
});

export default store;
