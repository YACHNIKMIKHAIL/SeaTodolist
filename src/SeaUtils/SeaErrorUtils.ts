import {seaAppActionsType, setSeaAppError, setSeaAppStatus} from "../App/SeaAppReducer";
import {SeaResponseType} from "../Api/SeaApi";
import {Dispatch} from "redux";
import {put} from "redux-saga/effects";


export const seaHandleServer = <T>(data: SeaResponseType<T>, dispatch: Dispatch<seaAppActionsType>) => {
    if (data.messages.length) {
        dispatch(setSeaAppError(data.messages[0]))
    } else {
        dispatch(setSeaAppError('Some sea trouble was happend!'))
    }
    dispatch(setSeaAppStatus('failed'))
}

export function* seaHandleServerSaga<T>(data: SeaResponseType<T>) {
    if (data.messages.length) {
        yield  put(setSeaAppError(data.messages[0]))
    } else {
        yield  put(setSeaAppError('Some sea trouble was happend!'))
    }
    return  put(setSeaAppStatus('failed'))
}

export const seaHandleNetwork = (err: any, dispatch: Dispatch<seaAppActionsType>) => {
    dispatch(setSeaAppError(err.message ? err.message : 'Some sea trouble was happend!'))
    dispatch(setSeaAppStatus('failed'))
}

export function* seaHandleNetworkSaga  (err: any)  {
    yield  put(setSeaAppError(err.message ? err.message : 'Some sea trouble was happend!'))
    return  put(setSeaAppStatus('failed'))
}