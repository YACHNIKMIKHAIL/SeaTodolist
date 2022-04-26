import {call, put, takeEvery} from "redux-saga/effects";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaTodolistActions} from "../Actions/TodolistsActions";
import {ApiTaskType, tasksAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork} from "../../../../SeaUtils/SeaErrorUtils";
import { seaTasksActions} from "../Actions/TasksActions";

export function* getTasksWorkerSaga(action: ReturnType<typeof getTasks>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    try {
        let res: ApiTaskType = yield  call(tasksAPI.getTasks, action.todolistID)
        yield  put(seaTasksActions.setTasksFromServAC(action.todolistID, res.items))
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))
    }
}

export const getTasks = (todolistID: string) => {
    return {type: 'TASKS/GET_TASKS', todolistID}
}

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    yield  put(seaTasksActions.loadTask(action.todolistID, action.taskID, true))
    try {
        yield  call(tasksAPI.removeTask, action.todolistID, action.taskID)
        yield  put(seaTasksActions.removeTaskAC(action.todolistID, action.taskID))
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))
    }
}

export const removeTask = (todolistID: string, taskID: string) => {
    return {type: 'TASKS/REMOVE_TASK', todolistID, taskID}
}

export function* tasksWatcherSaga(){
    yield takeEvery('TASKS/GET_TASKS', getTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE_TASK', removeTaskWorkerSaga)
}
