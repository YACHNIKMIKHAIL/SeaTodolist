import {seaAuthAPI} from "../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../SeaUtils/SeaErrorUtils";
import {seaLoginActions} from "../Features/SeaLogin/SeaAuthReducer";
import {call, put} from "redux-saga/effects";

export type SeaAppInitStateType = {
    seaStatus: seaStatusTypes
    seaError: string | null
    isInitialized: boolean
}
export type seaStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'

const seaInitState: SeaAppInitStateType = {
    seaStatus: 'idle',
    seaError: null,
    isInitialized: false
}

export enum SeaAppActions {
    SET_SEA_STATUS = 'SET_SEA_STATUS',
    SET_SEA_ERROR = 'SET_SEA_ERROR',
    SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'
}

export const seaAppResucer = (state = seaInitState, action: seaAppActionsType): SeaAppInitStateType => {
    switch (action.type) {
        case SeaAppActions.SET_SEA_STATUS: {
            return {...state, seaStatus: action.status}
        }
        case SeaAppActions.SET_SEA_ERROR: {
            return {...state, seaError: action.error}
        }
        case SeaAppActions.SET_IS_INITIALIZED: {
            return {...state, isInitialized: action.isInitial}
        }
        default:
            return state
    }
}

type setSeaAppStatusType = ReturnType<typeof setSeaAppStatus>
export const setSeaAppStatus = (status: seaStatusTypes) => {
    return {
        type: SeaAppActions.SET_SEA_STATUS, status
    } as const
}
type setSeaAppErrorType = ReturnType<typeof setSeaAppError>
export const setSeaAppError = (error: string | null) => {
    return {
        type: SeaAppActions.SET_SEA_ERROR, error
    } as const
}
type setSeaAppInitializedType = ReturnType<typeof setSeaAppInitialized>
export const setSeaAppInitialized = (isInitial: boolean) => {
    return {
        type: SeaAppActions.SET_IS_INITIALIZED, isInitial
    } as const
}
export type seaAppActionsType = setSeaAppStatusType | setSeaAppErrorType | setSeaAppInitializedType

export function* initializedSeaAppWorkerSaga(): Generator<any, any, any> {
    put(setSeaAppStatus('loading'))
    try {
        let sea = yield call(seaAuthAPI.me)
        if (sea.data.resultCode === 0) {
            yield put(seaLoginActions.isLoginInAC(true))
            yield put(setSeaAppInitialized(true))
            yield put(setSeaAppStatus('succesed'))
        } else {
            yield put(seaLoginActions.isLoginInAC(false))
            yield  put(setSeaAppInitialized(true))
            seaHandleServer(sea.data,yield put)
        }
    } catch (e) {
        seaHandleNetwork(e,yield put)
    }
}

export const initializedSeaApp=()=>{
    return {type:'APP/INITIALIZE_APP'}
}