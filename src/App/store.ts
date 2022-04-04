import seaThunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {seaReducerType} from "./AppTypes";
import {seaReducer} from "./Reducers";

export const store = configureStore({
    reducer: seaReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                seaThunk,
            ),
})

export const useSeaSelector: TypedUseSelectorHook<seaReducerType> = useSelector

// @ts-ignore
window.store = store

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App/store', () => {
        store.replaceReducer(seaReducer)
    })
}