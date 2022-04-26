import React, {useCallback} from 'react';
import EditSpan from "../../../../Components/EditSpan";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import {useDispatch} from "react-redux";
import {useSeaSelector} from "../../../../App/store";
import {changeTaskTC} from "../Actions/TasksActions";
import {removeTask as removeTaskSagaActivator} from "../Sagas/TasksSagas";
import {ItemType, TaskStatuses} from "../../../../Api/SeaApi";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";


type TaskPropsType = {
    id: string
    todolistID: string
    taskBackground: string
}
const Task = React.memo(({todolistID, id, taskBackground}: TaskPropsType) => {
        const seaTaskLoading = useSeaSelector<boolean>(state => state.tasks[todolistID].filter(f => f.id === id)[0].loading)
        const actualTask = useSeaSelector<ItemType>(state => state.tasks[todolistID].filter(f => f.id === id)[0])
        const dispatch = useDispatch()

        const removeTask = useCallback(() => {
            dispatch(removeTaskSagaActivator(todolistID, id))
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
                $backgroundColor={taskBackground}
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

export const TaskCase = styled.div<{ $opacity: string, $color: string, $fontWeight: string, $backgroundColor: string }>`
  color: ${props => props.$color};
  opacity: ${props => props.$opacity};
  font-weight: ${props => props.$fontWeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: ${props => props.$backgroundColor};
  border-radius: 10px;
  //margin: 10px;
`