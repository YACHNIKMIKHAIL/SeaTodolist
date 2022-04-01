import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {ItemType, tasksAPI, UpdateTaskType} from "../../../../Api/SeaApi";
import {seaAsyncHandleNetwork, seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {AxiosError} from "axios";
import {seaReducerType, ThunkErrorType} from "../../../../App/store";
import {changeTodolistStatus} from "./TodolistReducer";
import {loadTask} from "./TaskReducer";
import {tasksActionsEnum, UpdateSeaTaskType} from "../ActionsEnum/TasksActionsEnum";

export const getTasks = createAsyncThunk(tasksActionsEnum.SET_TASKS_FROM_SERVER, async (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    const sea = await tasksAPI.getTasks(todolistID)
    const tasks = sea.items
    thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    return {tasks, todolistID}
})

export const removeTask = createAsyncThunk(tasksActionsEnum.REMOVE_TASK, async (seaParam: { todolistID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        await tasksAPI.removeTask(seaParam.todolistID, seaParam.taskID)
        return {todolistID: seaParam.todolistID, taskID: seaParam.taskID}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})

export const addTask = createAsyncThunk<ItemType, { todolistID: string, title: string }, ThunkErrorType>(tasksActionsEnum.ADD_TASK, async (seaParam, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        const sea = await tasksAPI.addTask(seaParam.todolistID, seaParam.title)
        if (sea.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return sea.data.item
        } else {
            seaHandleServer(sea, thunkAPI.dispatch, false)
            return thunkAPI.rejectWithValue({errors: sea.messages, fieldsErrors: sea.fieldsErrors})
        }
    } catch (err: any) {
        // seaHandleNetwork(err, dispatch, false)
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'idle'}))
    }

})
export const changeTask = createAsyncThunk(tasksActionsEnum.CHANGE_TASK, async (seaParam: { todolistID: string, taskID: string, model: UpdateSeaTaskType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as seaReducerType
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
    dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'loading'}))
    dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: true}))
    try {
        let res = await tasksAPI.changeTask(seaParam.todolistID, seaParam.taskID, apiModel)
        const {item} = res.data.data
        if (res.data.resultCode === 0) {
            // dispatch(changeTaskAC({todolistID: seaParam.todolistID, taskID: seaParam.taskID, item: item}))
            // dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: false}))
            return {seaParam, item: item}
        } else {
            seaHandleServer(res.data, dispatch)
            dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'failed'}))
            dispatch(getTasks(seaParam.todolistID))
            return rejectWithValue({})
        }
    } catch (e: any) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue({})

    } finally {
        dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: false}))
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})

export const reorderTask = createAsyncThunk(tasksActionsEnum.reorderTask, async (seaParam: { todolistID: string, taskID: string, putAfterItemId: string | null }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let res = await tasksAPI.reorderTask(seaParam.todolistID, seaParam.taskID, seaParam.putAfterItemId)
        if (res.data.resultCode === 0) {
            dispatch(getTasks(seaParam.todolistID))
        } else {
            seaHandleServer(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e: any) {
        const err: AxiosError = e
        seaHandleNetwork(err, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }

})