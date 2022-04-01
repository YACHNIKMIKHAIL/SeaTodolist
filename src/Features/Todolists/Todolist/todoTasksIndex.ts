import * as tasksAsyncActions from './Reducers/TasksActions'
import * as todolistsAsyncActions from './Reducers/TodolistsActions'
import {slice} from './Reducers/TodolistReducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...tasksAsyncActions,
    ...slice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
}

const todolistReducer = slice.reducer
const taskReducer = slice.reducer

export {
    tasksActions,
    todolistsActions,
    todolistReducer,
    taskReducer
}