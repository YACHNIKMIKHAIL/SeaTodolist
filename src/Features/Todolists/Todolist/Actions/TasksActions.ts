import {ItemType, TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType} from "../../../../Api/SeaApi";
import {reducerType, SeaThunkType} from "../../../../App/store";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {seaTodolistActions} from "./TodolistsActions";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_TASKS_FROM_SERVER = 'SET_TASKS_FROM_SERVER',
    CHANGE_TASK = 'CHANGE_TASK'
}

export type seaReturnedTasksActionsType<S> = S extends { [key: string]: infer T } ? T : never
export const seaTasksActions = {
    addTaskAC: (todolistID: string, item: ItemType) => ({type: tasksActions.ADD_TASK, todolistID, item} as const),
    removeTaskAC: (todolistId: string, id: string) => ({type: tasksActions.REMOVE_TASK, id, todolistId} as const),
    setTasksFromServAC: (todolistID: string, data: Array<ItemType>) => ({
        type: tasksActions.SET_TASKS_FROM_SERVER,
        todolistID,
        data
    } as const),
    changeTaskAC: (todolistID: string, taskID: string, item: ItemType) => ({
        type: tasksActions.CHANGE_TASK,
        todolistID,
        taskID,
        item
    } as const)
}

export const getTasksTC = (todolistID: string): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let res = await tasksAPI.getTasks(todolistID)
        dispatch(seaTasksActions.setTasksFromServAC(todolistID, res.items))
        dispatch(setSeaAppStatus('succesed'))
    } catch (e) {
        console.log(e)
    }
}
export const addTaskTC = (todolistID: string, title: string): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let res = await tasksAPI.addTask(todolistID, title)
        if (res.resultCode === 0) {
            const {item} = res.data;
            dispatch(seaTasksActions.addTaskAC(todolistID, item))
            dispatch(setSeaAppStatus('succesed'))
        } else {
            seaHandleServer(res, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}
export type UpdateSeaTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const changeTaskTC = (todolistID: string, taskID: string, model: UpdateSeaTaskType): SeaThunkType => async (dispatch, getState: () => reducerType) => {
    const actualTaskParams = getState().tasks[todolistID].filter(f => f.id === taskID)[0]
    if (!actualTaskParams) return
    const apiModel: UpdateTaskType = {
        title: actualTaskParams.title,
        description: actualTaskParams.description,
        status: actualTaskParams.status,
        priority: actualTaskParams.priority,
        startDate: actualTaskParams.startDate,
        deadline: actualTaskParams.deadline,
        ...model
    }
    dispatch(setSeaAppStatus('loading'))
    dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'loading'))
    try {
        let res = await tasksAPI.changeTask(todolistID, taskID, apiModel)
        const {item} = res.data.data
        if (res.data.resultCode === 0) {
            dispatch(seaTasksActions.changeTaskAC(todolistID, taskID, item))
            dispatch(setSeaAppStatus('succesed'))
            dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'succesed'))
        } else {
            seaHandleServer(res.data, dispatch)
            dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'failed'))
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}
export const removeTaskTC = (todolistID: string, taskID: string): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'loading'))
    try {
        await tasksAPI.removeTask(todolistID, taskID)
        dispatch(seaTasksActions.removeTaskAC(todolistID, taskID))
        dispatch(setSeaAppStatus('succesed'))
        dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'succesed'))
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}