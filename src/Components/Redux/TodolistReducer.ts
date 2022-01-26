import {TodolistType} from "../../Todolist";
import {
    addTodolistACType,
    changeTodolistFilterACType,
    changeTodolistTitleACType,
    removeTodolistACType,
    TodolistActions
} from "./TodolistsActions";
import {initialTodolists} from "./initailsStates";

export const todolistReducer = (state: TodolistType[] = initialTodolists, action: todolistActionsType): TodolistType[] => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.todolistId)
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{id: action.newID, title: action.newTitle, filter: 'all'}, ...state]
        }
        case TodolistActions.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.todolistId ? {...m, title: action.newTitle} : m)
        }
        case TodolistActions.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.todolistId ? {...m, filter: action.filter} : m)
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