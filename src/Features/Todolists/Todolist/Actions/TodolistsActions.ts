import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodoFromServAC
} from "../Reducers/TodolistReducer";
import {todolistAPI} from "../../../../Api/SeaApi";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaHandleNetwork, seaHandleServer} from "../../../../SeaUtils/SeaErrorUtils";
import {Dispatch} from "redux";
import {getTasksTC} from "../Reducers/TaskReducer";
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