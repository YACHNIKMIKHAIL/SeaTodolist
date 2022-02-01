import {
    addTodolistACType,
    changeTodolistFilterACType,
    changeTodolistTitleACType,
    removeTodolistACType, setTodoFromServACType,
    TodolistActions
} from "./TodolistsActions";
import {initialTodolists} from "./initailsStates";
import {ApiTodolistType} from "../Api/SeaApi";

export type FilterType = 'all' | 'complited' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType
}


export const todolistReducer = (state: SeaTodolistsType[] = initialTodolists, action: todolistActionsType): SeaTodolistsType[] => {
    debugger
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.todolistId)
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{...action.item, filter: 'all'}, ...state]
        }
        case TodolistActions.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.todolistId ? {...m, title: action.newTitle} : m)
        }
        case TodolistActions.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.todolistId ? {...m, filter: action.filter} : m)
        }
        case TodolistActions.SET_FROM_SERVER: {
            debugger
            return action.data.map(m=>({...m,filter: 'all'}))
        }
        default:
            return state
    }
}
export type todolistActionsType =
    removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType
    | setTodoFromServACType