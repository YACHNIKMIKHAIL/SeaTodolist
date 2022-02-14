import {applyMiddleware, combineReducers, createStore} from "redux";
import {seaTodolistActionsType, todolistReducer} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import {seaTasksActionsType, taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {seaAppActionsType, seaAppResucer} from "./SeaAppReducer";

const reducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app:seaAppResucer
})

export type reducerType = ReturnType<typeof reducer>
export const store = createStore(reducer, applyMiddleware(thunk))
export type seaActionsType = seaTasksActionsType | seaTodolistActionsType | seaAppActionsType

export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    reducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store