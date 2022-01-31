import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        "API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get(`/todo-lists`)
            .then(res => {
                debugger
                return res.data
            })
            .catch(err => console.log('err: ' + err))
    },
    postTodolists(title: string) {
        return instance.post(`/todo-lists`, {title})
            .then(res => {
                debugger
                return res.data
            })
            .catch(err => console.log('err: ' + err))
    },
    deleteTodolists(todolistID: string) {
        return instance.delete(`/todo-lists/${todolistID}`)
            .then(res => {
                debugger
                return res.data
            })
            .catch(err => console.log('err: ' + err))
    },
    changeTodolists(todolistID: string, title: string) {
        return instance.put(`/todo-lists/${todolistID}`, {title})
            .then(res => {
                debugger
                return res.data
            })
            .catch(err => console.log('err: ' + err))
    }
}
export const tasksAPI = {
    getTasks(todolistID: string) {
        return instance.get(`/todo-lists/${todolistID}/tasks`)
            .then(res => {
                debugger
                console.log(res)
                return res.data
            })
    },
    addTask(todolistID: string, title: string) {
        return instance.post(`/todo-lists/${todolistID}/tasks`, {title})
            .then(res => {
                debugger
                console.log(res)
                return res.data
            })
    },
    changeTaskTitle(todolistID: string, taskID: string, title: string) {
        return instance.put(`/todo-lists/${todolistID}/tasks/${taskID}`, {title})
            .then(res => {
                debugger
                console.log(res)
                return res.data
            })
    },
    changeTaskStatus(todolistID: string, taskID: string, status: number, title: string) {
        return instance.put(`/todo-lists/${todolistID}/tasks/${taskID}`, {status, title})
            .then(res => {
                debugger
                console.log(res)
                return res.data
            })
    },
    removeTask(todolistID: string, taskID: string) {
        return instance.delete(`/todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res => {
                debugger
                console.log(res)
                return res.data
            })
    }
}