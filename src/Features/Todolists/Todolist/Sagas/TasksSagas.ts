import {call, put, takeEvery} from "redux-saga/effects";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaTodolistActions} from "../Actions/TodolistsActions";
import {ApiTaskType, ItemType, SeaResponseType, tasksAPI, UpdateTaskType} from "../../../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {seaTasksActions, UpdateSeaTaskType} from "../Actions/TasksActions";
import {reducerType} from "../../../../App/store";
import {AxiosResponse} from "axios";

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

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
    yield  put(setSeaAppStatus('loading'))
    try {
        let res: SeaResponseType<{
            item: ItemType
        }> = yield  call(tasksAPI.addTask, action.todolistID, action.title)
        if (res.resultCode === 0) {
            const {item} = res.data;
            yield  put(seaTasksActions.addTaskAC(action.todolistID, item))
        } else {
            seaHandleServer(res, yield  put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))
    }
}
export const addTask = (todolistID: string, title: string) => {
    return {type: 'TASKS/ADD_TASK', todolistID, title}
}

export function* changeTaskWorkerSaga(action: ReturnType<typeof changeTask>)
{
    const actualTaskParams = action.getState().tasks[action.todolistID].filter(f => f.id === action.taskID)[0]
    if (!actualTaskParams) return
    const apiModel: UpdateTaskType = {
        title: actualTaskParams.title,
        description: actualTaskParams.description,
        status: actualTaskParams.status,
        priority: actualTaskParams.priority,
        startDate: actualTaskParams.startDate,
        deadline: actualTaskParams.deadline,
        ...action.model
    }
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading'))
    yield  put(seaTasksActions.loadTask(action.todolistID, action.taskID, true))

    try {
        let res: AxiosResponse<SeaResponseType<{
            item: ItemType
        }>> = yield  call(tasksAPI.changeTask, action.todolistID, action.taskID, apiModel)
        const {item} = res.data.data
        if (res.data.resultCode === 0) {
            yield  put(seaTasksActions.changeTaskAC(action.todolistID, action.taskID, item))
            yield  put(seaTasksActions.loadTask(action.todolistID, action.taskID, false))
        } else {
            seaHandleServer(res.data, yield  put)
            yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'failed'))
            yield  put(getTasks(action.todolistID))

        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
        yield  put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed'))
    }
}
export const changeTask = (todolistID: string, taskID: string, model: UpdateSeaTaskType, getState: () => reducerType) => {
    return {type: 'TASKS/CHANGE_TASK', todolistID, taskID, model,getState}
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



export function* reorderTaskWorkerSaga(action: ReturnType<typeof reorderTask>) {
    yield  put(setSeaAppStatus('loading'))
    yield  put(seaTasksActions.loadTask(action.todolistID, action.taskID, true))
    try {
        let res: AxiosResponse<SeaResponseType> = yield  call(tasksAPI.reorderTask, action.todolistID, action.taskID, action.putAfterItemId)
        if (res.data.resultCode === 0) {
            yield  put(getTasks(action.todolistID))
        } else {
            seaHandleServer(res.data, yield  put)
        }
    } catch (e) {
        seaHandleNetwork(e, yield  put)
    } finally {
        yield  put(setSeaAppStatus('succesed'))
    }
}

export const reorderTask = (todolistID: string, taskID: string, putAfterItemId: string | null) => {
    return {type: 'TASKS/REORDER_TASK', todolistID, taskID, putAfterItemId}
}

export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/GET_TASKS', getTasksWorkerSaga)
    yield takeEvery('TASKS/ADD_TASK', addTaskWorkerSaga)
    yield takeEvery('TASKS/REMOVE_TASK', removeTaskWorkerSaga)
    yield takeEvery('TASKS/CHANGE_TASK', changeTaskWorkerSaga)
    yield takeEvery('TASKS/REORDER_TASK', reorderTaskWorkerSaga)
}
