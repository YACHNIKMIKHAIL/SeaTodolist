import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodolists, getTodolists, postTodolists, removeTodolists, reorderTodolists} from "./TodolistsActions";
import {FilterType, SeaTodolistsType} from "../TodolistTypes";
import {seaStatusTypes} from "../../../SeaApp/AppTypes";


export const slice = createSlice({
    name: 'todolist',
    initialState: [] as SeaTodolistsType[],
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistStatus(state, action: PayloadAction<{ todolistId: string, status: seaStatusTypes }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, todolistStatus: action.payload.status} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].todolistStatus = action.payload.status
        },
    },
    extraReducers: (builder => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            return action.payload.data.map(m => ({...m, filter: 'all', todolistStatus: 'idle'}))
        })
        builder.addCase(postTodolists.fulfilled, (state, action) => {
            state.unshift({...action.payload.item, filter: 'all', todolistStatus: 'idle'})
        })
        builder.addCase(removeTodolists.fulfilled, (state, action) => {
            // return state.filter(f => f.id !== action.payload.todolistId)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodolists.fulfilled, (state, action) => {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        });
        builder.addCase(reorderTodolists.fulfilled, () => {

        })
    })
})
export const todolistReducer = slice.reducer
export const {
    changeTodolistFilter,
    changeTodolistStatus
} = slice.actions

