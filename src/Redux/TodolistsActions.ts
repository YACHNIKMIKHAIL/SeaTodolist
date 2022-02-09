import {FilterType} from "./TodolistReducer";
import {ApiTodolistType, todolistAPI} from "../Api/SeaApi";
import {SeaThunkType} from "./store";

export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_FROM_SERVER = 'SET_FROM_SERVER'
}


export const removeTodolistAC = (todolistId: string) => ({type: TodolistActions.REMOVE_TODOLIST, todolistId} as const)
export const addTodolistAC = (item: ApiTodolistType) => ({type: TodolistActions.ADD_TODOLIST, item} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: TodolistActions.CHANGE_TODOLIST_TITLE,
    todolistId,
    newTitle
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => ({
    type: TodolistActions.CHANGE_TODOLIST_FILTER,
    todolistId,
    filter
} as const)
export const setTodoFromServAC = (data: ApiTodolistType[]) => ({type: TodolistActions.SET_FROM_SERVER, data} as const)

export const getTodolistsTC = (): SeaThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(data => dispatch(setTodoFromServAC(data)))
            .catch(err => console.log('err: ' + err))
    }
}
export const postTodolistsTC = (title: string): SeaThunkType => {
    return (dispatch) => {
        todolistAPI.postTodolists(title)
            .then(data => {
                const {item} = data.data;
                dispatch(addTodolistAC(item))
            })
            .catch(err => console.log('err: ' + err))
    }
}
export const removeTodolistsTC = (todolistID: string): SeaThunkType => {
    return (dispatch) => {
        todolistAPI.deleteTodolists(todolistID)
            .then(() => dispatch(removeTodolistAC(todolistID)))
            .catch(err => console.log('err: ' + err))
    }
}
export const changeTodolistsTC = (todolistID: string, title: string): SeaThunkType => {
    return (dispatch) => {
        todolistAPI.changeTodolists(todolistID, title)
            .then(() => dispatch(changeTodolistTitleAC(todolistID, title)))
            .catch(err => console.log('err: ' + err))
    }
}