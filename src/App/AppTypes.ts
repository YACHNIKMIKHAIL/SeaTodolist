import {ThunkAction} from "redux-thunk";
import {seaReducer, store} from "./store";
import {seaLoginActionsType} from "../Features/SeaLogin/LoginType";

export type seaReducerType = ReturnType<typeof seaReducer>
export type seaActionsType = seaLoginActionsType
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    seaReducerType,
    unknown,
    seaActionsType>
export type SeaDispatchType = typeof store.dispatch