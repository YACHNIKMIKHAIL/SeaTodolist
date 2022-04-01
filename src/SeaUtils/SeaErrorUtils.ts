import {setSeaAppError, setSeaAppStatus} from "../Features/SeaApplication/SeaApplicationReducer";
import {AxiosError} from "axios";
import {thunkAPIType} from "./UtilsTypes";
import {SeaResponseType} from "../Api/ApiTypes";


export const seaHandleAsyncServer = <T>(data: SeaResponseType<T>, thunkAPI: thunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setSeaAppError({error: data.messages.length ? data.messages[0] : 'Some sea trouble was happend!'}))
    }
    thunkAPI.dispatch(setSeaAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}



export const seaAsyncHandleNetwork = (err: AxiosError, thunkAPI: thunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    }
    thunkAPI.dispatch(setSeaAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}