import {FilterType, TodolistType} from "../../Todolist";
import {v1} from "uuid";

export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
}

export const todolistReducer = (state: TodolistType[], action: todolistActionsType): TodolistType[] => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.todolistId)
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{id: action.newID, title: action.newTitle, filter: 'all'}, ...state]
        }
        case TodolistActions.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.todolistId ? {...m, title: action.newTitle} : m)
        }
        case TodolistActions.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.todolistId ? {...m, filter: action.filter} : m)
        }
        default:
            return state
    }
}
export type todolistActionsType =
    removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType

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