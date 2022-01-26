import {addTodolistACType, removeTodolistACType, TodolistActions} from "./TodolistReducer";
import {TasksStateType} from "../../Todolist";
import {v1} from "uuid";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK'
}

export const taskReducer = (state: TasksStateType, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case TodolistActions.ADD_TODOLIST: {
            return {[action.newID]: [], ...state}
        }
        case TodolistActions.REMOVE_TODOLIST: {
            let taskCopy = {...state}
            delete taskCopy[action.todolistId]
            return taskCopy
        }
        case tasksActions.ADD_TASK: {
            return {
                ...state,
                [action.todolistId]: [{
                    id: action.newID,
                    title: action.newTitle,
                    isDone: false
                }, ...state[action.todolistId]]
            }
        }
        case tasksActions.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case tasksActions.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    title: action.newTitle
                } : m)
            }
        }
        case tasksActions.REMOVE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)
            }
        }
        default:
            return state
    }
}
export type tasksActionsType =
    addTodolistACType
    | removeTodolistACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | removeTaskACType

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