import {initializedSeaAppWorkerSaga} from "./AppSagas";
import {call, put} from "redux-saga/effects";
import {MeResponseType, seaAuthAPI} from "../Api/SeaApi";
import {seaLoginActions} from "../Features/SeaLogin/SeaAuthReducer";
import {setSeaAppInitialized} from "./SeaAppReducer";

let meResponse: MeResponseType;
beforeEach(() => {
    meResponse = {
        data: {
            id: 12,
            login: '',
            email: ''
        },
        messages: [],
        resultCode: 0,
        fieldsErrors: []
    }
})

test('initializedSeaAppWorkerSaga login success', () => {
    const generator = initializedSeaAppWorkerSaga()
    expect(generator.next().value).toEqual(call(seaAuthAPI.me))
    expect(generator.next(meResponse).value).toEqual(put(seaLoginActions.isLoginInAC(false)))
    expect(generator.next().value).toEqual( put(setSeaAppInitialized(true)))
})

test('initializedSeaAppWorkerSaga login unsuccess', () => {
    const generator = initializedSeaAppWorkerSaga()
    expect(generator.next().value).toEqual(call(seaAuthAPI.me))
    meResponse.resultCode = 1
    expect(generator.next(meResponse).value).toEqual(put(seaLoginActions.isLoginInAC(false)))
})