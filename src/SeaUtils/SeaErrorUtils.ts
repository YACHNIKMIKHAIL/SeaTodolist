import {setSeaAppError, setSeaAppStatus} from "../App/SeaAppReducer";
import {SeaResponseType} from "../Api/SeaApi";
import {Dispatch} from "redux";


export const seaHandleServer = <T>(data: SeaResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setSeaAppError({error: data.messages[0]}))
    } else {
        dispatch(setSeaAppError({error: 'Some sea trouble was happend!'}))
    }
    dispatch(setSeaAppStatus({status: 'failed'}))
}
export const seaHandleNetwork = (err: any, dispatch: Dispatch) => {
    dispatch(setSeaAppError({error: err.message ? err.message : 'Some sea trouble was happend!'}))
    dispatch(setSeaAppStatus({status: 'failed'}))
}