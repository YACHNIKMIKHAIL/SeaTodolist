import {ItemType, TaskPriorities, TaskStatuses} from "../../../../Api/SeaApi";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_TASKS_FROM_SERVER = 'SET_TASKS_FROM_SERVER',
    CHANGE_TASK = 'CHANGE_TASK',
    loadTask = 'loadTask'
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
    } as const),
    loadTask: (todolistID: string, taskID: string, loading: boolean) => ({
        type: tasksActions.loadTask, todolistID, taskID, loading
    } as const)
}

export type UpdateSeaTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}