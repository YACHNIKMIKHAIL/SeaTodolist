import {ThunkAction} from "redux-thunk";
import { store} from "./store";
import {seaLoginActionsType} from "../Features/SeaLogin/LoginType";
import {seaReducer} from "./Reducers";

export type seaReducerType = ReturnType<typeof seaReducer>
export type seaActionsType = seaLoginActionsType
export type SeaThunkType<ReturnType = void> = ThunkAction<ReturnType,
    seaReducerType,
    unknown,
    seaActionsType>
export type SeaDispatchType = typeof store.dispatch