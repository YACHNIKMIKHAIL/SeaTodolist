import {createAsyncThunk} from "@reduxjs/toolkit";
import {seaAsyncHandleNetwork, seaHandleAsyncServer} from "../../../../SeaUtils/SeaErrorUtils";
import {AxiosError} from "axios";
import {changeTodolistStatus} from "./TodolistReducer";
import {loadTask} from "./TaskReducer";
import {tasksActionsEnum, UpdateSeaTaskType} from "../ActionsEnum/TasksActionsEnum";
import {appActions} from "../../../SeaApplication/applicationIndex";
import {tasksAPI} from "../../../../Api/SeaApi";
import {ItemType, UpdateTaskType} from "../../../../Api/ApiTypes";
import {seaReducerType} from "../../../../App/AppTypes";
import {ThunkErrorAPIConfigType} from "../../../../SeaUtils/UtilsTypes";

const {setSeaAppStatus} = appActions

export const getTasks = createAsyncThunk(tasksActionsEnum.SET_TASKS_FROM_SERVER, async (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        const sea = await tasksAPI.getTasks(todolistID)
        const tasks = sea.items
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
        return {tasks, todolistID}
    } catch (err: any) {
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'idle'}))
    }
})

export const removeTask = createAsyncThunk(tasksActionsEnum.REMOVE_TASK, async (seaParam: { todolistID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        await tasksAPI.removeTask(seaParam.todolistID, seaParam.taskID)
        return {todolistID: seaParam.todolistID, taskID: seaParam.taskID}
    } catch (err: any) {
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})

export const addTask = createAsyncThunk<ItemType, { todolistID: string, title: string }, ThunkErrorAPIConfigType>
(tasksActionsEnum.ADD_TASK, async (seaParam, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        const sea = await tasksAPI.addTask(seaParam.todolistID, seaParam.title)
        if (sea.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return sea.data.item
        } else {
            return seaHandleAsyncServer(sea, thunkAPI, false)
        }
    } catch (err: any) {
        // seaHandleNetwork(err, dispatch, false)
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'idle'}))
    }

})
export const changeTask = createAsyncThunk(tasksActionsEnum.CHANGE_TASK, async (seaParam: { todolistID: string, taskID: string, model: UpdateSeaTaskType }, thunkAPI) => {

    const {
        dispatch,
        rejectWithValue,
        getState
    } = thunkAPI

    const state = getState() as seaReducerType
    const actualTaskParams = state.tasks[seaParam.todolistID].filter((f: { id: string; }) => f.id === seaParam.taskID)[0]
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
            dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'failed'}))
            dispatch(getTasks(seaParam.todolistID))
            return seaHandleAsyncServer(res.data, thunkAPI)
        }
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI)
    } finally {
        dispatch(loadTask({todolistID: seaParam.todolistID, taskID: seaParam.taskID, loading: false}))
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})

export const reorderTask = createAsyncThunk(tasksActionsEnum.reorderTask, async (seaParam: { todolistID: string, taskID: string, putAfterItemId: string | null }, thunkAPI) => {
    const {
        dispatch,
        rejectWithValue
    } = thunkAPI

    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let res = await tasksAPI.reorderTask(seaParam.todolistID, seaParam.taskID, seaParam.putAfterItemId)
        if (res.data.resultCode === 0) {
            dispatch(getTasks(seaParam.todolistID))
        } else {
            return seaHandleAsyncServer(res.data, thunkAPI)
        }
    } catch (e: any) {
        const err: AxiosError = e
        seaAsyncHandleNetwork(err, thunkAPI)
        return rejectWithValue(null)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }

})