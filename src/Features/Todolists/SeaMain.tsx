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

        const [lists, setLists] = useState<SeaTodolistsType[]>(todolists)
        const [dragTodolist, setDragTodolist] = useState<SeaTodolistsType>({} as SeaTodolistsType)
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

        //@ts-ignore
        const onDragStartHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
            console.log('onDragStartHandler => setDragTodolist', todolist)
            setDragTodolist(todolist)
        }
        //@ts-ignore
        const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {

        }
        //@ts-ignore
        const onDragEndHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
            dispatch(reorderTodolistsTC(todolist.id, dropTodolistId))
        }
        //@ts-ignore
        const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            console.log('onDragOverHandler')
        }
        //@ts-ignore
        const onDropHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
            e.preventDefault()
            console.log('onDropHandler', todolist)
            const index = todolists.find((list, index) => {
                if (list.id === todolist.id) return index
            })
            console.log(index)
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