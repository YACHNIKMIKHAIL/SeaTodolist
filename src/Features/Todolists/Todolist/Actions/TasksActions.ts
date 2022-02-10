import {ItemType, TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType} from "../../../../Api/SeaApi";
import {reducerType, SeaThunkType} from "../../../../App/store";

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
// export const addTaskAC = (todolistID: string, item: ItemType) => ({type: tasksActions.ADD_TASK, todolistID, item} as const)
// export const removeTaskAC = (todolistId: string, id: string) => ({type: tasksActions.REMOVE_TASK, id, todolistId} as const)
// export const setTasksFromServAC = (todolistID: string, data: Array<ItemType>) => ({type: tasksActions.SET_TASKS_FROM_SERVER, todolistID, data} as const)
// export const changeTaskAC = (todolistID: string, taskID: string, item: ItemType) =>({
//     type: tasksActions.CHANGE_TASK,
//     todolistID,
//     taskID,
//     item
// } as const)

export const getTasksTC = (todolistID: string): SeaThunkType => async (dispatch) => {
    try {
        let res = await tasksAPI.getTasks(todolistID)
        dispatch(seaTasksActions.setTasksFromServAC(todolistID, res.items))
    } catch (e) {
        console.log(e)
    }
}
export const addTaskTC = (todolistID: string, title: string): SeaThunkType => async (dispatch) => {
    try {
        let res = await tasksAPI.addTask(todolistID, title)
        const {item} = res.data;
        dispatch(seaTasksActions.addTaskAC(todolistID, item))
    } catch (e) {
        console.log(e)
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

    try {
        let res = await tasksAPI.changeTask(todolistID, taskID, apiModel)
        dispatch(seaTasksActions.changeTaskAC(todolistID, taskID, res))
    } catch (e) {
        console.log(e)
    }
}
export const removeTaskTC = (todolistID: string, taskID: string): SeaThunkType => async (dispatch) => {
    try {
        await tasksAPI.removeTask(todolistID, taskID)
        dispatch(seaTasksActions.removeTaskAC(todolistID, taskID))
    } catch (e) {
        console.log(e)
    }
}