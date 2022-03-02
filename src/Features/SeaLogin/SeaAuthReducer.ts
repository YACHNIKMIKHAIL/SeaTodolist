import {setSeaAppStatus} from "../../App/SeaAppReducer";
import {SeaThunkType} from "../../App/store";
import {initialLoginType, seaAuthAPI} from "../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../SeaUtils/SeaErrorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type initialLoginStateType = {
    isLoginIn: boolean
    myName: string | null
}
const initialLoginState = {
    isLoginIn: false,
    myName: null
}

export enum loginActions {
    SET_LOGIN_IN = 'SET_LOGIN_IN',
}

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

export const seaLoginTC = (seaData: initialLoginType): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            dispatch(slice.actions.isLoginInAC({ value: true }))
            dispatch(setSeaAppStatus('succesed'))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}
export const seaLoginOutTC = (): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let sea = await seaAuthAPI.logOut()
        if (sea.data.resultCode === 0) {
            dispatch(slice.actions.isLoginInAC({ value: false }))
            dispatch(setSeaAppStatus('succesed'))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}