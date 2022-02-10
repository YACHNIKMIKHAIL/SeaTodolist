import {seaTodolistActions, seaReturnedTodolistActionsTypes, TodolistActions} from "../Actions/TodolistsActions";
import {initialTodolists} from "../../../../State/initailsStates";
import {ApiTodolistType} from "../../../../Api/SeaApi";

export const todolistReducer = (state: SeaTodolistsType[] = initialTodolists, action: seaTodolistActionsType): SeaTodolistsType[] => {

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
            return action.data.map(m => ({...m, filter: 'all'}))
        }
        default:
            return state
    }
}

export type seaTodolistActionsType =
    ReturnType<seaReturnedTodolistActionsTypes<typeof seaTodolistActions>>


export type FilterType = 'all' | 'complited' | 'active'
export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType
}
