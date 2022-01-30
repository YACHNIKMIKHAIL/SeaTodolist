import axios from "axios";
import {log} from "util";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    // headers: {
    //     "API_KEY": "f3780d4e-e27d-4ed7-8c76-99fbe5827e3f"
    // }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get(`/todo-lists`)
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
    }
}