import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {todolistAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {changeTodolistStatus} from "./TodolistReducer";
import {getTasks} from "./TasksActions";
import {TodolistActions} from "../ActionsEnum/TodolistsActionsEnum";

export const getTodolists = createAsyncThunk(TodolistActions.SET_FROM_SERVER, async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.getTodolists()
        return {data: sea}
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const postTodolists = createAsyncThunk(TodolistActions.ADD_TODOLIST, async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.postTodolists(title)
        if (sea.resultCode === 0) {
            const {item} = sea.data;
            return {item: item}
        } else {
            seaHandleServer(sea, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const removeTodolists = createAsyncThunk(TodolistActions.REMOVE_TODOLIST, async (param: { todolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: param.todolistID, status: 'loading'}))
    try {
        await todolistAPI.deleteTodolists(param.todolistID)
        return {todolistId: param.todolistID}
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const changeTodolists = createAsyncThunk(TodolistActions.CHANGE_TODOLIST, async (seaParam: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'loading'}))
    try {
        let sea = await todolistAPI.changeTodolists(seaParam.todolistID, seaParam.title)
        if (sea.data.resultCode === 0) {
            return {todolistId: seaParam.todolistID, newTitle: seaParam.title}
        } else {
            seaHandleServer(sea.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue(null)

    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})

export const reorderTodolists = createAsyncThunk(TodolistActions.REORDER_TODOLIST, async (seaParam: { todolistID: string, putAfterItemId: string | null }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'loading'}))
    try {
        let sea = await todolistAPI.reorderTodolists(seaParam.todolistID, seaParam.putAfterItemId)
        if (sea.data.resultCode === 0) {
            dispatch(getTodolists())
            dispatch(getTasks(seaParam.todolistID))
        } else {
            seaHandleServer(sea.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
        return rejectWithValue(null)

    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatus({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})