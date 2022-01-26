import React from 'react';
import './App.css';
import {FilterType, TasksStateType, Todolist, TodolistType} from './Todolist';
import AddForm from "./Components/AddForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Components/Redux/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Components/Redux/TasksActions";
import {addTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "./Components/Redux/TodolistsActions";


function App() {
    const todolists = useSelector<reducerType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }
    const changeFilter = (todolistID: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }
    const addTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    }
    const changeTaskStatus = (todolistID: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, id, isDone))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const changeTaskTitle = (todolistID: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, title))
    }

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
                    {todolists.map(t => {
                        let tasksForRender = tasks[t.id]
                        if (t.filter === 'complited') {
                            tasksForRender = tasks[t.id].filter(f => f.isDone)
                        }
                        if (t.filter === 'active') {
                            tasksForRender = tasks[t.id].filter(f => !f.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist todolistID={t.id}
                                          key={t.id}
                                          title={t.title}
                                          tasks={tasksForRender}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          filter={t.filter}
                                          changeTaskStatus={changeTaskStatus}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}/>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
