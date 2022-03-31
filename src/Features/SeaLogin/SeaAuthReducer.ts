import {initialLoginType, seaAuthAPI} from "../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../SeaUtils/SeaErrorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../../App/SeaAppReducer";
import {AxiosError} from "axios";
import {ThunkErrorType} from "../../App/store";


export type initialLoginStateType = {
    isLoginIn: boolean | undefined
    myName: string | null
}

export enum loginActions {
    SET_LOGIN_IN = 'SET_LOGIN_IN',
    SET_LOGIN_OUT = 'SET_LOGIN_OUT',
}

export const seaLoginTC = createAsyncThunk<undefined, initialLoginType, ThunkErrorType>(loginActions.SET_LOGIN_IN, async (seaData, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return
        } else {
            seaHandleServer(sea.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: sea.data.messages, fieldsErrors: sea.data.fieldsErrors})
        }
    } catch (e: any) {
        const err: AxiosError = e
        seaHandleNetwork(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})

export const seaLoginOutTC = createAsyncThunk(loginActions.SET_LOGIN_OUT, async (seaData, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.logOut()
        if (sea.data.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return
        } else {
            seaHandleServer(sea.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})

        }
    } catch (e: any) {
        const err: AxiosError = e
        seaHandleNetwork(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})

    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const asyncActions={
    seaLoginTC,
    seaLoginOutTC
}


export const slice = createSlice({
    name: 'seaAuth',
    initialState: {
        isLoginIn: false,
        myName: null
    },
    reducers: {
        isLoginInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(seaLoginTC.fulfilled, (state) => {
            state.isLoginIn = true
        })
        builder.addCase(seaLoginOutTC.fulfilled, (state) => {
            state.isLoginIn = false
        })
    }
})
export const seaAuthReducer = slice.reducer
export const {isLoginInAC} = slice.actions
export type seaLoginActionsType =
    ReturnType<typeof slice.actions.isLoginInAC>