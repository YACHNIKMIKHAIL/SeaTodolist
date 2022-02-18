import React, {useCallback} from 'react';
import EditSpan from "../../../../Components/EditSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "../../../../App/store";
import {changeTaskTC, removeTaskTC} from "../Actions/TasksActions";
import {ItemType, TaskStatuses} from "../../../../Api/SeaApi";
import styled from "styled-components";
import {CircularProgress} from "@mui/material";


type TaskPropsType = {
    id: string
    todolistID: string
}
const Task = React.memo(({todolistID, id}: TaskPropsType) => {
        const seaTaskLoading = useSelector<reducerType, boolean>(state => state.tasks[todolistID].filter(f => f.id === id)[0].loading)
        const actualTask = useSelector<reducerType, ItemType>(state => state.tasks[todolistID].filter(f => f.id === id)[0])
        const dispatch = useDispatch()


        const removeTask = useCallback(() => {
            dispatch(removeTaskTC(todolistID, id))
        }, [dispatch, todolistID, id])
        const changeTaskStatus = useCallback((num: boolean) => {
            dispatch(changeTaskTC(todolistID, id, {status: num ? TaskStatuses.Complited : TaskStatuses.New}))
        }, [dispatch, todolistID, id])
        const changeTaskTitle = useCallback((title: string) => {
            dispatch(changeTaskTC(todolistID, actualTask.id, {title}))
        }, [dispatch, todolistID, actualTask.id])

        return (
            <TaskCase
                $opacity={actualTask.status === TaskStatuses.Complited ? '0.8' : '1'}
                $color={actualTask.status === TaskStatuses.Complited ? 'white' : 'rgb(11,37,75)'}
                $fontWeight={actualTask.status === TaskStatuses.Complited ? 'normal' : 'bold'}
            >
                < Checkbox
                    checked={actualTask.status === TaskStatuses.Complited}
                    onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
                    style={{color: '#1F4B76'}}
                    disabled={seaTaskLoading}
                />

                {seaTaskLoading
                    ? <CircularProgress thickness={7} style={{color: 'hotpink'}} size={25}/>
                    : <EditSpan title={actualTask.title} callback={changeTaskTitle}/>}

                <IconButton aria-label="delete" onClick={removeTask}
                            disabled={seaTaskLoading}
                >
                    <Delete/>
                </IconButton>
            </TaskCase>

        );
    }
)
export default Task;

export const TaskCase = styled.div<{ $opacity: string, $color: string, $fontWeight: string }>`
  color: ${props => props.$color};
  opacity: ${props => props.$opacity};
  font-weight: ${props => props.$fontWeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  //margin: 10px;
`