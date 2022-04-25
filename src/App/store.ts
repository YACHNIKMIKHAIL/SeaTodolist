import {applyMiddleware, combineReducers, createStore} from "redux";
import {seaTodolistActionsType, todolistReducer} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import {seaTasksActionsType, taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {seaAppActionsType, seaAppResucer} from "./SeaAppReducer";
import {seaLoginActionsType, seaAuthReducer} from "../Features/SeaLogin/SeaAuthReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import createSagaMiddleware from "redux-saga";

const reducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: seaAppResucer,
    auth: seaAuthReducer
})

export type reducerType = ReturnType<typeof reducer>

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware))
export type seaActionsType = seaTasksActionsType | seaTodolistActionsType | seaAppActionsType | seaLoginActionsType

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    alert('rootWatcher')
}

export const useSeaSelector: TypedUseSelectorHook<reducerType> = useSelector
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    reducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store


// then run the saga
