import {
    addTaskACType,
    changeTaskStatusACType,
    changeTaskTitleACType,
    removeTaskACType, setTasksFromServACType,
    tasksActions
} from "./TasksActions";
import {addTodolistACType, removeTodolistACType, TodolistActions} from "./TodolistsActions";
import {initialTasks} from "./initailsStates";
import {ItemType} from "../Api/SeaApi";

export type TaskType = {
    id: string
    title: string
    status: number
}

export type TasksStateType = { [key: string]: Array<ItemType> }

export const taskReducer = (state: TasksStateType = initialTasks, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case TodolistActions.ADD_TODOLIST: {
            return {[action.item.id]: [], ...state}
        }
        case TodolistActions.REMOVE_TODOLIST: {
            let taskCopy = {...state}
            delete taskCopy[action.todolistId]
            return taskCopy
        }
        case tasksActions.ADD_TASK: {
            return {
                ...state,
                [action.todolistID]: [action.item, ...state[action.todolistID]]
            }
        }
        case tasksActions.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    status: action.status
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
        case tasksActions.SET_TASKS_FROM_SERVER: {
            debugger
            return {
                ...state,[action.todolistID]:action.data
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
    | setTasksFromServACType