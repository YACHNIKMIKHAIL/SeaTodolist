export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST = 'CHANGE_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_FROM_SERVER = 'SET_FROM_SERVER',
    CHANGE_TODOLIST_STATUS = 'CHANGE_TODOLIST_STATUS'
}


export type seaReturnedTodolistActionsTypes<T> = T extends { [key: string]: infer A } ? A : never