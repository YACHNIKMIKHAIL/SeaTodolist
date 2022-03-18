import {FielErrorType, initialLoginType, seaAuthAPI} from "../../Api/SeaApi";
import {seaHandleNetwork, seaHandleServer} from "../../SeaUtils/SeaErrorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setSeaAppStatus} from "../../App/SeaAppReducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export type initialLoginStateType = {
    isLoginIn: boolean | undefined
    myName: string | null
}

export enum loginActions {
    SET_LOGIN_IN = 'SET_LOGIN_IN',
}

export const seaLoginTC = createAsyncThunk<{isLoggedIn: boolean},initialLoginType, {
    rejectValue:{errors?: string[], fieldsErrors?: FielErrorType[]}
} >(loginActions.SET_LOGIN_IN, async (seaData, thunkAPI) => {
    thunkAPI.dispatch(setSeaAppStatus({status: 'loading'}))
    try {
        let sea = await seaAuthAPI.login(seaData)
        if (sea.data.resultCode === 0) {
            thunkAPI.dispatch(setSeaAppStatus({status: 'succesed'}))
            return {isLoggedIn: true}
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
const slice = createSlice({
    name: 'seaAuth',
    initialState: {
        isLoginIn: false ,
        myName: null
    },
    reducers: {
        isLoginInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(seaLoginTC.fulfilled, (state, action) => {
            if(action.payload.isLoggedIn) {
                state.isLoginIn = action.payload.isLoggedIn
            }
        })
    }
})
export const seaAuthReducer = slice.reducer
export const {isLoginInAC} = slice.actions
export type seaLoginActionsType =
    ReturnType<typeof slice.actions.isLoginInAC>


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