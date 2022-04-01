import {slice} from "./SeaAuthReducer";

export type initialLoginStateType = {
    isLoginIn: boolean | undefined
    myName: string | null
}

export type seaLoginActionsType =
    ReturnType<typeof slice.actions.isLoginIn>

export type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}