import {getTasksTC, seaTasksActions} from "./TasksActions";
import {ApiTaskType, ItemType, tasksAPI, TaskStatuses, todolistAPI} from "../../../../Api/SeaApi";
import {setSeaAppStatus} from "../../../../App/SeaAppReducer";
import {seaTodolistActions} from "./TodolistsActions";


jest.mock("../../../../Api/SeaApi")
const taskAPIMock = tasksAPI as jest.Mocked<typeof tasksAPI>

const result: ApiTaskType = {
    items: [{id: 'todolistID1', title: "HTML&CSS", status: TaskStatuses.New},
        {id: 'todolistID2', title: "JS", status: TaskStatuses.New},
        {id: 'todolistID4', title: "ReactJS", status: TaskStatuses.Complited}] as ItemType[],
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
    expect(dispatchMock).toHaveBeenNthCalledWith(2, seaTodolistActions.changeTodolistStatusAC('todolistID', 'loading'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, seaTasksActions.setTasksFromServAC('yes', result.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setSeaAppStatus('succesed'))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, seaTodolistActions.changeTodolistStatusAC('todolistID', 'succesed'))
})