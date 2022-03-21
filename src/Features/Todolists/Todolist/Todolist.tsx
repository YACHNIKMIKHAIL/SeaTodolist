import React, {useCallback, useEffect, useState} from 'react';
import AddForm from "../../../Components/AddForm";
import EditSpan from "../../../Components/EditSpan";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import {useDispatch} from "react-redux";
import Task from "./Task/Task";
import {
    changeTodolistFilterAC,
    changeTodolistsTC,
    FilterType,
    removeTodolistsTC,
    SeaTodolistsType
} from "./Reducers/TodolistReducer";
import {ItemType, TaskStatuses} from "../../../Api/SeaApi";
import styled from "styled-components";
import {useSeaSelector} from "../../../App/store";
import {addTaskTC, getTasksTC} from "./Reducers/TaskReducer";
import {reorderTaskTC} from "./Actions/TasksActions";


type PropsType = {
    todolist: SeaTodolistsType
    todoTasks: Array<ItemType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        const seaTodolist = useSeaSelector<SeaTodolistsType>(state => state.todolists.filter(f => f.id === todolist.id)[0])
        const [dropTaskId, setDropTaskId] = useState<string | null>(null)
        const [taskBackground, setTaskBackground] = useState<string>('')

        const dispatch = useDispatch()
        const changeFilter = (filter: FilterType) => {
            if (filter === todolist.filter) {
                return
            }
            dispatch(changeTodolistFilterAC({todolistId: todolist.id, filter: filter}))
        }
        const removeTodolist = useCallback(() => {
            dispatch(removeTodolistsTC({todolistID: todolist.id}))
        }, [dispatch, todolist.id])
        const addTask = useCallback((newTitle: string) => {
            dispatch(addTaskTC({todolistID: todolist.id, title: newTitle}))
        }, [todolist.id, dispatch])
        const changeTodolistTitle = useCallback((newTitle: string) => {
            dispatch(changeTodolistsTC({todolistID: todolist.id, title: newTitle}))
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
            e.stopPropagation()
            setTaskBackground(task.id)
        }
        const onDragTaskLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setTaskBackground('#8AA8D2')
        }
        const onDragTaskEndHandler = (e: React.DragEvent<HTMLDivElement>, task: ItemType) => {
            e.stopPropagation()
            dispatch(reorderTaskTC(todolist.id, task.id, dropTaskId))
        }
        const onDragTaskOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
            e.stopPropagation()
            e.preventDefault()
        }
        const onDropTaskHandler = (e: React.DragEvent<HTMLDivElement>, task: ItemType) => {
            e.stopPropagation()
            e.preventDefault()
            setTaskBackground('')
            const index = todoTasks.find((t, index) => {
                if (t.id === task.id) return index
            })
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