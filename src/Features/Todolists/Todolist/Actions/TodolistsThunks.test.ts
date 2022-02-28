import {getTasksTC, seaTasksActions} from "./TasksActions";
import {ApiTaskType, ItemType, TaskPriorities, tasksAPI, TaskStatuses, todolistAPI} from "../../../../Api/SeaApi";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaTodolistActions} from "./TodolistsActions";


jest.mock("../../../../Api/SeaApi")
const taskAPIMock = tasksAPI as jest.Mocked<typeof tasksAPI>

const result: ApiTaskType = {
    items: [{id: 'yes', title: "HTML&CSS", status: TaskStatuses.New},
        {id: 'yes', title: "JS", status: TaskStatuses.New},
        {id: 'yes', title: "ReactJS", status: TaskStatuses.Complited}] as ItemType[],
    totalCount: 3,
    error: null
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

taskAPIMock.getTasks.mockReturnValue(Promise.resolve(result))

test('getTasksTC test', async () => {
    const getTasks = getTasksTC('yes')

    await getTasks(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(6)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setSeaAppStatus('loading'))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, seaTodolistActions.changeTodolistStatusAC('yes', 'loading'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, seaTasksActions.setTasksFromServAC('yes',
        [{id: 'taskID1', title: "HTML&CSS", status: TaskStatuses.New},
            {id: 'taskID2', title: "JS", status: TaskStatuses.New},
            {id: 'taskID3', title: "ReactJS", status: TaskStatuses.Complited}] as ItemType[]
    ))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setSeaAppStatus('succesed'))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, seaTodolistActions.changeTodolistStatusAC('todolistID', 'succesed'))
})