export type SeaAppInitStateType = {
    seaStatus: seaStatusTypes
    seaError: string | null
}
export type seaStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'

const seaInitState: SeaAppInitStateType = {
    seaStatus: 'idle',
    seaError: null
}
export const seaAppResucer = (state = seaInitState, action: seaAppActionsType): SeaAppInitStateType => {
    switch (action.type) {
        case SeaAppActions.SET_SEA_STATUS: {
            return {...state, seaStatus: action.status}
        }
        case SeaAppActions.SET_SEA_ERROR: {
            return {...state, seaError: action.error}
        }
        default:
            return state
    }
}

export enum SeaAppActions {
    SET_SEA_STATUS = 'SET_SEA_STATUS',
    SET_SEA_ERROR = 'SET_SEA_ERROR'
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
export type seaAppActionsType = setSeaAppStatusType | setSeaAppErrorType