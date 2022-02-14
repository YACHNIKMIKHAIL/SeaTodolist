import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddForm from "../Components/AddForm";
import {Button, Container, Grid, IconButton, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./store";
import {getTodolistsTC, postTodolistsTC} from "../Features/Todolists/Todolist/Actions/TodolistsActions";
import img2 from '../Images/wallpaperflare.com_wallpaper (1).jpg'
import {TasksStateType} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import {SeaTodolistsType} from "../Features/Todolists/Todolist/Reducers/TodolistReducer";
import styled from "styled-components";
import TodolistsList from "../Features/Todolists/TodolistsList";
import {seaStatusTypes} from './SeaAppReducer';
import Error from "../Components/Error";
import {LinearProgress} from "@mui/material";

export const App = () => {
    const todolists = useSelector<reducerType, SeaTodolistsType[]>(state => state.todolists)
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
    const seaStatus = useSelector<reducerType, seaStatusTypes>(state => state.app.seaStatus)
    const dispatch = useDispatch()
    const getFromS = () => {
        dispatch(getTodolistsTC())
    }
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(postTodolistsTC(newTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    return (
        <AppCase>
            <AppBarCase>
                <ToolbarCase>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        SEA_TODOLIST
                    </Typography>
                    <Button color="inherit" onClick={getFromS}>Login</Button>
                </ToolbarCase>
            </AppBarCase>

            {seaStatus === 'loading' && <LinearProgress color="inherit" style={{color:'hotpink',height:'7px'}}/>}
            <Container fixed>
                <Grid container style={{padding: '20px', color: 'white'}}>
                    <AddForm addFn={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((t, i) => {
                        let todoTasks = tasks[t.id]
                        if (todoTasks === undefined) {
                            todoTasks = []
                        }

                        return <Grid item key={i}>
                            <TodolistCase>
                                <TodolistsList t={t} todoTasks={todoTasks}/>
                            </TodolistCase>
                        </Grid>;

                    })}
                </Grid>
            </Container>
            <Error/>
        </AppCase>
    );
}

export const AppCase = styled.div`
  background: url('${img2}') no-repeat center/cover;
  height: 100vh;
  overflow: auto
`
export const AppBarCase = styled.div`
  opacity: 0.65;
  background-color: #071421;
  color: #F3D9D4
`
export const ToolbarCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const TodolistCase = styled.div`
  padding: 10px;
  background-color: #8AA8D2;
  opacity: 0.95;
  border-radius: 10px
`
