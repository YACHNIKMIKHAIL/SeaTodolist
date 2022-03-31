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
export const seaHandleNetwork = (err: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    }
    dispatch(setSeaAppStatus({status: 'failed'}))
}

export const seaAsyncHandleNetwork = (err: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    }
    thunkAPI.dispatch(setSeaAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}