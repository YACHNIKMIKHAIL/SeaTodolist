import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodolistActions} from "../Actions/TodolistsActions";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {todolistAPI} from "../../../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {Dispatch} from "redux";
import {changeTodolistStatusAC} from "./TodolistReducer";
import {getTasksTC} from "./TasksActions";

export const getTodolistsTC = createAsyncThunk(TodolistActions.SET_FROM_SERVER, async (param, {
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
export const postTodolistsTC = createAsyncThunk(TodolistActions.ADD_TODOLIST, async (title: string, {
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
export const removeTodolistsTC = createAsyncThunk(TodolistActions.REMOVE_TODOLIST, async (param: { todolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: param.todolistID, status: 'loading'}))
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
export const changeTodolistsTC = createAsyncThunk(TodolistActions.CHANGE_TODOLIST, async (seaParam: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: seaParam.todolistID, status: 'loading'}))
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
        dispatch(changeTodolistStatusAC({todolistId: seaParam.todolistID, status: 'succesed'}))
    }
})
export const reorderTodolistsTC = (todolistID: string, putAfterItemId: string | null) => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'loading'}))

    try {
        let sea = await todolistAPI.reorderTodolists(todolistID, putAfterItemId)
        if (sea.data.resultCode === 0) {
            dispatch(getTodolistsTC())
            dispatch(getTasksTC(todolistID))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'succesed'}))
    }
}