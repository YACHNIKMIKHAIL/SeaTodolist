import {applyMiddleware, combineReducers, createStore} from "redux";
import {seaTodolistActionsType, todolistReducer} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import {seaTasksActionsType, taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {initializedSeaAppWorkerSaga, seaAppActionsType, seaAppResucer} from "./SeaAppReducer";
import {seaLoginActionsType, seaAuthReducer} from "../Features/SeaLogin/SeaAuthReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {takeEvery} from "redux-saga/effects";
import {getTasksWorkerSaga} from "../Features/Todolists/Todolist/Actions/TasksActions";

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
    yield takeEvery('APP/INITIALIZE_APP', initializedSeaAppWorkerSaga)
    yield takeEvery('TASKS/GET_TASKS', getTasksWorkerSaga)
}



export const useSeaSelector: TypedUseSelectorHook<reducerType> = useSelector
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    reducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store


// then run the saga
