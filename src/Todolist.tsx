import React, {useCallback} from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, removeTodolistAC, removeTodolistsTC} from "./Components/Redux/TodolistsActions";
import Task from "./Components/Task";
import {addTaskAC, getTasksTC} from "./Components/Redux/TasksActions";
import {FilterType, TodolistType} from "./Components/Redux/TodolistReducer";
import {TaskType} from "./Components/Redux/TaskReducer";

type PropsType = {
    todolist: TodolistType
    todoTasks: Array<TaskType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        debugger
        const dispatch = useDispatch()
        const changeFilter = (filter: FilterType) => {
            if (filter === todolist.filter) {
                return
            }
            dispatch(changeTodolistFilterAC(todolist.id, filter))
        }
        const removeTodolist = useCallback(() => {
            dispatch(removeTodolistsTC(todolist.id))
        }, [dispatch, todolist.id])

        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskAC(todolist.id, newTitle))
        }, [dispatch, todolist.id])

        const getMyTasks = () => {
            dispatch(getTasksTC(todolist.id))
        }

        let tasksForRender = todoTasks
        if (todolist.filter === 'complited') {
            tasksForRender = todoTasks.filter(f => f.isDone)
        }
        if (todolist.filter === 'active') {
            tasksForRender = todoTasks.filter(f => !f.isDone)
        }
        return <div style={{color: '#071421'}} onDoubleClick={getMyTasks}>
            <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                        style={todolist.filter === 'all' ? {
                                backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                                fontWeight: 'bold'
                            } :
                            {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={todolist.filter === 'active' ? "contained" : 'outlined'}
                        style={todolist.filter === 'active' ? {
                                backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                                fontWeight: 'bold'
                            } :
                            {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={todolist.filter === 'complited' ? "contained" : 'outlined'}
                        style={todolist.filter === 'complited' ? {
                                backgroundColor: 'hotpink',
                                opacity: '0.9',
                                color: '#071421',
                                fontWeight: 'bold'
                            } :
                            {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                        onClick={() => changeFilter('complited')}>Complited</Button>
            </div>
        </div>
    }
)