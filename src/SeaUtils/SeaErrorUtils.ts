import {setSeaAppError, setSeaAppStatus} from "../App/SeaAppReducer";
import {SeaResponseType} from "../Api/SeaApi";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export const seaHandleServer = <T>(data: SeaResponseType<T>, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setSeaAppError({error: data.messages.length ? data.messages[0] : 'Some sea trouble was happend!'}))
    }
    dispatch(setSeaAppStatus({status: 'failed'}))
}

export const seaHandleAsyncServer = <T>(data: SeaResponseType<T>, thunkAPI: thunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setSeaAppError({error: data.messages.length ? data.messages[0] : 'Some sea trouble was happend!'}))
    }
    thunkAPI.dispatch(setSeaAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}


export const seaHandleNetwork = (err: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    }
    dispatch(setSeaAppStatus({status: 'failed'}))
}

export const seaAsyncHandleNetwork = (err: AxiosError, thunkAPI: thunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    }
    thunkAPI.dispatch(setSeaAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}

type thunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}