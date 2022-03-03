import {seaReturnedTasksActionsType, seaTasksActions} from "../Actions/TasksActions";
import {initialTasks} from "../../../../State/initailsStates";
import {ItemType} from "../../../../Api/SeaApi";
import {addTodolistAC, setTodoFromServAC} from "./TodolistReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            addTaskAC(state, action: PayloadAction<{ todolistID: string, item: ItemType }>) {
                const task = state[action.payload.todolistID]
                task.unshift({...action.payload.item, loading: false})
            },
            removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
                const task = state[action.payload.todolistId]
                const index = task.findIndex(i => i.id === action.payload.id)
                if (index > -1) {
                    task.splice(index, 1)
                }
            },
            setTasksFromServAC(state, action: PayloadAction<{ todolistID: string, data: Array<ItemType> }>) {
 
            },
            changeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, item: ItemType }>) {

            },
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {

            },
        },
        extraReducers: {}
    }
)

export const taskReducer = slice.reducer
export const {addTaskAC, removeTaskAC, setTasksFromServAC, changeTaskAC, loadTask} = slice.actions
/*(state: TasksStateType = initialTasks, action: any): TasksStateType => {
switch (action.type) {
    case addTodolistAC.type: {
        return {[action.payload.item.id]: [], ...state}
    }
    case removeTodolistAC.type: {
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
    case setTodoFromServAC.type: {
        const copyState = {...state}
        action.payload.data.forEach((tl:any) => {
            copyState[tl.id] = []
        })
        return copyState
    }
    default:
        return state
}
}*/
export type seaTasksActionsType =
    ReturnType<typeof setTodoFromServAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<seaReturnedTasksActionsType<typeof seaTasksActions>>


export type TasksStateType = { [key: string]: Array<ItemType> }
