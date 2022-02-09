import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {SeaTodolistsType} from "./Todolist/Reducers/TodolistReducer";
import {ItemType} from "../../Api/SeaApi";

type TodolistsListPropsType={
    t:SeaTodolistsType
    todoTasks:ItemType[]
}
const TodolistsList = ({t,todoTasks}:TodolistsListPropsType) => {
    return  <Todolist todolist={t}
                      todoTasks={todoTasks}
    />
};

export default TodolistsList;