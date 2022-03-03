import {initialTodolists} from "../../../../State/initailsStates";
import {ApiTodolistType} from "../../../../Api/SeaApi";
import {seaStatusTypes} from "../../../../App/SeaAppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {seaReturnedTodolistActionsTypes} from "../Actions/TodolistsActions";


const slice = createSlice({
    name: 'todolist',
    initialState: initialTodolists,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            // return state.filter(f => f.id !== action.payload.todolistId)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ item: ApiTodolistType }>) {
            state.unshift({...action.payload.item, filter: 'all', todolistStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, newTitle: string }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        setTodoFromServAC(state, action: PayloadAction<{ data: ApiTodolistType[] }>) {
            return action.payload.data.map(m => ({...m, filter: 'all', todolistStatus: 'idle'}))
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: seaStatusTypes }>) {
            // return state.map(m => m.id === action.payload.todolistId ? {...m, todolistStatus: action.payload.status} : m)
            const index = state.findIndex(f => f.id === action.payload.todolistId)
            state[index].todolistStatus = action.payload.status
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


// export type seaTodolistActionsType =
//     ReturnType<seaReturnedTodolistActionsTypes<typeof seaTodolistActions>>
export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType, todolistStatus: seaStatusTypes
}
