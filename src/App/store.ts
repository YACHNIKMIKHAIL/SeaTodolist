import {applyMiddleware, combineReducers, createStore} from "redux";
import {seaTodolistActionsType, todolistReducer} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import {seaTasksActionsType, taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {seaAppActionsType, seaAppResucer} from "./SeaAppReducer";
import {seaAuthReducer, seaLoginActionsType} from "../Features/SeaLogin/SeaAuthReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {tasksWatcherSaga} from "../Features/Todolists/Todolist/Sagas/TasksSagas";
import {appWatcherSaga} from "./AppSagas";
import {all} from "redux-saga/effects";
import {todolistWatcherSaga} from "../Features/Todolists/Todolist/Sagas/TodolistsSagas";

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
    yield all([
        appWatcherSaga(),
        tasksWatcherSaga(),
        todolistWatcherSaga()
    ])
    //or II variant
    // yield* appWatcherSaga(),
    //     yield* tasksWatcherSaga(),
    //     yield* todolistWatcherSaga()

}


export const useSeaSelector: TypedUseSelectorHook<reducerType> = useSelector
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    reducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store


