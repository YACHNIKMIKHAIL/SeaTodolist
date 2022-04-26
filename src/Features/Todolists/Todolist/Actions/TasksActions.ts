import {ItemType, TaskPriorities, TaskStatuses} from "../../../../Api/SeaApi";

export enum tasksActions {
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_TASKS_FROM_SERVER = 'SET_TASKS_FROM_SERVER',
    CHANGE_TASK = 'CHANGE_TASK',
    loadTask = 'loadTask'
}

export type seaReturnedTasksActionsType<S> = S extends { [key: string]: infer T } ? T : never
export const seaTasksActions = {
    addTaskAC: (todolistID: string, item: ItemType) => ({type: tasksActions.ADD_TASK, todolistID, item} as const),
    removeTaskAC: (todolistId: string, id: string) => ({type: tasksActions.REMOVE_TASK, id, todolistId} as const),
    setTasksFromServAC: (todolistID: string, data: Array<ItemType>) => ({
        type: tasksActions.SET_TASKS_FROM_SERVER,
        todolistID,
        data
    } as const),
    changeTaskAC: (todolistID: string, taskID: string, item: ItemType) => ({
        type: tasksActions.CHANGE_TASK,
        todolistID,
        taskID,
        item
    } as const),
    loadTask: (todolistID: string, taskID: string, loading: boolean) => ({
        type: tasksActions.loadTask, todolistID, taskID, loading
    } as const)
}

// export const getTasksTC = (todolistID: string): SeaThunkType => async (dispatch) => {
//     dispatch(setSeaAppStatus('loading'))
//     dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'loading'))
//     try {
//         let res = await tasksAPI.getTasks(todolistID)
//         dispatch(seaTasksActions.setTasksFromServAC(todolistID, res.items))
//     } catch (e) {
//         seaHandleNetwork(e, dispatch)
//     } finally {
//         dispatch(setSeaAppStatus('succesed'))
//         dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'succesed'))
//     }
// }




// export const addTaskTC = (todolistID: string, title: string): SeaThunkType => async (dispatch) => {
//     dispatch(setSeaAppStatus('loading'))
//     try {
//         let res = await tasksAPI.addTask(todolistID, title)
//         if (res.resultCode === 0) {
//             const {item} = res.data;
//             dispatch(seaTasksActions.addTaskAC(todolistID, item))
//         } else {
//             seaHandleServer(res, dispatch)
//         }
//     } catch (e) {
//         seaHandleNetwork(e, dispatch)
//     } finally {
//         dispatch(setSeaAppStatus('succesed'))
//     }
// }
export type UpdateSeaTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
// export const changeTaskTC = (todolistID: string, taskID: string, model: UpdateSeaTaskType): any => async (dispatch: Dispatch, getState: () => reducerType) => {
//     const actualTaskParams = getState().tasks[todolistID].filter(f => f.id === taskID)[0]
//     if (!actualTaskParams) return
//     const apiModel: UpdateTaskType = {
//         title: actualTaskParams.title,
//         description: actualTaskParams.description,
//         status: actualTaskParams.status,
//         priority: actualTaskParams.priority,
//         startDate: actualTaskParams.startDate,
//         deadline: actualTaskParams.deadline,
//         ...model
//     }
//     dispatch(setSeaAppStatus('loading'))
//     dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'loading'))
//     dispatch(seaTasksActions.loadTask(todolistID, taskID, true))
//     try {
//         let res = await tasksAPI.changeTask(todolistID, taskID, apiModel)
//         const {item} = res.data.data
//         if (res.data.resultCode === 0) {
//             dispatch(seaTasksActions.changeTaskAC(todolistID, taskID, item))
//             dispatch(seaTasksActions.loadTask(todolistID, taskID, false))
//         } else {
//             seaHandleServer(res.data, dispatch)
//             dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'failed'))
//             dispatch(getTasks(todolistID))
//
//         }
//     } catch (e) {
//         seaHandleNetwork(e, dispatch)
//     } finally {
//         dispatch(setSeaAppStatus('succesed'))
//         dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'succesed'))
//     }
// }
// export const removeTaskTC = (todolistID: string, taskID: string): SeaThunkType => async (dispatch) => {
//     dispatch(setSeaAppStatus('loading'))
//     dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'loading'))
//     dispatch(seaTasksActions.loadTask(todolistID, taskID, true))
// try {
//     await tasksAPI.removeTask(todolistID, taskID)
//     dispatch(seaTasksActions.removeTaskAC(todolistID, taskID))
// } catch (e) {
//     seaHandleNetwork(e, dispatch)
// } finally {
//     dispatch(setSeaAppStatus('succesed'))
//     dispatch(seaTodolistActions.changeTodolistStatusAC(todolistID, 'succesed'))
// }
// }



//
// export const reorderTaskTC = (todolistID: string, taskID: string, putAfterItemId: string | null): any => async (dispatch: Dispatch) => {
//     dispatch(setSeaAppStatus('loading'))
//     dispatch(seaTasksActions.loadTask(todolistID, taskID, true))
//     try {
//         let res = await tasksAPI.reorderTask(todolistID, taskID, putAfterItemId)
//         if (res.data.resultCode === 0) {
//             dispatch(getTasks(todolistID))
//         } else {
//             seaHandleServer(res.data, dispatch)
//         }
//     } catch (e) {
//         seaHandleNetwork(e, dispatch)
//     } finally {
//         dispatch(setSeaAppStatus('succesed'))
//     }
// }