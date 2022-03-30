import * as tasksActions from './Reducers/TasksActions'
import * as todolistsAsyncActions from './Reducers/TodolistsActions'
import {slice} from './Reducers/TodolistReducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,
}