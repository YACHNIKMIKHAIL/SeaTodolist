import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddForm from "./Components/AddForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {addTodolistAC, getTodolistsTC} from "./Components/Redux/TodolistsActions";
import img2 from './Components/Images/wallpaperflare.com_wallpaper (1).jpg'
import {Todolist} from "./Todolist";
import {TasksStateType} from "./Components/Redux/TaskReducer";
import {TodolistType} from "./Components/Redux/TodolistReducer";
import {todolistAPI} from "./Components/Api/SeaApi";


export const App = () => {
    const todolists = useSelector<reducerType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const getFromS = () => {
        dispatch(getTodolistsTC())
    }
    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])
    return (
        <div className="App"
             style={{
                 background: `url('${img2}')no-repeat center/cover`,
                 height: '100vh',
                 overflow: 'auto'
             }}
        >
            <AppBar position="static"
                    style={{opacity: '0.65', backgroundColor: '#071421', color: '#F3D9D4'}}
            >
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        SEA_TODOLIST
                    </Typography>
                    <Button color="inherit" onClick={getFromS}>Login</Button>
                </Toolbar>
            </AppBar>
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
                            <div
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#8AA8D2',
                                    opacity: '0.75',
                                    borderRadius: '10px'
                                }}>
                                <Todolist todolist={t}
                                          todoTasks={todoTasks}
                                />
                            </div>
                        </Grid>;

                    })}
                </Grid>
            </Container>
        </div>
    );
}