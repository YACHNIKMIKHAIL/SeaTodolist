import {
    addTodolistAC, changeTodolistStatusAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    setTodoFromServAC
} from "../Reducers/TodolistReducer";
import {ApiTodolistType, todolistAPI} from "../../../../Api/SeaApi";
import {seaStatusTypes, setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {getTasksTC} from "./TasksActions";
import {Dispatch} from "redux";
//
// export enum TodolistActions {
//     REMOVE_TODOLIST = 'REMOVE_TODOLIST',
//     ADD_TODOLIST = 'ADD_TODOLIST',
//     CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
//     CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
//     SET_FROM_SERVER = 'SET_FROM_SERVER',
//     CHANGE_TODOLIST_STATUS = 'CHANGE_TODOLIST_STATUS'
// }


export type seaReturnedTodolistActionsTypes<T> = T extends { [key: string]: infer A } ? A : never

// export const seaTodolistActions = {
//     removeTodolistAC: (todolistId: string) => ({type: TodolistActions.REMOVE_TODOLIST, todolistId} as const),
//     addTodolistAC: (item: ApiTodolistType) => ({type: TodolistActions.ADD_TODOLIST, item} as const),
//     changeTodolistTitleAC: (todolistId: string, newTitle: string) => ({
//         type: TodolistActions.CHANGE_TODOLIST_TITLE,
//         todolistId,
//         newTitle
//     } as const),
//     changeTodolistFilterAC: (todolistId: string, filter: FilterType) => ({
//         type: TodolistActions.CHANGE_TODOLIST_FILTER,
//         todolistId,
//         filter
//     } as const),
//     setTodoFromServAC: (data: ApiTodolistType[]) => ({type: TodolistActions.SET_FROM_SERVER, data} as const),
//     changeTodolistStatusAC: (todolistId: string, status: seaStatusTypes) => ({
//         type: TodolistActions.CHANGE_TODOLIST_STATUS,
//         todolistId,
//         status
//     } as const),
// }


export const getTodolistsTC = () => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.getTodolists()
        dispatch(setTodoFromServAC({data:sea}))
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }

}
export const postTodolistsTC = (title: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await todolistAPI.postTodolists(title)
        if (sea.resultCode === 0) {
            const {item} = sea.data;
            dispatch(addTodolistAC({item:item}))
        } else {
            seaHandleServer(sea, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
}

export const removeTodolistsTC = (todolistID: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'loading'}))
    try {
        await todolistAPI.deleteTodolists(todolistID)
        dispatch(removeTodolistAC({todolistId: todolistID}))
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
}
export const changeTodolistsTC = (todolistID: string, title: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'loading'}))
    try {
        let sea = await todolistAPI.changeTodolists(todolistID, title)
        if (sea.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({todolistId: todolistID, newTitle: title}))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'succesed'}))
    }
}

export const reorderTodolistsTC = (todolistID: string, putAfterItemId: string | null) => async (dispatch: Dispatch<any>) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'loading'}))
    console.log('reorderTodolistsTC')
    try {
        let sea = await todolistAPI.reorderTodolists(todolistID, putAfterItemId)
        if (sea.data.resultCode === 0) {
            dispatch(getTodolistsTC())
            dispatch(getTasksTC(todolistID))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
        dispatch(changeTodolistStatusAC({todolistId: todolistID, status: 'succesed'}))
    }
}