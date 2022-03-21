import {ApiTodolistType, todolistAPI} from "../../../../Api/SeaApi";
import {seaStatusTypes, setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {getTasksTC} from "./TaskReducer";
import {TodolistActions} from "../Actions/TodolistsActions";

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
    console.log('reorderTodolistsTC')
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


const slice = createSlice({
    name: 'todolist',
    initialState: [] as SeaTodolistsType[],
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: seaStatusTypes }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, todolistStatus: action.payload.status} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].todolistStatus = action.payload.status
        },
    },
    extraReducers: (builder => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            return action.payload.data.map(m => ({...m, filter: 'all', todolistStatus: 'idle'}))
        })
        builder.addCase(postTodolistsTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.item, filter: 'all', todolistStatus: 'idle'})
        })
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
            // return state.filter(f => f.id !== action.payload.todolistId)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodolistsTC.fulfilled, (state, action) => {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        })
    })
})
export const todolistReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistStatusAC
} = slice.actions

export type FilterType = 'all' | 'complited' | 'active'

export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType, todolistStatus: seaStatusTypes
}
