import {call, put, takeEvery} from "redux-saga/effects";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {ApiTodolistType, PostTodolistType, SeaResponseType, todolistAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {seaTodolistActions} from "../Actions/TodolistsActions";
import {AxiosResponse} from "axios";
import {getTasks} from "./TasksSagas";

export function* getTodolistsWorkerSaga() {
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
    return {type: 'TODOLISTS/POST_TODOLISTS', title}
}

export function* removeTodolistsWorkerSaga(action: ReturnType<typeof removeTodolists>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    try {
        yield  call(todolistAPI.deleteTodolists, action.todolistID)
        yield  put(seaTodolistActions.removeTodolistAC(action.todolistID))
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
    }
}

export const removeTodolists = (todolistID: string) => {
    return {type: 'TODOLISTS/REMOVE_TODOLISTS', todolistID}
}

export function* changeTodolistsWorkerSaga(action: ReturnType<typeof changeTodolists>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    try {
        let sea: AxiosResponse<SeaResponseType> = yield  call(todolistAPI.changeTodolists, action.todolistID, action.title)
        if (sea.data.resultCode === 0) {
            yield  put(seaTodolistActions.changeTodolistTitleAC(action.todolistID, action.title))
        } else {
            seaHandleServer(sea.data, yield  put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))

    }
}
export const changeTodolists = (todolistID: string, title: string) => {
    return {type: 'TODOLISTS/CHANGE_TODOLISTS', todolistID, title}
}

export function* rearderTodolistsWorkerSaga(action: ReturnType<typeof rearderTodolists>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    try {
        let sea: AxiosResponse<SeaResponseType> = yield  call(todolistAPI.reorderTodolists,action.todolistID, action.putAfterItemId)
        if (sea.data.resultCode === 0) {
            yield  put(getTodolists())
            yield  put(getTasks(action.todolistID))
        } else {
            seaHandleServer(sea.data, yield  put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))

    }
}
export const rearderTodolists = (todolistID: string, putAfterItemId: string | null) => {
    return {type: 'TODOLISTS/REORDER_TODOLISTS', todolistID, putAfterItemId}
}

export function* todolistWatcherSaga() {
    yield takeEvery('TODOLISTS/GET_TODOLISTS', getTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/POST_TODOLISTS', postTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/REMOVE_TODOLISTS', removeTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/CHANGE_TODOLISTS', changeTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/REORDER_TODOLISTS', rearderTodolistsWorkerSaga)
}