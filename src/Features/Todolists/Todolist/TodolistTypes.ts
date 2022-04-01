import {ApiTodolistType, ItemType} from "../../../Api/ApiTypes";
import {seaStatusTypes} from "../../SeaApp/AppTypes";

export type TodolistsListPropsType={
    t:SeaTodolistsType
    todoTasks:ItemType[]
}


export type FilterType = 'all' | 'complited' | 'active'

export type SeaTodolistsType = ApiTodolistType & {
    filter: FilterType, todolistStatus: seaStatusTypes
}