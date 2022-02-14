import {SeaAppInitStateType, seaAppResucer, setSeaAppError, setSeaAppStatus} from "./SeaAppReducer";

let startState: SeaAppInitStateType
beforeEach(() => {
    startState = {
        seaStatus: 'idle',
        seaError: null
    }
})
test('correct error message should be set', () => {
    const endState = seaAppResucer(startState, setSeaAppError('some error!'))

    expect(endState.seaError).toBe('some error!')
    expect(endState.seaStatus).toBe('idle')
})
test('correct status  should be set', () => {
    const endState = seaAppResucer(startState, setSeaAppStatus('loading'))

    expect(endState.seaError).toBe(null)
    expect(endState.seaStatus).toBe('loading')
})