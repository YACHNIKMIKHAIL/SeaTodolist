import {combineReducers} from "redux";
import { todolistReducer} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import {seaTasksActionsType, taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import seaThunk, {ThunkAction} from "redux-thunk";
import {seaAppResucer} from "./SeaAppReducer";
import {seaAuthReducer, seaLoginActionsType} from "../Features/SeaLogin/SeaAuthReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

const seaReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: seaAppResucer,
    auth: seaAuthReducer
})

export type reducerType = ReturnType<typeof seaReducer>
export type seaActionsType = seaTasksActionsType  | seaLoginActionsType
// export const store = createStore(reducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: seaReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                seaThunk,
            ),
})

export const useSeaSelector: TypedUseSelectorHook<reducerType> = useSelector
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    reducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store