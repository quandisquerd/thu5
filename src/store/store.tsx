import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productApi from "../api/product";
import authApi from "../api/auth";


const rootReducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})
const middleware = [productApi.middleware, authApi.middleware]

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(...middleware)
})