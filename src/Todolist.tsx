import React from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type FilterType = 'all' | 'complited' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = { [key: string]: Array<TaskType> }
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, filter: FilterType) => void
    addTask: (todolistID: string, newTitle: string) => void
    filter: FilterType
    todolistID: string
    changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const removeTaskHandler = (id: string) => props.removeTask(props.todolistID, id)
    const changeTaskFilterHandler = (filterValue: FilterType) => props.changeFilter(props.todolistID, filterValue)
    const changeTaskStatusHandler = (id: string, isDone: boolean) => props.changeTaskStatus(props.todolistID, id, isDone)
    const removeTodolistHandler = () => props.removeTodolist(props.todolistID)
    const changeTaskTitleHandler=(id:string,title:string)=>props.changeTaskTitle(props.todolistID,id,title)


    return <div>
        <h3>{props.title}
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete />
            </IconButton>
        </h3>
        <AddForm addFn={addTaskHandler}/>

        <ul>
            {props.tasks.map(m => {
                return <li key={m.id}>
                    <input type="checkbox" checked={m.isDone}
                           onChange={(e) => changeTaskStatusHandler(m.id, e.currentTarget.checked)}/>
                   <EditSpan title={m.title} callback={changeTaskTitleHandler} id={m.id} isDone={m.isDone}/>
                    <IconButton aria-label="delete" onClick={() => removeTaskHandler(m.id)}>
                        <Delete />
                    </IconButton>
                </li>
            })}
        </ul>
        <div>
            <Button variant={props.filter === 'all' ?"contained":'outlined'}
                                onClick={() => changeTaskFilterHandler('all')}>All</Button>
            <Button variant={props.filter === 'active' ?"contained":'outlined'}
                                onClick={() => changeTaskFilterHandler('active')}>Active</Button>
            <Button variant={props.filter === 'complited' ?"contained":'outlined'}
                            onClick={() => changeTaskFilterHandler('complited')}>Complited</Button>
        </div>
    </div>
}
