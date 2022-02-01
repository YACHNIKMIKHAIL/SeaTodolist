import {FilterType} from "./TodolistReducer";
import {Dispatch} from "redux";
import {ApiTodolistType, todolistAPI} from "../Api/SeaApi";

export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_FROM_SERVER = 'SET_FROM_SERVER'
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: TodolistActions.REMOVE_TODOLIST, todolistId
    } as const
}
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (item: ApiTodolistType) => {
    return {
        type: TodolistActions.ADD_TODOLIST, item
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
};
export type setTodoFromServACType = ReturnType<typeof setTodoFromServAC>
export const setTodoFromServAC = (data: ApiTodolistType[]) => {
    return {
        type: TodolistActions.SET_FROM_SERVER, data
    } as const
};

export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then(data => dispatch(setTodoFromServAC(data)))
            .catch(err => console.log('err: ' + err))
    }
}
export const postTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.postTodolists(title)
            .then(data => {
                const {item} = data.data;
                dispatch(addTodolistAC(item))
            })
            .catch(err => console.log('err: ' + err))
    }
}
export const removeTodolistsTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolists(todolistID)
            .then(() => dispatch(removeTodolistAC(todolistID)))
            .catch(err => console.log('err: ' + err))
    }
}
export const changeTodolistsTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.changeTodolists(todolistID, title)
            .then(() => dispatch(changeTodolistTitleAC(todolistID,title)))
            .catch(err => console.log('err: ' + err))
    }
}