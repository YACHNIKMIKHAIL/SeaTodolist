import {
    addTaskACType, changeTaskACType,
    changeTaskStatusACType,
    changeTaskTitleACType,
    removeTaskACType, setTasksFromServACType,
    tasksActions
} from "./TasksActions";
import {addTodolistACType, removeTodolistACType, TodolistActions} from "./TodolistsActions";
import {initialTasks} from "./initailsStates";
import {ItemType} from "../Api/SeaApi";


export type TasksStateType = { [key: string]: Array<ItemType> }

export const taskReducer = (state: TasksStateType = initialTasks, action: seaTasksActionsType): TasksStateType => {
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
        case tasksActions.REMOVE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)
            }
        }
        case tasksActions.SET_TASKS_FROM_SERVER: {
            return {
                ...state, [action.todolistID]: action.data
            }
        }
        case tasksActions.CHANGE_TASK: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {...action.item} : m)
            }
        }
        default:
            return state
    }
}
export type seaTasksActionsType =
    addTodolistACType
    | removeTodolistACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | removeTaskACType
    | setTasksFromServACType
    | changeTaskACType