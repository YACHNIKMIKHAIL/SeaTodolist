import React, {useCallback, useEffect} from 'react';
import AddForm from "./Components/AddForm";
import EditSpan from "./Components/EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeTodolistsTC, removeTodolistsTC} from "./Redux/TodolistsActions";
import Task from "./Task";
import {addTaskTC, getTasksTC} from "./Redux/TasksActions";
import {FilterType, SeaTodolistsType} from "./Redux/TodolistReducer";
import {ItemType, TaskStatuses} from "./Api/SeaApi";
import styled from "styled-components";


type PropsType = {
    todolist: SeaTodolistsType
    todoTasks: Array<ItemType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {

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
            dispatch(addTaskTC(todolist.id, newTitle))
        }, [dispatch, todolist.id])
        const changeTodolistTitle = useCallback((newTitle: string) => {
            dispatch(changeTodolistsTC(todolist.id, newTitle))
        }, [dispatch, todolist.id])

        useEffect(() => {
            dispatch(getTasksTC(todolist.id))
        }, [dispatch,todolist.id])

        let tasksForRender = todoTasks
        if (todolist.filter === 'complited') {
            tasksForRender = todoTasks.filter(f => f.status === TaskStatuses.Complited)
        }
        if (todolist.filter === 'active') {
            tasksForRender = todoTasks.filter(f => f.status === TaskStatuses.New)
        }
        return <MainCase>
            <HCase>
                <h3><EditSpan title={todolist.title} callback={changeTodolistTitle}/></h3>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </HCase>
            <AddForm addFn={addTask}/>
            <div>{tasksForRender.map((m, i) => {
                return <Task key={i} id={m.id} todolistID={todolist.id}/>
            })}</div>

            <div>
                <Button
                    variant={todolist.filter === 'all' ? "contained" : 'outlined'}
                    style={todolist.filter === 'all' ? {
                            backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('all')}
                    defaultChecked>All</Button>
                <Button
                    variant={todolist.filter === 'active' ? "contained" : 'outlined'}
                    style={todolist.filter === 'active' ? {
                            backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('active')}>Active</Button>
                <Button
                    variant={todolist.filter === 'complited' ? "contained" : 'outlined'}
                    style={todolist.filter === 'complited' ? {
                            backgroundColor: 'hotpink',
                            opacity: '0.9',
                            color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('complited')}>Complited</Button>

            </div>
        </MainCase>
    }
)
export const MainCase = styled.div`
  color: #071421
`
export const HCase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`