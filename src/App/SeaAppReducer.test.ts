import {
    SeaAppInitStateType,
    seaAppResucer,
    setSeaAppError,
    setSeaAppInitialized,
    setSeaAppStatus
} from "./SeaAppReducer";
import {seaLoginActions} from "../Features/SeaLogin/SeaAuthReducer";

let startState: SeaAppInitStateType
beforeEach(() => {
    startState = {
        seaStatus: 'idle',
        seaError: null,
        isInitialized: false
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
test('correct initialized  should be true', () => {
    const endState = seaAppResucer(startState, setSeaAppInitialized(true))

    expect(endState.seaError).toBe(null)
    expect(endState.seaStatus).toBe('idle')
    expect(endState.isInitialized).toBe(true)
})