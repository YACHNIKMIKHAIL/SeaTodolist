import {seaReturnedTasksActionsType, seaTasksActions} from "../Actions/TasksActions";
import {initialTasks} from "../../../../State/initailsStates";
import {ApiTodolistType, ItemType} from "../../../../Api/SeaApi";
import {addTodolistAC, removeTodolistAC, setTodoFromServAC} from "./TodolistReducer";
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
                state[action.payload.todolistID] = action.payload.data
            },
            changeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, item: ItemType }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.item}
                }
            },
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index].loading = action.payload.loading
                }
            },
        },
        extraReducers: (builder) => {
            builder.addCase(addTodolistAC, (state, action) => {

            });
            builder.addCase(removeTodolistAC, (state, action) => {

            });
            builder.addCase(setTodoFromServAC, (state, action) => {

            })
        }
        //     {
        //     [addTodolistAC.type]: (state, action: PayloadAction<{ item: ApiTodolistType }>) => {
        //     },
        //     [removeTodolistAC.type]: (state, action: PayloadAction<{ todolistId: string }>) => {
        //     },
        //     [setTodoFromServAC.type]: (state, action: PayloadAction<{ data: ApiTodolistType[] }>) => {
        //     }
        // }
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
