import {v1} from "uuid";
import {FilterType} from "../../Todolist";

export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: TodolistActions.REMOVE_TODOLIST, todolistId
    } as const
}
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: TodolistActions.ADD_TODOLIST, newTitle, newID: v1()
    } as const
}
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: TodolistActions.CHANGE_TODOLIST_TITLE, todolistId, newTitle
    } as const
}
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: TodolistActions.CHANGE_TODOLIST_FILTER, todolistId, filter
    } as const
}