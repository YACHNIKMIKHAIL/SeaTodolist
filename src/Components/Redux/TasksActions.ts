import {Dispatch} from "redux";
import {ItemType, tasksAPI, TaskStatuses} from "../Api/SeaApi";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_TASKS_FROM_SERVER = 'SET_TASKS_FROM_SERVER'
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
export const getTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistID)
            .then(data => dispatch(setTasksFromServAC(todolistID, data.items)))
            .catch(err => console.log('err: ' + err))
    }
}
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.addTask(todolistID, title)
            .then(data => {
                console.log(data.data.item)
                const {item} = data.data;
                dispatch(addTaskAC(todolistID, item))
                // dispatch(setTasksFromServAC(todolistID, data.items))
            })
            .catch(err => console.log('err: ' + err))
    }
}
export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.changeTaskTitle(todolistID, taskID, title)
            .then(item => dispatch(changeTaskTitleAC(todolistID, taskID, item.title)))
            .catch(err => console.log('err: ' + err))
    }
}
export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.changeTaskStatus(todolistID, taskID, status, title)
            .then(() => dispatch(changeTaskStatusAC(todolistID, taskID, status)))
            .catch(err => console.log('err: ' + err))
    }
}
export const removeTaskTC = (todolistID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.removeTask(todolistID, taskID)
            .then(() => dispatch(removeTaskAC(todolistID, taskID)))
            .catch(err => console.log('err: ' + err))
    }
}