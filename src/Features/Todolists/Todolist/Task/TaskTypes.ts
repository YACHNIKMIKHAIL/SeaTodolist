import {ItemType} from "../../../../Api/ApiTypes";

export type TaskPropsType = {
    id: string
    todolistID: string
    taskBackground: string
}

export type TasksStateType = { [key: string]: Array<ItemType> }