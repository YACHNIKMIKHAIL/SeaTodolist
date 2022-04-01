import {TaskPriorities, TaskStatuses} from "./SeaApi";

export type ApiTodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type PostTodolistType = {
    data: {
        item: {
            id: string,
            title: string,
            addedDate: string,
            order: number
        }
    },
    messages: [],
    fieldsErrors: [],
    resultCode: number
}
export type FielErrorType={ field: string, error: string }
export type SeaResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors?: Array<FielErrorType>
    resultCode: number
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type ItemType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    addedDate: string
} & { loading: boolean }
export type ApiTaskType = {
    items: Array<ItemType>
    totalCount: number
    error: string | null
}

export type initialLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}