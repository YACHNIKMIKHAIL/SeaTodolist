import {call, put} from "redux-saga/effects";
import {seaAppActionsType, setSeaAppError, setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {addTaskWorkerSaga, getTasksWorkerSaga} from "./TasksSagas";
import {seaTodolistActions} from "../Actions/TodolistsActions";
import {ApiTaskType, ItemType, TaskPriorities, tasksAPI, TaskStatuses} from "../../../../Api/SeaApi";
import {seaTasksActions} from "../Actions/TasksActions";
import {v1} from "uuid";
import {Dispatch} from "redux";

let fakeResponse: { data: { item: ItemType; }; messages: never[]; fieldsErrors: never[]; resultCode: number; }
beforeEach(() => {
    fakeResponse = {
        data: {
            item: {
                id: 'string',
                title: 'string',
                description: 'string',
                todoListId: 'string',
                order: 1,
                status: TaskStatuses,
                priority: TaskPriorities,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string'
            } as any
        },
        messages: [],
        fieldsErrors: [],
        resultCode: 0
    }
})

const action = {type: 'TASKS/GET_TASKS', todolistID: '123'}
test('getTasksWorkerSaga success', () => {
    const generator = getTasksWorkerSaga(action)
    expect(generator.next().value).toEqual(put(setSeaAppStatus('loading')))
    expect(generator.next().value).toEqual(put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'loading')))
    expect(generator.next().value).toEqual(call(tasksAPI.getTasks, action.todolistID))
    const fakeResponse: ApiTaskType = {
        items: [
            {id: v1(), title: "HTML&CSS", status: 2, loading: false} as ItemType
        ],
        error: null,
        totalCount: 1
    }
    expect(generator.next(fakeResponse as ApiTaskType & Dispatch<seaAppActionsType>).value).toEqual(put(seaTasksActions.setTasksFromServAC(action.todolistID, fakeResponse.items)))
    expect(generator.next().value).toEqual(put(setSeaAppStatus('succesed')))
    let next = generator.next()
    expect(next.value).toEqual(put(seaTodolistActions.changeTodolistStatusAC(action.todolistID, 'succesed')))
    expect(next.done).toBeTruthy()
})


const actionII = {type: 'TASKS/ADD_TASK', todolistID: '123', title: 'string'}
test('addTaskWorkerSaga success', () => {
    const generator = addTaskWorkerSaga(actionII)
    expect(generator.next().value).toEqual(put(setSeaAppStatus('loading')))
    expect(generator.next().value).toEqual(call(tasksAPI.addTask, actionII.todolistID, actionII.title))

    expect(generator.next(fakeResponse as any).value).toEqual(put(seaTasksActions.addTaskAC(actionII.todolistID, fakeResponse.data.item)))
    expect(generator.next().value).toEqual(put(setSeaAppStatus('succesed')))
    let next = generator.next()
    expect(next.value).toEqual(put(seaTodolistActions.changeTodolistStatusAC(actionII.todolistID, 'succesed')))
    expect(next.done).toBeTruthy()
})

test('addTaskWorkerSaga error', () => {
    const generator = addTaskWorkerSaga(actionII)
    expect(generator.next().value).toEqual(put(setSeaAppStatus('loading')))
    expect(generator.next().value).toEqual(call(tasksAPI.addTask, actionII.todolistID, actionII.title))
    expect(generator.throw({message: 'some error'}).value).toEqual(put(setSeaAppError('some error')))
    expect(generator.next().value).toEqual(put(setSeaAppStatus('failed')))
})

