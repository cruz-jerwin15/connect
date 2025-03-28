import { configureStore } from "@reduxjs/toolkit";
import { genreApi } from "./genreApi";
import { bookApi } from "./bookApi";


export const store = configureStore({
    reducer: { 
        [genreApi.reducerPath]: genreApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(genreApi.middleware).concat(bookApi.middleware),
});
