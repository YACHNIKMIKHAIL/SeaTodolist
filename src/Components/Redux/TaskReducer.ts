import {TasksStateType} from "../../Todolist";
import {
    addTaskACType,
    changeTaskStatusACType,
    changeTaskTitleACType,
    removeTaskACType,
    tasksActions
} from "./TasksActions";
import {addTodolistACType, removeTodolistACType, TodolistActions} from "./TodolistsActions";
import {initialTasks} from "./initailsStates";

export const taskReducer = (state: TasksStateType = initialTasks, action: tasksActionsType): TasksStateType => {
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