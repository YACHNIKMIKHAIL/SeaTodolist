import {initialTasks} from "../../../../State/initailsStates";
import {ItemType, tasksAPI} from "../../../../Api/SeaApi";
import {addTodolistAC, removeTodolistAC, setTodoFromServAC} from "./TodolistReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksActions} from "../Actions/TasksActions";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {Dispatch} from "redux";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";

export const getTasksTC = createAsyncThunk(tasksActions.SET_TASKS_FROM_SERVER, (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    return tasksAPI.getTasks(todolistID)
        .then((res) => {
            const tasks = res.items
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return {tasks, todolistID}
        })

    // thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    // thunkAPI.dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'loading'}))
    // try {
    //     let res = await tasksAPI.getTasks(todolistID)
    //     thunkAPI.dispatch(setTasksFromServAC({todolistID: todolistID, data: res.items}))
    //     return {res.items, todolistID}
    // } catch (e) {
    //     seaHandleNetwork(e, thunkAPI.dispatch)
    // } finally {
    //     thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    //     thunkAPI.dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'succesed'}))
    // }
})
export const removeTaskTC = createAsyncThunk(tasksActions.REMOVE_TASK, (seaParam: { todolistID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    return tasksAPI.removeTask(seaParam.todolistID, seaParam.taskID)
        .then(() => {
            return {todolistID: seaParam.todolistID, taskID: seaParam.taskID}
        })
})

export const addTaskTC = createAsyncThunk(tasksActions.ADD_TASK, (seaParam: { todolistID: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    return tasksAPI.addTask(seaParam.todolistID, seaParam.title)
        .then(() => {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
        })
})
export const addTaskTC_ = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let res = await tasksAPI.addTask(todolistID, title)
        if (res.resultCode === 0) {
            const {item} = res.data;
            dispatch(addTaskAC({todolistID: todolistID, item: item}))
        } else {
            seaHandleServer(res, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
}
const slice = createSlice({
        name: 'task',
        initialState: initialTasks,
        reducers: {
            addTaskAC(state, action: PayloadAction<{ todolistID: string, item: ItemType }>) {
                const task = state[action.payload.todolistID]
                task.unshift({...action.payload.item, loading: false})
            },
            // removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
            //     const task = state[action.payload.todolistId]
            //     const index = task.findIndex(i => i.id === action.payload.id)
            //     if (index > -1) {
            //         task.splice(index, 1)
            //     }
            // },
            // setTasksFromServAC(state, action: PayloadAction<{ todolistID: string, data: Array<ItemType> }>) {
            //     state[action.payload.todolistID] = action.payload.data
            // },
            changeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, item: ItemType }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.item}
                }
            },
            loadTask(state, action: PayloadAction<{ todolistID: string, taskID: string, loading: boolean }>) {
                const task = state[action.payload.todolistID]
                const index = task.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    task[index].loading = action.payload.loading
                }
            },
        },
        extraReducers: (builder) => {
            builder.addCase(addTodolistAC, (state, action) => {
                state[action.payload.item.id] = []
            });
            builder.addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            });
            builder.addCase(setTodoFromServAC, (state, action) => {
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
                    task.slice(index, 1)
                }
            })
        }
        //     {
        //     [addTodolistAC.type]: (state, action: PayloadAction<{ item: ApiTodolistType }>) => {
        //     },
        //     [removeTodolistAC.type]: (state, action: PayloadAction<{ todolistId: string }>) => {
        //     },
        //     [setTodoFromServAC.type]: (state, action: PayloadAction<{ data: ApiTodolistType[] }>) => {
        //     }
        // }
    }
)

export const taskReducer = slice.reducer
export const {addTaskAC, changeTaskAC, loadTask} = slice.actions
/*(state: TasksStateType = initialTasks, action: any): TasksStateType => {
switch (action.type) {
    case addTodolistAC.type: {
        return {[action.payload.item.id]: [], ...state}
    }
    case removeTodolistAC.type: {
        let taskCopy = {...state}
        delete taskCopy[action.payload.todolistId]
        return taskCopy
    }
    case tasksActions.ADD_TASK: {
        return {
            ...state,
            [action.todolistID]: [{...action.item, loading: false}, ...state[action.todolistID]]
        }
    }
    case tasksActions.REMOVE_TASK: {
        return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)
        }
    }
    case tasksActions.SET_TASKS_FROM_SERVER: {
        return {
            ...state, [action.todolistID]: action.data
        }
    }
    case tasksActions.CHANGE_TASK: {
        return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {...action.item} : m)
        }
    }
    case tasksActions.loadTask: {
        return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                ...m,
                loading: action.loading
            } : m)
        }
    }
    case setTodoFromServAC.type: {
        const copyState = {...state}
        action.payload.data.forEach((tl:any) => {
            copyState[tl.id] = []
        })
        return copyState
    }
    default:
        return state
}
// }*/
// export type seaTasksActionsType =
//     ReturnType<typeof setTodoFromServAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<seaReturnedTasksActionsType<typeof seaTasksActions>>


export type TasksStateType = { [key: string]: Array<ItemType> }
