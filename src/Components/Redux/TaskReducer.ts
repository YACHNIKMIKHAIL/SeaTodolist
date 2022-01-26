import {addTodolistACType, removeTodolistACType, TodolistActions} from "./TodolistReducer";
import {TasksStateType} from "../../Todolist";

export const taskReducer = (state: TasksStateType, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case TodolistActions.ADD_TODOLIST: {
            return {[action.newID]: [], ...state}
        }
        case TodolistActions.REMOVE_TODOLIST: {
            let taskCopy = {...state}
            delete taskCopy[action.todolistId]
            return taskCopy
        }
        default:
            return state
    }
}
export type tasksActionsType = addTodolistACType | removeTodolistACType

export enum tasksActions {
    ADD_TODOLIST = 'ADD_TODOLIST'
}

// export type addTodolistACType = ReturnType<typeof addTodolistAC>
// export const addTodolistAC = (newTitle: string) => {
//     return {
//         type: TodolistActions.ADD_TODOLIST, newTitle, newID: v1()
//     } as const
// }