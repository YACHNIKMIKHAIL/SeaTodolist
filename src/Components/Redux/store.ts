import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./TodolistReducer";
import {taskReducer} from "./TaskReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type reducerType = ReturnType<typeof reducer>
export const store = createStore(reducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store