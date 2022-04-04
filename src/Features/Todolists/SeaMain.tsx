import React, {useCallback, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TodolistsList from "./TodolistsList";
import {useSeaSelector} from "../../App/store";
import AddForm from "../../Components/AddForm";
import {Navigate} from 'react-router-dom';
import styled from "styled-components";
import {todolistsActions} from "./Todolist/todoTasksIndex";
import {useSeaAction, useSeaDispatch} from "../../SeaUtils/ReduxUtils";
import {AddFormSubmitHelperType} from "../../Components/ComponentsTypes";
import {SeaTodolistsType} from "./Todolist/TodolistTypes";
import {TasksStateType} from "./Todolist/Task/TaskTypes";

const SeaMain = () => {
        const todolists = useSeaSelector<SeaTodolistsType[]>(state => state.todolists)
        const tasks = useSeaSelector<TasksStateType>(state => state.tasks)
        const isLoggedInSea = useSeaSelector<boolean>(state => state.auth.isLoginIn)
        const {getTodolists, reorderTodolists} = useSeaAction(todolistsActions)
        const dispatch = useSeaDispatch()

        const [dropTodolistId, setDropTodolistId] = useState<string | null>(null)
        const [todolistBackground, setTodolistBackground] = useState<string>('#8AA8D2')

        const addTodolistX = useCallback(async (title: string, helper: AddFormSubmitHelperType) => {
            let thunk = todolistsActions.postTodolists(title)
            const resultAction = await dispatch(thunk)
            if (todolistsActions.postTodolists.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const errorMessage = resultAction.payload?.errors[0]
                    if (helper) {
                        helper.setError(errorMessage)
                    }
                    throw new Error(errorMessage)
                } else {
                    if (helper) {
                        helper.setError('Some error occured')
                    }
                    throw new Error('Some error occured')
                }
            } else {
                if (helper) {
                    helper.setTitle('')
                }
            }
            // postTodolists(title)
        }, [dispatch])

        useEffect(() => {
            getTodolists()
        }, [getTodolists])

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
            reorderTodolists({todolistID: todolist.id, putAfterItemId: dropTodolistId})
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
                    <AddForm addFn={addTodolistX}/>
                </Grid>
                <Grid container spacing={1} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
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
  border: 5px solid ${props => props.$borderColor};
  background-color: ${props => props.$backgroundColor};
  opacity: 0.95;
  border-radius: 10px;
  width: 270px;
`