import axios from "axios";

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

export type SeaResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

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
        // .catch(err => console.log('err: ' + err))
    },
    postTodolists(title: string) {
        return instance.post<PostTodolistType>(`/todo-lists`, {title})
            .then(res => {
                return res.data
            })
        // .catch(err => console.log('err: ' + err))
    },
    deleteTodolists(todolistID: string) {
        return instance.delete<SeaResponseType>(`/todo-lists/${todolistID}`)
            .then(res => {
                return res.data
            })
        // .catch(err => console.log('err: ' + err))
    },
    changeTodolists(todolistID: string, title: string) {
        return instance.put<SeaResponseType>(`/todo-lists/${todolistID}`, {title})
            .then(res => {
                return res.data
            })
            .catch(err => console.log('err: ' + err))
    }
}
export type ItemType = {
    id: string,
    title: string,
    description: null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null,
    deadline: null,
    addedDate: string
}
export type ApiTaskType = {
    items: Array<ItemType>
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks(todolistID: string) {
        return instance.get<ApiTaskType>(`/todo-lists/${todolistID}/tasks`)
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    addTask(todolistID: string, title: string) {
        return instance.post<SeaResponseType<{
            item: ItemType
        }>>(`/todo-lists/${todolistID}/tasks`, {title})
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    changeTaskTitle(todolistID: string, taskID: string, title: string) {
        return instance.put<SeaResponseType<{
            item: ItemType
        }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, {title})
            .then(res => {
                console.log(res)
                return res.data.data.item
            })
    },
    changeTaskStatus(todolistID: string, taskID: string, status: number, title: string) {
        return instance.put<SeaResponseType<{
            item: ItemType
        }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, {status, title})
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    removeTask(todolistID: string, taskID: string) {
        return instance.delete<SeaResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res => {
                console.log(res)
                return res.data
            })
    }
}