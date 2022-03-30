import {ApiTodolistType} from "../../../../Api/SeaApi";
import {seaStatusTypes} from "../../../../App/SeaAppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodolistsTC, getTodolistsTC, postTodolistsTC, removeTodolistsTC} from "./TodolistsActions";


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
