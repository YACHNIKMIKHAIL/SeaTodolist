import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import seaThunk, {ThunkAction} from "redux-thunk";
import {seaAppResucer} from "./SeaAppReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {FielErrorType} from "../Api/SeaApi";
import {seaAuthReducer} from "../Features/SeaLogin/authIndex";
import {seaLoginActionsType} from "../Features/SeaLogin/SeaAuthReducer";
import { todolistReducer} from "../Features/Todolists/Todolist/todoTasksIndex";
import { taskReducer } from "../Features/Todolists/Todolist/Reducers/TaskReducer";

const seaReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: seaAppResucer,
    auth: seaAuthReducer
})

export type seaReducerType = ReturnType<typeof seaReducer>
export type seaActionsType = seaLoginActionsType
export const store = configureStore({
    reducer: seaReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                seaThunk,
            ),
})

export const useSeaSelector: TypedUseSelectorHook<seaReducerType> = useSelector
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    seaReducerType,
    unknown,
    seaActionsType>
// @ts-ignore
window.store = store

type SeaDispatchType = typeof store.dispatch
export const useSeaDispatch = () => useDispatch<SeaDispatchType>()

export function useSeaAction<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useSeaDispatch()

    const boundAction = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundAction
}

export type ThunkErrorType = {
    rejectValue: { errors?: string[], fieldsErrors?: FielErrorType[] }
}