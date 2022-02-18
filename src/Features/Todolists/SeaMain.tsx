import React, {useCallback, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import TodolistsList from "./TodolistsList";
import {TodolistCase} from "../../App/App";
import {useDispatch} from "react-redux";
import {useSeaSelector} from "../../App/store";
import {SeaTodolistsType} from "./Todolist/Reducers/TodolistReducer";
import {TasksStateType} from "./Todolist/Reducers/TaskReducer";
import {getTodolistsTC, postTodolistsTC} from "./Todolist/Actions/TodolistsActions";
import AddForm from "../../Components/AddForm";
import {Navigate} from 'react-router-dom';

const SeaMain = () => {
    const todolists = useSeaSelector< SeaTodolistsType[]>(state => state.todolists)
    const tasks = useSeaSelector< TasksStateType>(state => state.tasks)
    const isLoggedInSea = useSeaSelector< boolean>(state => state.auth.isLoginIn)
    const dispatch = useDispatch()

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(postTodolistsTC(newTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    if (!isLoggedInSea) {
        return <Navigate to={'/login'}/>
    }


    return (
        <>
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
        </>
    );
};

export default SeaMain;