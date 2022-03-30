import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TodolistsList from "./TodolistsList";
import {useDispatch} from "react-redux";
import {useSeaAction, useSeaSelector} from "../../App/store";
import {SeaTodolistsType} from "./Todolist/Reducers/TodolistReducer";
import {TasksStateType} from "./Todolist/Reducers/TaskReducer";
import AddForm from "../../Components/AddForm";
import {Navigate} from 'react-router-dom';
import styled from "styled-components";
import {todolistsActions} from "./Todolist/todoTasksIndex";

const SeaMain = () => {
        const todolists = useSeaSelector<SeaTodolistsType[]>(state => state.todolists)
        const tasks = useSeaSelector<TasksStateType>(state => state.tasks)
        const isLoggedInSea = useSeaSelector<boolean>(state => state.auth.isLoginIn)
        const dispatch = useDispatch()
        const {getTodolists, reorderTodolists,postTodolists} = useSeaAction(todolistsActions)


        const [dropTodolistId, setDropTodolistId] = useState<string | null>(null)
        const [todolistBackground, setTodolistBackground] = useState<string>('#8AA8D2')

        useEffect(() => {
            getTodolists()
        }, [dispatch, getTodolists])

        if (!isLoggedInSea) {
            return <Navigate to={'/login'}/>
        }


        const onDragTodolistStartHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
            e.stopPropagation()
            setTodolistBackground(todolist.id)
        }
        const onDragTodolistLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setTodolistBackground('#8AA8D2')
        }
        const onDragTodolistEndHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
            e.stopPropagation()
            dispatch(reorderTodolists({todolistID: todolist.id, putAfterItemId: dropTodolistId}))
        }
        const onDragTodolistOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.stopPropagation()
            e.preventDefault()
        }
        const onDropTodolistHandler = (e: React.DragEvent<HTMLDivElement>, todolist: SeaTodolistsType) => {
            e.stopPropagation()
            e.preventDefault()
            setTodolistBackground('')
            const index = todolists.find((list, index) => {
                if (list.id === todolist.id) {
                    return index
                }
            })
            if (index) setDropTodolistId(todolist.id)
            else setDropTodolistId(null)
        }

        return (
            <>
                <Grid container style={{padding: '20px', color: 'white'}}>
                    <AddForm addFn={postTodolists}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((t, i) => {
                        let todoTasks = tasks[t.id]
                        if (todoTasks === undefined) {
                            todoTasks = []
                        }

                        return <Grid item key={i}>
                            <TodolistCase
                                $backgroundColor={'#8AA8D2'}
                                $borderColor={todolistBackground === t.id ? 'hotpink' : '#8AA8D2'}
                                draggable
                                onDragStart={(e) => onDragTodolistStartHandler(e, t)}
                                onDragLeave={(e) => onDragTodolistLeaveHandler(e)}
                                onDragEnd={(e) => onDragTodolistEndHandler(e, t)}
                                onDragOver={(e) => onDragTodolistOverHandler(e)}
                                onDrop={(e) => onDropTodolistHandler(e, t)}
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

const TodolistCase = styled.div<{ $backgroundColor: string, $borderColor: string }>`
  padding: 10px;
  //background-color: #8AA8D2;
  border: 5px solid ${props => props.$borderColor};
  background-color: ${props => props.$backgroundColor};
  opacity: 0.95;
  border-radius: 10px
`