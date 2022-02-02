import React, {useCallback} from 'react';
import EditSpan from "./EditSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Redux/store";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "./Redux/TasksActions";
import {ItemType, TaskStatuses} from "./Api/SeaApi";


type TaskPropsType = {
    id: string
    todolistID: string
}
const Task = React.memo(({todolistID, id}: TaskPropsType) => {
        const actualTask = useSelector<reducerType, ItemType>(state => state.tasks[todolistID].filter(f => f.id === id)[0])
        const dispatch = useDispatch()
        console.log(`task ${id} called`)

        const removeTask = useCallback(() => {
            dispatch(removeTaskTC(todolistID, id))
        }, [dispatch, todolistID, id])
        const changeTaskStatus = useCallback((num: boolean) => {
            num
                ? dispatch(changeTaskStatusTC(todolistID, id, TaskStatuses.Complited, actualTask.title))
                : dispatch(changeTaskStatusTC(todolistID, id, TaskStatuses.New, actualTask.title))

        }, [dispatch, todolistID, id,actualTask.title])
        const changeTaskTitle = useCallback((title: string) => {
            dispatch(changeTaskTitleTC(todolistID, actualTask.id, title))
        }, [dispatch, todolistID, actualTask.id])

        return (
            <div style={actualTask.status === 2
                ? {
                    opacity: '0.6',
                    color: 'rgb(255,225,178)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', fontWeight: 'normal'
                }
                : {
                    color: 'rgb(11,37,75)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold'
                }}>
                <Checkbox
                    checked={actualTask.status === 2}
                    onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
                    style={{color: '#1F4B76'}}
                />

                <EditSpan title={actualTask.title} callback={changeTaskTitle}/>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
)
export default Task;