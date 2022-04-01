import React, {useCallback, useEffect, useState} from 'react';
import EditSpan from "../../../Components/EditSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Task from "./Task/Task";
import styled from "styled-components";
import {useSeaSelector} from "../../../App/store";
import {tasksActions, todolistsActions} from "./todoTasksIndex";
import {FilteredButton} from "../../../Components/FilteredButton";
import {useSeaAction, useSeaDispatch} from "../../../SeaUtils/ReduxUtils";
import {SeaTodolistsType} from "./TodolistTypes";
import {ItemType} from "../../../Api/ApiTypes";
import {AddFormSubmitHelperType} from "../../../Components/ComponentsTypes";
import {TaskStatuses} from "../../../Api/SeaApi";
import AddForm from "../../../Components/AddForm";


type PropsType = {
    todolist: SeaTodolistsType
    todoTasks: Array<ItemType>
}

export const Todolist = React.memo(({todolist, todoTasks}: PropsType) => {
        const seaTodolist = useSeaSelector<SeaTodolistsType>(state => state.todolists.filter(f => f.id === todolist.id)[0])
        const [dropTaskId, setDropTaskId] = useState<string | null>(null)
        const [taskBackground, setTaskBackground] = useState<string>('')

        const {getTasks, reorderTask} = useSeaAction(tasksActions)
        const {changeTodolists, removeTodolists} = useSeaAction(todolistsActions)
        const dispatch = useSeaDispatch()

        const removeTodolist = useCallback(() => {
            removeTodolists({todolistID: todolist.id})
        }, [todolist.id, removeTodolists])

        const addTaskX = useCallback(async (title: string, helper: AddFormSubmitHelperType) => {
            // addTask({todolistID: todolist.id, title: newTitle})
            let thunk = tasksActions.addTask({todolistID: todolist.id, title})
            const resultAction = await dispatch(thunk)
            if (tasksActions.addTask.rejected.match(resultAction)) {
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
        }, [todolist.id, dispatch])

        const changeTodolistTitle = useCallback((newTitle: string) => {
            changeTodolists({todolistID: todolist.id, title: newTitle})
        }, [todolist.id, changeTodolists])

        useEffect(() => {
            getTasks(todolist.id)
        }, [todolist.id, getTasks])

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
            reorderTask({todolistID: todolist.id, taskID: task.id, putAfterItemId: dropTaskId})
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
                if (t.id === task.id) {
                    return index
                }
            })
            if (index) setDropTaskId(task.id)
            else setDropTaskId(null)
        }

        return <MainCase>
            <IconButton aria-label="delete" onClick={removeTodolist}
                        disabled={seaTodolist.todolistStatus === 'loading'}
                        style={{position: 'absolute', right: '-14px', top: '-14px'}}>
                <Delete/>
            </IconButton>
            <HCase>
                <h3><EditSpan title={todolist.title} callback={changeTodolistTitle}/></h3>
            </HCase>
            <AddForm addFn={addTaskX}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {tasksForRender.map((m, i) => {
                    return <div key={i}
                                draggable
                                onDragStart={(e) => onDragTaskStartHandler(e, m)}
                                onDragLeave={(e) => onDragTaskLeaveHandler(e)}
                                onDragEnd={(e) => onDragTaskEndHandler(e, m)}
                                onDragOver={(e) => onDragTaskOverHandler(e)}
                                onDrop={(e) => onDropTaskHandler(e, m)}>
                        <Task id={m?.id} todolistID={todolist?.id}
                              taskBackground={taskBackground === m?.id ? 'hotpink' : '#8AA8D2'}/>
                    </div>
                })}
                {!tasksForRender.length &&
                <span style={{textAlign: 'center', margin: '20px', fontSize: '20px', color: '#c7d5ea'}}>No tasks</span>}
            </div>


            <div>
                <FilteredButton todolistId={todolist.id} actualFilter={'all'}/>
                <FilteredButton todolistId={todolist.id} actualFilter={'active'}/>
                <FilteredButton todolistId={todolist.id} actualFilter={'complited'}/>

            </div>
        </MainCase>
    }
)
export const MainCase = styled.div`
  color: #071421;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`
export const HCase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: 0 auto;
`
