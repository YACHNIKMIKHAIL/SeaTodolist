import {call, put, takeEvery} from "redux-saga/effects";
import {getTasksWorkerSaga} from "./TasksSagas";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {ApiTodolistType, todolistAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork} from "../../../../SeaUtils/SeaErrorUtils";
import {seaTodolistActions} from "../Actions/TodolistsActions";

export function* getTodolistsWorkerSaga(action: ReturnType<typeof getTodolists>) {
    yield  put(setSeaAppStatus('loading'))
    try {
        let sea: Array<ApiTodolistType> = yield  call(todolistAPI.getTodolists)
            yield  put(seaTodolistActions.setTodoFromServAC(sea))
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
    }
}

export const getTodolists = () => {
    debugger
    return {type: 'TODOLISTS/GET_TODOLISTS'}
}

export function* todolistWatcherSaga() {
    yield takeEvery('TODOLISTS/GET_TODOLISTS', getTodolistsWorkerSaga)
}