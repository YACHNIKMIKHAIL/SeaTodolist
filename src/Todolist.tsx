import React from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Components/Redux/TodolistsActions";

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
    // title: string
    // tasks: Array<TaskType>
    // removeTask: (todolistID: string, id: string) => void
    // changeFilter: (todolistID: string, filter: FilterType) => void
    // addTask: (todolistID: string, newTitle: string) => void
    // filter: FilterType
    todolistID: string
    // changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
    // removeTodolist: (todolistID: string) => void
    // changeTaskTitle: (todolistID: string, id: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
    const actualTodolist=useSelector<reducerType,TodolistType>(state=>state.todolists.filter(f=>f.id===props.todolistID)[0])

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const removeTaskHandler = (id: string) => props.removeTask(props.todolistID, id)
    // const changeTaskFilterHandler = (filterValue: FilterType) => props.changeFilter(props.todolistID, filterValue)
    const changeTaskStatusHandler = (id: string, isDone: boolean) => props.changeTaskStatus(props.todolistID, id, isDone)
    // const removeTodolistHandler = () => props.removeTodolist(props.todolistID)
    const changeTaskTitleHandler=(id:string,title:string)=>props.changeTaskTitle(props.todolistID,id,title)

    const dispatch = useDispatch()
    const changeFilter = ( filter: FilterType) => {
        dispatch(changeTodolistFilterAC(props.todolistID, filter))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }
    const changeTodolistTitle = (  title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID,  title))
    }
    let tasksForRender = tasks[props.todolistID]
    if (actualTodolist.filter === 'complited') {
        tasksForRender = tasks[props.todolistID].filter(f => f.isDone)
    }
    if (actualTodolist.filter === 'active') {
        tasksForRender = tasks[props.todolistID].filter(f => !f.isDone)
    }
    return <div>
        <h3> <EditSpan title={actualTodolist.title} callback={changeTodolistTitle} id={props.todolistID}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddForm addFn={addTaskHandler}/>
        <div>
            {tasksForRender.map(m => {
                return <div key={m.id}>
                    <input type="checkbox" checked={m.isDone}
                           onChange={(e) => changeTaskStatusHandler(m.id, e.currentTarget.checked)}/>
                   <EditSpan title={m.title} callback={changeTaskTitleHandler} id={m.id} isDone={m.isDone}/>
                    <IconButton aria-label="delete" onClick={() => removeTaskHandler(m.id)}>
                        <Delete />
                    </IconButton>
                </div>
            })}
        </div>
        <div>
            <Button variant={actualTodolist.filter === 'all' ?"contained":'outlined'}
                                onClick={() => changeFilter('all')}>All</Button>
            <Button variant={actualTodolist.filter === 'active' ?"contained":'outlined'}
                                onClick={() => changeFilter('active')}>Active</Button>
            <Button variant={actualTodolist.filter === 'complited' ?"contained":'outlined'}
                            onClick={() => changeFilter('complited')}>Complited</Button>
        </div>
    </div>
}
