import {v1} from "uuid";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK'
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: tasksActions.ADD_TASK, newTitle, newID: v1(), todolistId
    } as const
}
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: tasksActions.CHANGE_TASK_STATUS, id, isDone, todolistId
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