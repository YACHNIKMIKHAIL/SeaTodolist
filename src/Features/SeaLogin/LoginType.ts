import {slice} from "./SeaAuthReducer";

export type initialLoginStateType = {
    isLoginIn: boolean | undefined
    myName: string | null
}

export type seaLoginActionsType =
    ReturnType<typeof slice.actions.isLoginInAC>

export type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}