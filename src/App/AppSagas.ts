import {call, put, takeEvery} from "redux-saga/effects";
import {seaAuthAPI} from "../Api/SeaApi";
import {seaLoginActions} from "../Features/SeaLogin/SeaAuthReducer";
import {seaHandleNetwork, seaHandleServer} from "../SeaUtils/SeaErrorUtils";
import {setSeaAppInitialized, setSeaAppStatus} from "./SeaAppReducer";

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
            seaHandleServer(sea.data, yield put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield put)
    }
}

export const initializedSeaApp = () => {
    return {type: 'APP/INITIALIZE_APP'}
}

export function* appWatcherSaga(){
    yield takeEvery('APP/INITIALIZE_APP', initializedSeaAppWorkerSaga)

}