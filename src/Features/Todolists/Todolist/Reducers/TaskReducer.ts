import {initialTasks} from "../../../../State/initailsStates";
import {ItemType} from "../../../../Api/SeaApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTaskTC, changeTaskTC, getTasksTC, removeTaskTC, reorderTaskTC} from "./TasksActions";
import {getTodolistsTC, postTodolistsTC, removeTodolistsTC} from "./TodolistsActions";

const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index].loading = action.payload.loading
                }
            },
        },
        extraReducers: (builder) => {
            builder.addCase(postTodolistsTC.fulfilled, (state, action) => {
                state[action.payload.item.id] = []
            });
            builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            });
            builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
                action.payload.data.forEach((tl: any) => {
                    state[tl.id] = []
                })
            });
            builder.addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
            });
            builder.addCase(removeTaskTC.fulfilled, (state, action) => {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    //delete task[index]
                    task.splice(index, 1)
                }

                // state[action.payload.todolistID].filter(f=>f.id!==action.payload.taskID)
            });
            builder.addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            });
            builder.addCase(changeTaskTC.fulfilled, (state, action) => {
                const task = state[action.payload.seaParam.todolistID]
                const index = task.findIndex(i => i.id === action.payload.seaParam.taskID)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.item}
                }
            });
            builder.addCase(reorderTaskTC.fulfilled, () => {

            })
        }
    }
)

export const taskReducer = slice.reducer
export const {loadTask} = slice.actions

export type TasksStateType = { [key: string]: Array<ItemType> }
