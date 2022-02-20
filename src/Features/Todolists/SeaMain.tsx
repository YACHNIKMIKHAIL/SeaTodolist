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

    const [list, setList] = useState<SeaTodolistsType[]>(todolists)
    const [dradTodolist, setDradTodolist] = useState<SeaTodolistsType | null>(null)

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(postTodolistsTC(newTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    if (!isLoggedInSea) {
        return <Navigate to={'/login'}/>
    }


    const sortTodolist = (a: SeaTodolistsType, b: SeaTodolistsType) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }


    //@ts-ignore
    const onDragStartHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
        // console.log('grad', todolist)
        setDradTodolist(todolist)
    }
    //@ts-ignore
    const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {

    }
    //@ts-ignore
    const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        alert('done!')
    }
    //@ts-ignore
    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    //@ts-ignore
    const onDropHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
        debugger
        e.preventDefault()
        // console.log('grad', todolist)
        setList(list.map(m => {
            if (dradTodolist) {
                if (m.id === todolist.id) {
                    return {...m, order: dradTodolist.order}
                }
            }
            if (dradTodolist)
                if (m.id === dradTodolist.id) {
                    return {...m, order: todolist.order}
                }
            return m
        }))
        let afterId = findId(todolist.id, list)
        dispatch(reorderTodolistsTC(todolist.id, afterId = null))

    }
    const findId = (id: string, l: SeaTodolistsType[]) => {
        debugger
        for (let i = 0; i < l.length; i++) {
            if (l[i].id === id) {
                return (l[i - 1].id)
            } else {
                return null
            }
        }
    }

    return (
        <>
            <Grid container style={{padding: '20px', color: 'white'}}>
                <AddForm addFn={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolists.sort(sortTodolist).map((t, i) => {
                    let todoTasks = tasks[t.id]
                    if (todoTasks === undefined) {
                        todoTasks = []
                    }

                    return <Grid item key={i}>
                        <TodolistCase
                            draggable={true}
                            onDragStart={(e) => onDragStartHandler(e, t)}
                            onDragLeave={(e) => onDragLeaveHandler(e)}
                            onDragEnd={(e) => onDragEndHandler(e)}
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
};

export default SeaMain;