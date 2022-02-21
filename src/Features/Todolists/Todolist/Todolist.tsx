import React, {useCallback, useEffect, useState} from 'react';
import AddForm from "../../../Components/AddForm";
import EditSpan from "../../../Components/EditSpan";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import {useDispatch} from "react-redux";
import {changeTodolistsTC, removeTodolistsTC, seaTodolistActions} from "./Actions/TodolistsActions";
import Task from "./Task/Task";
import {addTaskTC, getTasksTC, reorderTaskTC} from "./Actions/TasksActions";
import {FilterType, SeaTodolistsType} from "./Reducers/TodolistReducer";
import {ItemType, TaskStatuses} from "../../../Api/SeaApi";
import styled from "styled-components";
import {useSeaSelector} from "../../../App/store";


type PropsType = {
    todolist: SeaTodolistsType
    todoTasks: Array<ItemType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        const seaTodolist = useSeaSelector<SeaTodolistsType>(state => state.todolists.filter(f => f.id === todolist.id)[0])
        const tasks = useSeaSelector<ItemType[]>(state => state.tasks[todolist.id])
        const [dropTaskId, setDropTaskId] = useState<string | null>(null)
        const [taskBackground, setTaskBackground] = useState<string>('')

        const dispatch = useDispatch()
        const changeFilter = (filter: FilterType) => {
            if (filter === todolist.filter) {
                return
            }
            dispatch(seaTodolistActions.changeTodolistFilterAC(todolist.id, filter))
        }
        const removeTodolist = useCallback(() => {
            dispatch(removeTodolistsTC(todolist.id))
        }, [dispatch, todolist.id])
        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskTC(todolist.id, newTitle))
        }, [dispatch, todolist.id])
        const changeTodolistTitle = useCallback((newTitle: string) => {
            dispatch(changeTodolistsTC(todolist.id, newTitle))
        }, [dispatch, todolist.id])

        useEffect(() => {
            dispatch(getTasksTC(todolist.id))
        }, [dispatch, todolist.id])

        let tasksForRender = todoTasks
        if (todolist.filter === 'complited') {
            tasksForRender = todoTasks.filter(f => f.status === TaskStatuses.Complited)
        }
        if (todolist.filter === 'active') {
            tasksForRender = todoTasks.filter(f => f.status === TaskStatuses.New)
        }


        const onDragTaskStartHandler = (e: React.DragEvent<HTMLDivElement>, task: ItemType) => {
            setTaskBackground(task.id)
        }
        const onDragTaskLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
            setTaskBackground('#8AA8D2')
        }
        const onDragTaskEndHandler = (e: React.DragEvent<HTMLDivElement>, task: ItemType) => {
            dispatch(reorderTaskTC(todolist.id, task.id, dropTaskId))
        }
        const onDragTaskOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            // setTaskBackground('#8AA8D2')
        }
        const onDropTaskHandler = (e: React.DragEvent<HTMLDivElement>, task: ItemType) => {
            e.preventDefault()
            setTaskBackground('')
            const index = tasks.find((t, index) => {
                if (t.id === task.id) return index
            })
            // console.log(index)
            if (index) setDropTaskId(task.id)
            else setDropTaskId(null)
        }

        return <MainCase>
            <HCase>
                <h3><EditSpan title={todolist.title} callback={changeTodolistTitle}/></h3>
                <IconButton aria-label="delete" onClick={removeTodolist}
                            disabled={seaTodolist.todolistStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </HCase>
            <AddForm addFn={addTask}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {tasksForRender.map((m, i) => {
                    return <div key={i}
                                draggable
                                onDragStart={(e) => onDragTaskStartHandler(e, m)}
                                onDragLeave={(e) => onDragTaskLeaveHandler(e)}
                                onDragEnd={(e) => onDragTaskEndHandler(e, m)}
                                onDragOver={(e) => onDragTaskOverHandler(e)}
                                onDrop={(e) => onDropTaskHandler(e, m)}>
                        <Task id={m.id} todolistID={todolist.id}
                              taskBackground={taskBackground === m.id ? 'hotpink' : '#8AA8D2'}/>
                    </div>
                })}
            </div>


            <div>
                <Button
                    variant={todolist.filter === 'all' ? "contained" : 'outlined'}
                    style={todolist.filter === 'all' ? {
                            backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('all')}
                    defaultChecked>All</Button>
                <Button
                    variant={todolist.filter === 'active' ? "contained" : 'outlined'}
                    style={todolist.filter === 'active' ? {
                            backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('active')}>Active</Button>
                <Button
                    variant={todolist.filter === 'complited' ? "contained" : 'outlined'}
                    style={todolist.filter === 'complited' ? {
                            backgroundColor: 'hotpink',
                            opacity: '0.9',
                            color: '#071421',
                            fontWeight: 'bold'
                        } :
                        {backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'}}
                    onClick={() => changeFilter('complited')}>Complited</Button>

            </div>
        </MainCase>
    }
)
export const MainCase = styled.div`
  color: #071421
`
export const HCase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`