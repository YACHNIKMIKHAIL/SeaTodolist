import {initialLoginType, seaAuthAPI} from "../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../SeaUtils/SeaErrorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../../App/SeaAppReducer";
import {Dispatch} from "redux";


export type initialLoginStateType = {
    isLoginIn: boolean
    myName: string | null
}
const initialLoginState = {
    isLoginIn: false,
    myName: null
}

// export enum loginActions {
//     SET_LOGIN_IN = 'SET_LOGIN_IN',
// }

const slice = createSlice({
    name: 'seaAuth',
    initialState: initialLoginState,
    reducers: {
        isLoginInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value
        }
    }
})
export const seaAuthReducer = slice.reducer
export const {isLoginInAC} = slice.actions
export type seaLoginActionsType =
    ReturnType<typeof slice.actions.isLoginInAC>

// export type seaReturnedLoginActionsType<S> = S extends { [key: string]: infer T } ? T : never
// export const seaLoginActions = {
//     isLoginInAC: (value: boolean) => ({type: loginActions.SET_LOGIN_IN, value} as const),
// }

export const seaLoginTC = (seaData: initialLoginType) => async (dispatch: Dispatch) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            dispatch(slice.actions.isLoginInAC({value: true}))
            dispatch(setSeaAppStatus({status: 'succesed'}))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}
export const seaLoginOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.logOut()
        if (sea.data.resultCode === 0) {
            dispatch(slice.actions.isLoginInAC({value: false}))
            dispatch(setSeaAppStatus({status: 'succesed'}))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}