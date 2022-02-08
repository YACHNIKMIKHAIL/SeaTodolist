import React, {useCallback} from 'react';
import EditSpan from "./EditSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./Redux/store";
import {changeTaskTC, removeTaskTC} from "./Redux/TasksActions";
import {ItemType, TaskStatuses} from "./Api/SeaApi";
import styled from "styled-components";


type TaskPropsType = {
    id: string
    todolistID: string
}
const Task = React.memo(({todolistID, id}: TaskPropsType) => {
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
            <TaskCaseII
                opacity={actualTask.status === TaskStatuses.Complited ? '0.8' : '1'}
                color={actualTask.status === TaskStatuses.Complited ? 'white' : 'rgb(11,37,75)'}
                // style={actualTask.status === TaskStatuses.Complited
                // ? {
                //     opacity: '0.8',
                //     color: 'rgb(255,225,178)',
                //     display: 'flex',
                //     justifyContent: 'space-between',
                //     alignItems: 'center',
                //     fontWeight: 'normal',
                // }
                // : {
                //     opacity: '1',
                //     color: 'rgb(11,37,75)',
                //     display: 'flex',
                //     justifyContent: 'space-between',
                //     alignItems: 'center',
                //     fontWeight: 'bold'
                // }}
            >
                < Checkbox
                    checked={actualTask.status === TaskStatuses.Complited}
                    onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
                    style={{color: '#1F4B76'}}
                />

                <EditSpan title={actualTask.title} callback={changeTaskTitle}/>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </TaskCaseII>
        );
    }
)
export default Task;

export const TaskCaseII = styled.div<{ opacity: string, color: string }>`
  color: ${props => props.color};
  opacity: ${props => props.opacity};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`

export const TaskCase = styled.div<{ props: boolean }>`
  ${props => {
    if (props) {
      return `
        opacity: 0.6;
        color: rgb(255,225,178);
        display: flex;
        justify-content:space-between;
        align-items: center;
        font-weight: normal;
    `
    } else if (!props) {
      return `
        color: rgb(11,37,75);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
    `
    }
  }}
`