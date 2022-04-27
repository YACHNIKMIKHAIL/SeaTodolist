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

    let result = generator.next()
    expect(result.value).toEqual(call(seaAuthAPI.me))

    result = generator.next(meResponse)
    expect(result.value).toEqual(put(seaLoginActions.isLoginInAC(true)))

    result = generator.next()
    expect(result.value).toEqual( put(setSeaAppInitialized(true)))
})

test('initializedSeaAppWorkerSaga login unsuccess', () => {
    const generator = initializedSeaAppWorkerSaga()

    let result = generator.next()
    expect(result.value).toEqual(call(seaAuthAPI.me))

    meResponse.resultCode = 1
    result = generator.next(meResponse)
    expect(result.value).toEqual(put(seaLoginActions.isLoginInAC(false)))
})