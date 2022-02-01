import React, {useCallback, useState} from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeTodolistsTC, removeTodolistsTC} from "./Components/Redux/TodolistsActions";
import Task from "./Components/Task";
import {addTaskTC, getTasksTC} from "./Components/Redux/TasksActions";
import {FilterType, TodolistType} from "./Components/Redux/TodolistReducer";
import {TaskType} from "./Components/Redux/TaskReducer";

type PropsType = {
    todolist: TodolistType
    todoTasks: Array<TaskType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        console.log('RENDER!!!')
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

        const [myTasks, setMyTasks] = useState<boolean>(false)
        const getMyTasks = useCallback ((myTasks: boolean) => {
            if (myTasks) {
                dispatch(getTasksTC(todolist.id))
                setMyTasks(true)
            } else {
                setMyTasks(false)
            }
        },[dispatch, todolist.id])
        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskTC(todolist.id, newTitle))
            getMyTasks(true)
        }, [dispatch, todolist.id, getMyTasks])
        const changeTodolistTitle = useCallback((newTitle: string) => {
            dispatch(changeTodolistsTC(todolist.id, newTitle))
        }, [dispatch, todolist.id])


        let tasksForRender = todoTasks
        if (todolist.filter === 'complited') {
            tasksForRender = todoTasks.filter(f => f.status === 2)
        }
        if (todolist.filter === 'active') {
            tasksForRender = todoTasks.filter(f => f.status !== 2)
        }
        return <div style={{color: '#071421'}}>
            <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button onClick={() => getMyTasks(!myTasks)} color="secondary">Tasks</Button>
                <EditSpan title={todolist.title} id={todolist.id} callback={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddForm addFn={addTask}/>

            {myTasks
                ? <div>{tasksForRender.map((m, i) => {
                    return <Task key={i} id={m.id} todolistID={todolist.id}/>
                })}</div>
                : ''}


            <div>
                <Button variant={todolist.filter === 'all' ? "contained" : 'outlined'}
                        style={todolist.filter === 'all' ? {
                                backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                                fontWeight: 'bold'
                            } :
                            {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                        onClick={() => changeFilter('all')}
                        defaultChecked>All</Button>
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