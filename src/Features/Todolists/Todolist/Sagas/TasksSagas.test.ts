import {call, put} from "redux-saga/effects";
import {seaAppActionsType, setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {getTasksWorkerSaga} from "./TasksSagas";
import {seaTodolistActions} from "../Actions/TodolistsActions";
import {ApiTaskType, ItemType, tasksAPI} from "../../../../Api/SeaApi";
import {seaTasksActions} from "../Actions/TasksActions";
import {v1} from "uuid";
import {Dispatch} from "redux";

beforeEach(() => {

})

const action = {type: 'TASKS/GET_TASKS', todolistID: '123'}
test('getTasksWorkerSaga', () => {
    const generator = getTasksWorkerSaga(action)
    expect(generator.next().value).toEqual(put(setSeaAppStatus('loading')))
    expect(generator.next().value).toEqual(put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading')))
    expect(generator.next().value).toEqual(call(tasksAPI.getTasks, action.todolistID))
    const fakeResponse:ApiTaskType = {
        items: [
            {id: v1(), title: "HTML&CSS", status: 2, loading: false} as ItemType
        ],
        error: null,
        totalCount: 1
    }
    expect(generator.next(fakeResponse as ApiTaskType  & Dispatch<seaAppActionsType>).value).toEqual(put(seaTasksActions.setTasksFromServAC(action.todolistID, fakeResponse.items)))
    expect(generator.next().value).toEqual(put(setSeaAppStatus('succesed')))
    let next=generator.next()
    expect(next.value).toEqual(put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed')))
    expect(next.done).toBeTruthy()
})