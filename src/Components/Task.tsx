import React, {useCallback} from 'react';
import EditSpan from "./EditSpan";
import {IconButton} from "@material-ui/core";
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

        const changeTaskTitle = useCallback((title: string) => {
            dispatch(changeTaskTitleAC(todolistID, id, title))
        }, [dispatch, todolistID, id])
        const removeTask = useCallback(() => {
            dispatch(removeTaskAC(todolistID, id))
        }, [dispatch, todolistID, id])
        const changeTaskStatus = useCallback((isDone: boolean) => {
            dispatch(changeTaskStatusAC(todolistID, id, isDone))
        }, [dispatch, todolistID, id])

        return (
            <div>
                <input type="checkbox" checked={actualTask.isDone}
                       onChange={(e) => changeTaskStatus(e.currentTarget.checked)}/>
                <EditSpan title={actualTask.title} callback={changeTaskTitle} id={actualTask.id}
                          isDone={actualTask.isDone}/>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
)
export default Task;