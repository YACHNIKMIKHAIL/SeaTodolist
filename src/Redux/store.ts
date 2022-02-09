import {applyMiddleware, combineReducers, createStore} from "redux";
import {seaTodolistActionsType, todolistReducer} from "./TodolistReducer";
import {seaTasksActionsType, taskReducer} from "./TaskReducer";
import thunk, {ThunkAction} from "redux-thunk";

const reducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type reducerType = ReturnType<typeof reducer>
export const store = createStore(reducer, applyMiddleware(thunk))
export type seaActionsType = seaTasksActionsType | seaTodolistActionsType
export type SeaThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    reducerType,
    unknown,
    seaActionsType
    >
// @ts-ignore
window.store = store