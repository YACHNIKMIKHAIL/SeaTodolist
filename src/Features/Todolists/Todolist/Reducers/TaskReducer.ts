import {seaReturnedTasksActionsType, seaTasksActions, tasksActions} from "../Actions/TasksActions";
import {initialTasks} from "../../../../State/initailsStates";
import {ItemType} from "../../../../Api/SeaApi";
import {addTodolistAC, removeTodolistAC, setTodoFromServAC} from "./TodolistReducer";

export const taskReducer = (state: TasksStateType = initialTasks, action: any): TasksStateType => {
    switch (action.type) {
        case addTodolistAC.name: {
            return {[action.payload.item.id]: [], ...state}
        }
        case removeTodolistAC.name: {
            let taskCopy = {...state}
            delete taskCopy[action.payload.todolistId]
            return taskCopy
        }
        case tasksActions.ADD_TASK: {
            return {
                ...state,
                [action.todolistID]: [{...action.item, loading: false}, ...state[action.todolistID]]
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
        case tasksActions.loadTask: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    loading: action.loading
                } : m)
            }
        }
        case setTodoFromServAC.name: {
            const copyState = {...state}
            action.payload.data.forEach((tl:any) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        default:
            return state
    }
}
export type seaTasksActionsType =
    ReturnType<typeof setTodoFromServAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<seaReturnedTasksActionsType<typeof seaTasksActions>>


export type TasksStateType = { [key: string]: Array<ItemType> }
