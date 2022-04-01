import {combineReducers} from "redux";
import seaThunk from "redux-thunk";
import {seaAppResucer} from "../Features/SeaApplication/SeaApplicationReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {seaAuthReducer} from "../Features/SeaLogin/authIndex";
import {todolistReducer} from "../Features/Todolists/Todolist/todoTasksIndex";
import {taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import {seaReducerType} from "./AppTypes";

export const seaReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: seaAppResucer,
    auth: seaAuthReducer
})

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