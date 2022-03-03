import {seaTodolistActions, seaReturnedTodolistActionsTypes, TodolistActions} from "../Actions/TodolistsActions";
import {initialTodolists} from "../../../../State/initailsStates";
import {ApiTodolistType} from "../../../../Api/SeaApi";
import {seaStatusTypes} from "../../../../App/SeaAppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'todolist',
    initialState: initialTodolists,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            state.filter(f => f.id !== action.payload.todolistId)
        },
        addTodolistAC(state, action: PayloadAction<{ item: ApiTodolistType }>) {
            [{...action.item, filter: 'all', todolistStatus: 'idle'}, ...state]
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, newTitle: string }>) {
            state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m)
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
            state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
        },
        setTodoFromServAC(state, action: PayloadAction<{ data: ApiTodolistType[] }>) {
            action.payload.data.map(m => ({...m, filter: 'all', todolistStatus: 'idle'}))
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: seaStatusTypes }>) {
            state.map(m => m.id === action.payload.todolistId ? {...m, todolistStatus: action.payload.status} : m)
        },
    }
})
export const todolistReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodoFromServAC,
    changeTodolistStatusAC
} = slice.actions

//     (state: SeaTodolistsType[] = initialTodolists, action: seaTodolistActionsType): SeaTodolistsType[] => {
//
//     switch (action.type) {
//         case TodolistActions.REMOVE_TODOLIST: {
//             return state.filter(f => f.id !== action.todolistId)
//         }
//         case TodolistActions.ADD_TODOLIST: {
//             return [{...action.item, filter: 'all',todolistStatus:'idle'}, ...state]
//         }
//         case TodolistActions.CHANGE_TODOLIST_TITLE: {
//             return state.map(m => m.id === action.todolistId ? {...m, title: action.newTitle} : m)
//         }
//         case TodolistActions.CHANGE_TODOLIST_FILTER: {
//             return state.map(m => m.id === action.todolistId ? {...m, filter: action.filter} : m)
//         }
//         case TodolistActions.SET_FROM_SERVER: {
//             return action.data.map(m => ({...m, filter: 'all',todolistStatus:'idle'}))
//         }
//         case TodolistActions.CHANGE_TODOLIST_STATUS: {
//             return state.map(m=>m.id===action.todolistId?{...m,todolistStatus:action.status}:m)
//         }
//         default:
//             return state
//     }
// }

export type FilterType = 'all' | 'complited' | 'active'


export type seaTodolistActionsType =
    ReturnType<seaReturnedTodolistActionsTypes<typeof seaTodolistActions>>
export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType, todolistStatus: seaStatusTypes
}
