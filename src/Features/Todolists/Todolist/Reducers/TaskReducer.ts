import {initialTasks} from "../../../../State/initailsStates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTask, changeTask, getTasks, removeTask, reorderTask} from "./TasksActions";
import {getTodolists, postTodolists, removeTodolists} from "./TodolistsActions";

const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex((i: { id: string; }) => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index].loading = action.payload.loading
                }
            },
        },
        extraReducers: (builder) => {
            builder.addCase(postTodolists.fulfilled, (state, action) => {
                state[action.payload.item.id] = []
            });
            builder.addCase(removeTodolists.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            });
            builder.addCase(getTodolists.fulfilled, (state, action) => {
                action.payload.data.forEach((tl: any) => {
                    state[tl.id] = []
                })
            });
            builder.addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
            });
            builder.addCase(removeTask.fulfilled, (state, action) => {
                const task = state[action.payload.todolistID]
                const index = task.findIndex((i: { id: string; }) => i.id === action.payload.taskID)
                if (index > -1) {
                    //delete task[index]
                    task.splice(index, 1)
                }

                // state[action.payload.todolistID].filter(f=>f.id!==action.payload.taskID)
            });
            builder.addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            });
            builder.addCase(changeTask.fulfilled, (state, action) => {
                const task = state[action.payload.seaParam.todolistID]
                const index = task.findIndex((i: { id: string; }) => i.id === action.payload.seaParam.taskID)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.item}
                }
            });
            builder.addCase(reorderTask.fulfilled, () => {

            })
        }
    }
)

export const taskReducer = slice.reducer
export const {loadTask} = slice.actions


