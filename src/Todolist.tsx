import React, {useCallback} from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Components/Redux/TodolistsActions";
import Task from "./Components/Task";
import {addTaskAC} from "./Components/Redux/TasksActions";

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
    todolistID: string
}

export const Todolist = React.memo(({todolistID}: PropsType) => {
        const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
        const actualTodolist = useSelector<reducerType, TodolistType>(state => state.todolists.filter(f => f.id === todolistID)[0])
        const dispatch = useDispatch()

        const changeFilter = useCallback((filter: FilterType) => {
            dispatch(changeTodolistFilterAC(todolistID, filter))
        }, [dispatch, todolistID])
        const removeTodolist = useCallback(() => {
            dispatch(removeTodolistAC(todolistID))
        }, [dispatch, todolistID])
        const changeTodolistTitle = useCallback((title: string) => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        }, [dispatch, todolistID])
        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskAC(todolistID, newTitle))
        }, [dispatch, todolistID])

        let tasksForRender = tasks[todolistID]
        if (actualTodolist.filter === 'complited') {
            tasksForRender = tasks[todolistID].filter(f => f.isDone)
        }
        if (actualTodolist.filter === 'active') {
            tasksForRender = tasks[todolistID].filter(f => !f.isDone)
        }
        console.log(`Todolist ${todolistID}`)
        return <div>
            <h3 style={{display:'flex',justifyContent:'center',alignItems:'center',color:'rgba(11,37,75,0.78)'}}>
                <EditSpan title={actualTodolist.title} callback={changeTodolistTitle} id={todolistID}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddForm addFn={addTask}/>
            <div>
                {tasksForRender.map((m, i) => {
                    return <Task key={i} id={m.id} todolistID={todolistID}/>
                })}
            </div>
            <div>
                <Button variant={actualTodolist.filter === 'all' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={actualTodolist.filter === 'active' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={actualTodolist.filter === 'complited' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('complited')}>Complited</Button>
            </div>
        </div>
    }
)