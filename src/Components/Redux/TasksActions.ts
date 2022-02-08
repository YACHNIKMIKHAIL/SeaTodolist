import {ItemType, TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType} from "../Api/SeaApi";
import {reducerType, SeaThunkType} from "./store";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_TASKS_FROM_SERVER = 'SET_TASKS_FROM_SERVER',
    CHANGE_TASK = 'CHANGE_TASK'
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, item: ItemType) => {
    return {
        type: tasksActions.ADD_TASK, todolistID, item
    } as const
}
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {
        type: tasksActions.CHANGE_TASK_STATUS, id, status, todolistId
    } as const
}
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: tasksActions.CHANGE_TASK_TITLE, id, newTitle, todolistId
    } as const
}
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: tasksActions.REMOVE_TASK, id, todolistId
    } as const
}

export type setTasksFromServACType = ReturnType<typeof setTasksFromServAC>
export const setTasksFromServAC = (todolistID: string, data: Array<ItemType>) => {
    return {
        type: tasksActions.SET_TASKS_FROM_SERVER, todolistID, data
    } as const
};
export type changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todolistID: string, taskID: string, item: ItemType) => {
    return {
        type: tasksActions.CHANGE_TASK, todolistID, taskID, item
    } as const
};
// export const getTasksTC = (todolistID: string) => {
//     return (dispatch: Dispatch) => {
//         tasksAPI.getTasks(todolistID)
//             .then(data => {
//                 console.log(data)
//                 dispatch(setTasksFromServAC(todolistID, data.items))
//             })
//             .catch(err => console.log('err: ' + err))
//     }
// }

export const getTasksTC = (todolistID: string): SeaThunkType => async (dispatch) => {
    try {
        let res = await tasksAPI.getTasks(todolistID)
        dispatch(setTasksFromServAC(todolistID, res.items))
    } catch (e) {
        console.log(e)
    }
}

// export const addTaskTC = (todolistID: string, title: string) => {
//     return (dispatch: Dispatch) => {
//         tasksAPI.addTask(todolistID, title)
//             .then(data => {
//                 console.log(data.data.item)
//                 const {item} = data.data;
//                 dispatch(addTaskAC(todolistID, item))
//                 // dispatch(setTasksFromServAC(todolistID, data.items))
//             })
//             .catch(err => console.log('err: ' + err))
//     }
// }
export const addTaskTC = (todolistID: string, title: string): SeaThunkType => async (dispatch) => {
    try {
        let res = await tasksAPI.addTask(todolistID, title)
        const {item} = res.data;
        dispatch(addTaskAC(todolistID, item))
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
        dispatch(changeTaskAC(todolistID, taskID, res))
    } catch (e) {
        console.log(e)
    }
}
// export const removeTaskTC = (todolistID: string, taskID: string) => {
//     return (dispatch: Dispatch) => {
//         tasksAPI.removeTask(todolistID, taskID)
//             .then(() => dispatch(removeTaskAC(todolistID, taskID)))
//             .catch(err => console.log('err: ' + err))
//     }
// }
export const removeTaskTC = (todolistID: string, taskID: string): SeaThunkType => async (dispatch) => {
    try {
        await tasksAPI.removeTask(todolistID, taskID)
        dispatch(removeTaskAC(todolistID, taskID))
    } catch (e) {
        console.log(e)
    }
}