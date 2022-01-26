import React, {useCallback} from 'react';
import './App.css';
import {Todolist, TodolistType} from './Todolist';
import AddForm from "./Components/AddForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {addTodolistAC} from "./Components/Redux/TodolistsActions";


function App() {
    const todolists = useSelector<reducerType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist =useCallback ((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    },[dispatch])

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        TODOLIST
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddForm addFn={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((t, i) => {
                        return <Grid item key={i}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist todolistID={t.id}/>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
