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
    todolist: TodolistType
    todoTasks: Array<TaskType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        console.log('todolist')
        // const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
        // const actualTodolist = useSelector<reducerType, TodolistType>(state => state.todolists.filter(f => f.id === todolistID)[0])
        const dispatch = useDispatch()

        // const changeFilter = useCallback((filter: FilterType) => {
        //     dispatch(changeTodolistFilterAC(todolist.id, filter))
        // }, [dispatch, todolist.id])

        const changeFilter = (filter: FilterType) => {
            if (filter === todolist.filter) {
                return
            }
            dispatch(changeTodolistFilterAC(todolist.id, filter))
        }

        const removeTodolist = useCallback(() => {
            dispatch(removeTodolistAC(todolist.id))
        }, [dispatch, todolist.id])

        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskAC(todolist.id, newTitle))
        }, [dispatch, todolist.id])

        let tasksForRender = todoTasks
        if (todolist.filter === 'complited') {
            tasksForRender = todoTasks.filter(f => f.isDone)
        }
        if (todolist.filter === 'active') {
            tasksForRender = todoTasks.filter(f => !f.isDone)
        }
        return <div>
            <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'rgba(11,37,75,0.78)'}}>
                <EditSpan title={todolist.title} id={todolist.id}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddForm addFn={addTask}/>
            <div>
                {tasksForRender.map((m, i) => {
                    return <Task key={i} id={m.id} todolistID={todolist.id}/>
                })}
            </div>
            <div>
                <Button variant={todolist.filter === 'all' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={todolist.filter === 'active' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={todolist.filter === 'complited' ? "contained" : 'outlined'}
                        onClick={() => changeFilter('complited')}>Complited</Button>
            </div>
        </div>
    }
)