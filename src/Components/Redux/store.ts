import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./TodolistReducer";
import {taskReducer} from "./TaskReducer";

const reducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type reducerType = ReturnType<typeof reducer>
export const store = createStore(reducer)