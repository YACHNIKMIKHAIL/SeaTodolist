import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import TodolistsList from "./TodolistsList";
import {TodolistCase} from "../../App/App";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "../../App/store";
import {SeaTodolistsType} from "./Todolist/Reducers/TodolistReducer";
import {TasksStateType} from "./Todolist/Reducers/TaskReducer";
import {getTodolistsTC} from "./Todolist/Actions/TodolistsActions";

const SeaMain = () => {
    const todolists = useSelector<reducerType, SeaTodolistsType[]>(state => state.todolists)
    const tasks = useSelector<reducerType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     debugger
    //     dispatch(getTodolistsTC())
    // }, [dispatch])
    return (
        <Grid container style={{padding: '20px', color: 'white'}}>

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
        </Grid>
    );
};

export default SeaMain;