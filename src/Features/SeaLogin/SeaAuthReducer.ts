import {setSeaAppStatus} from "../../App/SeaAppReducer";
import {SeaThunkType} from "../../App/store";
import {seaAuthAPI} from "../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../SeaUtils/SeaErrorUtils";


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

export const seaAuthReducer = (state: initialLoginStateType = initialLoginState, action: seaLoginActionsType): initialLoginStateType => {
    switch (action.type) {
        case loginActions.SET_LOGIN_IN: {
            return {...state, isLoginIn: action.value}
        }

        default:
            return state
    }
}
export type seaLoginActionsType =
    ReturnType<seaReturnedLoginActionsType<typeof seaLoginActions>>

export type seaReturnedLoginActionsType<S> = S extends { [key: string]: infer T } ? T : never
export const seaLoginActions = {
    isLoginInAC: (value: boolean) => ({type: loginActions.SET_LOGIN_IN, value} as const),
}
export type initialLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const seaLoginTC = (seaData: initialLoginType): SeaThunkType => async (dispatch) => {
    dispatch(setSeaAppStatus('loading'))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            dispatch(seaLoginActions.isLoginInAC(true))
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
            dispatch(seaLoginActions.isLoginInAC(false))
            dispatch(setSeaAppStatus('succesed'))
        } else {
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e) {
        seaHandleNetwork(e, dispatch)
    }
}