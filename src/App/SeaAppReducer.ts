import {SeaThunkType} from "./store";
import {seaAuthAPI} from "../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../SeaUtils/SeaErrorUtils";
import {initialLoginType, seaLoginActions} from "../Features/SeaLogin/SeaAuthReducer";

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

export enum SeaAppActions {
    SET_SEA_STATUS = 'SET_SEA_STATUS',
    SET_SEA_ERROR = 'SET_SEA_ERROR',
    SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'
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

export const initializaSeaAppTC = (): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let sea = await seaAuthAPI.me()
        if (sea.data.resultCode === 0) {
            dispatch(setSeaAppInitialized(true))
            dispatch(setSeaAppStatus('succesed'))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}