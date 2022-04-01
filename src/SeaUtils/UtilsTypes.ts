import {FielErrorType} from "../Api/ApiTypes";

export type ThunkErrorType = {
    rejectValue: { errors?: string[], fieldsErrors?: FielErrorType[] }
}

export type thunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}