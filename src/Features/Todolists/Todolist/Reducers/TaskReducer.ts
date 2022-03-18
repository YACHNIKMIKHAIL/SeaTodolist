import {initialTasks} from "../../../../State/initailsStates";
import {ItemType, tasksAPI} from "../../../../Api/SeaApi";
import {addTodolistAC, removeTodolistAC, setTodoFromServAC} from "./TodolistReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksActions} from "../Actions/TasksActions";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";

export const getTasksTC = createAsyncThunk(tasksActions.SET_TASKS_FROM_SERVER, async (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    const sea = await tasksAPI.getTasks(todolistID)
    const tasks = sea.items
    thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    return {tasks, todolistID}
})

export const removeTaskTC = createAsyncThunk(tasksActions.REMOVE_TASK, async (seaParam: { todolistID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    await tasksAPI.removeTask(seaParam.todolistID, seaParam.taskID)
    return {todolistID: seaParam.todolistID, taskID: seaParam.taskID}
})

export const addTaskTC = createAsyncThunk(tasksActions.ADD_TASK, (seaParam: { todolistID: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    return tasksAPI.addTask(seaParam.todolistID, seaParam.title)
        .then(() => {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
        })
})
const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            addTaskAC(state, action: PayloadAction<{ todolistID: string, item: ItemType }>) {
                const task = state[action.payload.todolistID]
                task.unshift({...action.payload.item, loading: false})
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
                state[action.payload.item.id] = []
            });
            builder.addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            });
            builder.addCase(setTodoFromServAC, (state, action) => {
                action.payload.data.forEach((tl: any) => {
                    state[tl.id] = []
                })
            });
            builder.addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
            });
            builder.addCase(removeTaskTC.fulfilled, (state, action) => {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task.slice(index, 1)
                }
            })
        }
    }
)

export const taskReducer = slice.reducer
export const {addTaskAC, changeTaskAC, loadTask} = slice.actions

export type TasksStateType = { [key: string]: Array<ItemType> }
