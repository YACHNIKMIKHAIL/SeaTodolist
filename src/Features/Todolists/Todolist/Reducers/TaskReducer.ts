import {initialTasks} from "../../../../State/initailsStates";
import {ItemType, tasksAPI, UpdateTaskType} from "../../../../Api/SeaApi";
import {
    changeTodolistStatusAC,
    getTodolistsTC,
    postTodolistsTC, removeTodolistsTC
} from "./TodolistReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksActions, UpdateSeaTaskType} from "../Actions/TasksActions";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {AxiosError} from "axios";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {reducerType} from "../../../../App/store";

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
    thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))

    return {todolistID: seaParam.todolistID, taskID: seaParam.taskID}
})

export const addTaskTC = createAsyncThunk(tasksActions.ADD_TASK, async (seaParam: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        const sea = await tasksAPI.addTask(seaParam.todolistID, seaParam.title)
        if (sea.resultCode === 0) {
            dispatch(setSeaAppStatus({status: 'succesed'}))
            return sea.data.item
        } else {
            seaHandleServer(sea, dispatch)
            return rejectWithValue(null)
        }
    } catch (e: any) {
        const err: AxiosError = e
        seaHandleNetwork(err, dispatch)
        return rejectWithValue(null)
    } finally {

    }

})
export const changeTaskTC = createAsyncThunk(tasksActions.CHANGE_TASK, async (seaParam: { todolistID: string, taskID: string, model: UpdateSeaTaskType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as reducerType
    const actualTaskParams = state.tasks[seaParam.todolistID].filter(f => f.id === seaParam.taskID)[0]
    if (!actualTaskParams) {
        return rejectWithValue('task is undefined!')
    }
    const apiModel: UpdateTaskType = {
        title: actualTaskParams.title,
        description: actualTaskParams.description,
        status: actualTaskParams.status,
        priority: actualTaskParams.priority,
        startDate: actualTaskParams.startDate,
        deadline: actualTaskParams.deadline,
        ...seaParam.model
    }
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: seaParam.todolistID, status: 'loading'}))
    dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: true}))
    try {
        let res = await tasksAPI.changeTask(seaParam.todolistID, seaParam.taskID, apiModel)
        const {item} = res.data.data
        if (res.data.resultCode === 0) {
            // dispatch(changeTaskAC({todolistID: seaParam.todolistID, taskID: seaParam.taskID, item: item}))
            // dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: false}))
            return {seaParam,item:item}
        } else {
            seaHandleServer(res.data, dispatch)
            dispatch(changeTodolistStatusAC({todolistId: seaParam.todolistID, status: 'failed'}))
            dispatch(getTasksTC(seaParam.todolistID))
            return rejectWithValue({})
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue({})

    } finally {
        dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: false}))
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatusAC({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})

const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index].loading = action.payload.loading
                }
            },
        },
        extraReducers: (builder) => {
            builder.addCase(postTodolistsTC.fulfilled, (state, action) => {
                state[action.payload.item.id] = []
            });
            builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            });
            builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
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
            });
            builder.addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            });
            builder.addCase(changeTaskTC.fulfilled, (state, action) => {
                const task = state[action.payload.seaParam.todolistID]
                const index = task.findIndex(i => i.id === action.payload.seaParam.taskID)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.item}
                }
            })
        }
    }
)

export const taskReducer = slice.reducer
export const {loadTask} = slice.actions

export type TasksStateType = { [key: string]: Array<ItemType> }
