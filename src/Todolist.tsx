import React from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";

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
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddForm addFn={addTaskHandler}/>

        <ul>
            {props.tasks.map(m => {
                return <li key={m.id}>
                    <input type="checkbox" checked={m.isDone}
                           onChange={(e) => changeTaskStatusHandler(m.id, e.currentTarget.checked)}/>
                   <EditSpan title={props.title} callback={changeTaskTitleHandler} id={m.id} isDone={m.isDone}/>
                    <button onClick={() => removeTaskHandler(m.id)}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button style={props.filter === 'all' ? {backgroundColor: 'hotpink', color: 'white'} : {color: 'purple'}}
                    onClick={() => changeTaskFilterHandler('all')}>All
            </button>
            <button style={props.filter === 'active' ? {backgroundColor: 'hotpink', color: 'white'} : {color: 'purple'}}
                    onClick={() => changeTaskFilterHandler('active')}>Active
            </button>
            <button
                style={props.filter === 'complited' ? {backgroundColor: 'hotpink', color: 'white'} : {color: 'purple'}}
                onClick={() => changeTaskFilterHandler('complited')}>Complited
            </button>
        </div>
    </div>
}
