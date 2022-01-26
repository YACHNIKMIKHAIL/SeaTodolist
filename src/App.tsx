import React, {useCallback} from 'react';
import './App.css';
import {Todolist, TodolistType} from './Todolist';
import AddForm from "./Components/AddForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {addTodolistAC} from "./Components/Redux/TodolistsActions";


export const App = React.memo(() => {
        const todolists = useSelector<reducerType, TodolistType[]>(state => state.todolists)
        const dispatch = useDispatch()

        const addTodolist = useCallback((newTitle: string) => {
            dispatch(addTodolistAC(newTitle))
        }, [dispatch])
        console.log('App!!!')
        console.log(todolists)
        return (
            <div className="App"
                 style={{background: `url('https://c4.wallpaperflare.com/wallpaper/179/223/759/underwater-water-sun-rays-nature-wallpaper-preview.jpg')no-repeat center/cover`, height: '100vh',overflow:'auto'}}
            >
                <AppBar position="static"
                        style={{opacity:'0.8',backgroundColor:'#62ADB7',color:'#F3D9D4'}}
                >
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            W_TODOLIST
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddForm addFn={addTodolist} />
                    </Grid>
                    <Grid container spacing={5}>
                        {todolists.map((t, i) => {
                            return <Grid item key={i}>
                                <div
                                    style={{padding: '10px',backgroundColor:'rgba(243,217,212,0.55)',borderRadius:'10px'}}
                                >
                                    <Todolist todolistID={t.id}/>
                                </div>
                            </Grid>

                        })}
                    </Grid>
                </Container>
            </div>
        );
    }
)