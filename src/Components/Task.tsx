import React, {useCallback} from 'react';
import EditSpan from "./EditSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Redux/store";
import {TaskType} from "../Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Redux/TasksActions";

type TaskPropsType = {
    id: string
    todolistID: string
}
const Task = React.memo(({todolistID, id}: TaskPropsType) => {
        const actualTask = useSelector<reducerType, TaskType>(state => state.tasks[todolistID].filter(f => f.id === id)[0])
        const dispatch = useDispatch()
        console.log(`task ${id} called`)

        // const changeTaskTitle = useCallback((title: string) => {
        //     dispatch(changeTaskTitleAC(todolistID, id, title))
        // }, [dispatch, todolistID, id])
        const removeTask = useCallback(() => {
            dispatch(removeTaskAC(todolistID, id))
        }, [dispatch, todolistID, id])
        const changeTaskStatus = useCallback((isDone: boolean) => {
            dispatch(changeTaskStatusAC(todolistID, id, isDone))
        }, [dispatch, todolistID, id])

        return (
            <div style={actualTask.isDone
                ? {
                    opacity: '0.4',
                    color: 'rgb(255,225,178)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
                : {color: 'rgba(11,37,75,0.78)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Checkbox
                    checked={actualTask.isDone}
                    onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
                    style={{color: '#09bad0'}}
                />

                <EditSpan title={actualTask.title} id={actualTask.id}/>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
)
export default Task;