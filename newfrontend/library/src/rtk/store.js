import { configureStore } from "@reduxjs/toolkit";
import { genreApi } from "./genreApi";

export const store = configureStore({
    reducer:{
        [genreApi.reducerPath]:genreApi.reducer,
       
    },
    middleware:(getDefualtMiddleware) =>
        getDefualtMiddleware().concat(genreApi.middleware)    
})