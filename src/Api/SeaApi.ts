import axios from "axios";
import {
    ApiTaskType,
    ApiTodolistType,
    initialLoginType,
    ItemType,
    PostTodolistType,
    SeaResponseType,
    UpdateTaskType
} from "./ApiTypes";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        "API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<ApiTodolistType>>(`/todo-lists`)
            .then(res => {
                return res.data
            })
    },
    postTodolists(title: string) {
        return instance.post<PostTodolistType>(`/todo-lists`, {title})
            .then(res => {
                return res.data
            })
    },
    deleteTodolists(todolistID: string) {
        return instance.delete<SeaResponseType>(`/todo-lists/${todolistID}`)
            .then(res => {
                return res.data
            })
    },
    changeTodolists(todolistID: string, title: string) {
        return instance.put<SeaResponseType>(`/todo-lists/${todolistID}`, {title})

    },
    reorderTodolists(todolistID: string, putAfterItemId: string | null) {
        return instance.put<SeaResponseType>(`/todo-lists/${todolistID}/reorder`, {putAfterItemId: putAfterItemId})

    }
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Complited = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export const tasksAPI = {
    async getTasks(todolistID: string) {
        let res = await instance.get<ApiTaskType>(`/todo-lists/${todolistID}/tasks`)
        return res.data
    },

    async addTask(todolistID: string, title: string) {
        let res = await instance.post<SeaResponseType<{
            item: ItemType
        }>>(`/todo-lists/${todolistID}/tasks`, {title})
        return res.data
    },

    async removeTask(todolistID: string, taskID: string) {
        await instance.delete<SeaResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    async changeTask(todolistID: string, taskID: string, model: UpdateTaskType) {
        return await instance.put<SeaResponseType<{
            item: ItemType
        }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
    reorderTask(todolistID: string, taskID: string, putAfterItemId: string | null) {
        return instance.put<SeaResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}/reorder`, {putAfterItemId: putAfterItemId})

    }
}

export const seaAuthAPI = {
    async login(seaData: initialLoginType) {
        return await instance.post<SeaResponseType<{
            userId?: number
        }>>(`/auth/login`, seaData)

    },
    async me() {
        return await instance.get<SeaResponseType<{
            id: number,
            login: string,
            email: string
        }>>(`/auth/me`)

    },
    async logOut() {
        return await instance.delete<SeaResponseType>(`/auth/login`)
    }
}