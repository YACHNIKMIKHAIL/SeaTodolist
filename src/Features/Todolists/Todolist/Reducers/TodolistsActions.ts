import {createAsyncThunk} from "@reduxjs/toolkit";
import {todolistAPI} from "../../../../Api/SeaApi";
import {
    seaAsyncHandleNetwork,
    seaHandleAsyncServer,
} from "../../../../SeaUtils/SeaErrorUtils";
import {changeTodolistStatus} from "./TodolistReducer";
import {getTasks} from "./TasksActions";
import {TodolistActions} from "../ActionsEnum/TodolistsActionsEnum";
import {appActions} from "../../../SeaApplication/applicationIndex";
import {ThunkErrorAPIConfigType} from "../../../../SeaUtils/UtilsTypes";
import {SeaTodolistsType} from "../TodolistTypes";

const {setSeaAppStatus} = appActions

export const getTodolists = createAsyncThunk<{ data: SeaTodolistsType[] }, undefined, ThunkErrorAPIConfigType>(TodolistActions.SET_FROM_SERVER, async (param, thunkAPI) => {
    const {
        dispatch
    } = thunkAPI

    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.getTodolists()
        return {data: sea}
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const postTodolists = createAsyncThunk<{ item: { id: string; title: string; addedDate: string; order: number } },
    string, ThunkErrorAPIConfigType>
(TodolistActions.ADD_TODOLIST, async (title: string, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.postTodolists(title)
        if (sea.resultCode === 0) {
            const {item} = sea.data;
            return {item: item}
        } else {
            return seaHandleAsyncServer(sea, thunkAPI, false)
        }
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const removeTodolists = createAsyncThunk<{ todolistId: string },
    { todolistID: string }, ThunkErrorAPIConfigType>(TodolistActions.REMOVE_TODOLIST, async (param, thunkAPI) => {
    const {
        dispatch,
    } = thunkAPI

    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: param.todolistID, status: 'loading'}))
    try {
        await todolistAPI.deleteTodolists(param.todolistID)
        return {todolistId: param.todolistID}
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const changeTodolists = createAsyncThunk<{todolistId: string, newTitle: string},
    { todolistID: string, title: string }, ThunkErrorAPIConfigType>(TodolistActions.CHANGE_TODOLIST, async (seaParam, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'loading'}))

    try {
        let sea = await todolistAPI.changeTodolists(seaParam.todolistID, seaParam.title)
        if (sea.data.resultCode === 0) {
            return {todolistId: seaParam.todolistID, newTitle: seaParam.title}
        } else {
            return seaHandleAsyncServer(sea.data, thunkAPI, false)
        }
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI, false)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})

export const reorderTodolists = createAsyncThunk<void, { todolistID: string, putAfterItemId: string | null }, ThunkErrorAPIConfigType>(TodolistActions.REORDER_TODOLIST, async (seaParam, thunkAPI) => {
    const {
        dispatch,
    } = thunkAPI

    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'loading'}))
    try {
        let sea = await todolistAPI.reorderTodolists(seaParam.todolistID, seaParam.putAfterItemId)
        if (sea.data.resultCode === 0) {
            dispatch(getTodolists())
            dispatch(getTasks(seaParam.todolistID))
        } else {
            return seaHandleAsyncServer(sea.data, thunkAPI)
        }
    } catch (e: any) {
        return seaAsyncHandleNetwork(e, thunkAPI)

    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})