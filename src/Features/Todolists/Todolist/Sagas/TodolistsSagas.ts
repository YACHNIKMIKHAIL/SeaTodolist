import {call, put, takeEvery} from "redux-saga/effects";
import {getTasksWorkerSaga} from "./TasksSagas";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {ApiTodolistType, PostTodolistType, todolistAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
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

export function* postTodolistsWorkerSaga(action: ReturnType<typeof postTodolists>) {
    yield  put(setSeaAppStatus('loading'))
    try {
        let sea: PostTodolistType = yield  call(todolistAPI.postTodolists, action.title)
        if (sea.resultCode === 0) {
            const {item} = sea.data;
            yield  put(seaTodolistActions.addTodolistAC(item))
        } else {
            seaHandleServer(sea, yield  put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
    }
}

export const postTodolists = (title: string) => {
    debugger
    return {type: 'TODOLISTS/POST_TODOLISTS', title}
}

export function* todolistWatcherSaga() {
    yield takeEvery('TODOLISTS/GET_TODOLISTS', getTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/POST_TODOLISTS', postTodolistsWorkerSaga)
}