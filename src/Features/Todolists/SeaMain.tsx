import React, {useCallback, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TodolistsList from "./TodolistsList";
import {TodolistCase} from "../../App/App";
import {useDispatch} from "react-redux";
import {useSeaSelector} from "../../App/store";
import {SeaTodolistsType} from "./Todolist/Reducers/TodolistReducer";
import {TasksStateType} from "./Todolist/Reducers/TaskReducer";
import {getTodolistsTC, postTodolistsTC, reorderTodolistsTC} from "./Todolist/Actions/TodolistsActions";
import AddForm from "../../Components/AddForm";
import {Navigate} from 'react-router-dom';

const SeaMain = () => {
        const todolists = useSeaSelector<SeaTodolistsType[]>(state => state.todolists)
        const tasks = useSeaSelector<TasksStateType>(state => state.tasks)
        const isLoggedInSea = useSeaSelector<boolean>(state => state.auth.isLoginIn)
        const dispatch = useDispatch()

        const [dropTodolistId, setDropTodolistId] = useState<string | null>(null)

        const addTodolist = useCallback((newTitle: string) => {
            dispatch(postTodolistsTC(newTitle))
        }, [dispatch])

        useEffect(() => {
            dispatch(getTodolistsTC())
        }, [dispatch])

        if (!isLoggedInSea) {
            return <Navigate to={'/login'}/>
        }


        const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
        }
        const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {

        }
        const onDragEndHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
            dispatch(reorderTodolistsTC(todolist.id, dropTodolistId))
        }
        const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            console.log('onDragOverHandler')
        }
        const onDropHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
            e.preventDefault()
            console.log('onDropHandler', todolist)
            const index = todolists.find((list, index) => {
                if (list.id === todolist.id) return index
            })
            if (index) setDropTodolistId(todolist.id)
            else setDropTodolistId(null)
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
                            <TodolistCase
                                draggable={true}
                                onDragStart={(e) => onDragStartHandler(e, t)}
                                onDragLeave={(e) => onDragLeaveHandler(e)}
                                onDragEnd={(e) => onDragEndHandler(e, t)}
                                onDragOver={(e) => onDragOverHandler(e)}
                                onDrop={(e) => onDropHandler(e, t)}
                            >
                                <TodolistsList t={t} todoTasks={todoTasks}/>
                            </TodolistCase>
                        </Grid>;
                    })}
                </Grid>
            </>
        );
    }
;

export default SeaMain;