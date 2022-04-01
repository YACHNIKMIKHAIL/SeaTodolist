import {seaAsyncHandleNetwork, seaHandleAsyncServer} from "../../SeaUtils/SeaErrorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../SeaApplication/SeaApplicationReducer";
import {AxiosError} from "axios";
import {seaAuthAPI} from "../../Api/SeaApi";
import {initialLoginType} from "../../Api/ApiTypes";
import {ThunkErrorAPIConfigType} from "../../SeaUtils/UtilsTypes";


export enum loginActions {
    SET_LOGIN_IN = 'SET_LOGIN_IN',
    SET_LOGIN_OUT = 'SET_LOGIN_OUT',
}

export const seaLogin = createAsyncThunk<undefined, initialLoginType, ThunkErrorAPIConfigType>(loginActions.SET_LOGIN_IN, async (seaData, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return
        } else {
            return seaHandleAsyncServer(sea.data, thunkAPI)
        }
    } catch (e: any) {
        const err: AxiosError = e
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})

export const seaLoginOut = createAsyncThunk(loginActions.SET_LOGIN_OUT, async (seaData, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.logOut()
        if (sea.data.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return
        } else {
            return seaHandleAsyncServer(sea.data, thunkAPI)
        }
    } catch (e: any) {
        const err: AxiosError = e
        return seaAsyncHandleNetwork(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const asyncActions = {
    seaLogin,
    seaLoginOut
}


export const slice = createSlice({
    name: 'seaAuth',
    initialState: {
        isLoginIn: false,
        myName: null
    },
    reducers: {
        isLoginIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(seaLogin.fulfilled, (state) => {
                state.isLoginIn = true
            })
            .addCase(seaLoginOut.fulfilled, (state) => {
                state.isLoginIn = false
            })
    }
})
export const seaAuthReducer = slice.reducer
export const {isLoginIn} = slice.actions
