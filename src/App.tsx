import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddForm from "./Components/AddForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {getTodolistsTC, postTodolistsTC} from "./Components/Redux/TodolistsActions";
import img2 from './Components/Images/wallpaperflare.com_wallpaper (1).jpg'
import {Todolist} from "./Todolist";
import {TasksStateType} from "./Components/Redux/TaskReducer";
import {SeaTodolistsType} from "./Components/Redux/TodolistReducer";
import styled from "styled-components";


export const App = () => {
    const todolists = useSelector<reducerType, SeaTodolistsType[]>(state => state.todolists)
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
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
                                <Todolist todolist={t}
                                          todoTasks={todoTasks}
                                />
                            </TodolistCase>
                        </Grid>;

                    })}
                </Grid>
            </Container>
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
  opacity: 0.75;
  border-radius: 10px
`
