import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {TodolistsListPropsType} from "./Todolist/TodolistTypes";


const TodolistsList = React.memo(({t,todoTasks}:TodolistsListPropsType) => {
    return  <Todolist todolist={t}
                      todoTasks={todoTasks}
    />
});

export default TodolistsList;