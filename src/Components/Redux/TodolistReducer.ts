import {
    addTodolistACType,
    changeTodolistFilterACType,
    changeTodolistTitleACType,
    removeTodolistACType, setTodoFromServACType,
    TodolistActions
} from "./TodolistsActions";
import {initialTodolists} from "./initailsStates";

export type FilterType = 'all' | 'complited' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export const todolistReducer = (state: TodolistType[] = initialTodolists, action: todolistActionsType): TodolistType[] => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.todolistId)
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{id: action.item.id, title: action.item.title, filter: 'all'}, ...state]
        }
        case TodolistActions.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.todolistId ? {...m, title: action.newTitle} : m)
        }
        case TodolistActions.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.todolistId ? {...m, filter: action.filter} : m)
        }
        case TodolistActions.SET_FROM_SERVER: {
            debugger
            return [...state,...action.data]
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