import {seaAuthAPI} from "../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../SeaUtils/SeaErrorUtils";
import {isLoginInAC} from "../Features/SeaLogin/SeaAuthReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export type SeaAppInitStateType = {
    seaStatus: seaStatusTypes
    seaError: string | null
    isInitialized: boolean
}
export type seaStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'

export enum SeaAppActions {
    SET_SEA_STATUS = 'SET_SEA_STATUS',
    SET_SEA_ERROR = 'SET_SEA_ERROR',
    SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'
}

export const initializedSeaAppTC = createAsyncThunk(SeaAppActions.SET_IS_INITIALIZED, async (seaData, {dispatch}) => {
    dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.me()
        if (sea.data.resultCode === 0) {
            dispatch(isLoginInAC({value: true}))
            dispatch(setSeaAppStatus({status: 'succesed'}))
            return
        } else {
            dispatch(isLoginInAC({value: false}))
            seaHandleServer(sea.data, dispatch)
        }
    } catch (e: any) {
        const err: AxiosError = e
        seaHandleNetwork(err, dispatch)
    } finally {
        dispatch(setSeaAppStatus({status: 'succesed'}))
    }
})
export const asyncAppActions={
    initializedSeaAppTC
}
export const slice = createSlice({
    name: 'seaApp',
    initialState: {
        seaStatus: 'idle',
        seaError: null,
        isInitialized: false
    } as SeaAppInitStateType,
    reducers: {
        setSeaAppStatus(state, action: PayloadAction<{ status: seaStatusTypes }>) {
            state.seaStatus = action.payload.status
        },
        setSeaAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.seaError = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializedSeaAppTC.fulfilled, (state) => {
            state.isInitialized = true

        })
    }
})
export const seaAppResucer = slice.reducer
export const {setSeaAppStatus, setSeaAppError} = slice.actions