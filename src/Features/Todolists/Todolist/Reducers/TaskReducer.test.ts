import {v1} from "uuid";
import {seaTasksActions} from "../Actions/TasksActions";
import {taskReducer, TasksStateType} from "./TaskReducer";
import {ItemType} from "../../../../Api/SeaApi";
import {SeaTodolistsType} from "./TodolistReducer";
import {seaTodolistActions} from "../Actions/TodolistsActions";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let taskID: string

let startState = {} as TasksStateType;

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()
    taskID = v1()

    startState = {
        [todolistID1]: [{id: v1(), title: "HTML&CSS", status: 2},
            {id: v1(), title: "JS", status: 2},
            {id: v1(), title: "ReactJS", status: 1}],
        [todolistID2]: [{id: v1(), title: "Book", status: 1},
            {id: v1(), title: "Milk", status: 1},
            {id: v1(), title: "Bread", status: 1}],
        [todolistID3]: [{id: v1(), title: "Helmet", status: 2},
            {id: taskID, title: "Wheels", status: 1},
            {id: v1(), title: "Crank", status: 1}],
        [todolistID4]: [{id: v1(), title: "Тудулист", status: 2},
            {id: v1(), title: "Нативочка", status: 1},
            {id: v1(), title: "Чилл)))", status: 1}],
    } as TasksStateType
})

test('correct todolist should be added', () => {
    let endState = taskReducer(startState, seaTodolistActions.addTodolistAC({
        id: 'hbdcuhbc',
        title: 'New todolist',
        filter: 'all'
    } as SeaTodolistsType))

    expect(endState[todolistID1].length).toBe(3)
})
test('correct todolist should be removed', () => {
    let endState = taskReducer(startState, seaTodolistActions.removeTodolistAC(todolistID3))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
})
test('correct task should be added', () => {
    let endState = taskReducer(startState, seaTasksActions.addTaskAC(todolistID3, {id: v1(), title: 'bla-bla', status: 1} as ItemType))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(4)
    expect(endState[todolistID3][0].title).toBe('bla-bla')
})
test('correct task status should be changed', () => {
    let endState = taskReducer(startState, seaTasksActions.changeTaskAC(todolistID3, taskID, {
        id: v1(),
        title: 'hcahbdc',
        status: 2
    } as ItemType))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].status).toBe(2)
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task title should be changed', () => {
    let endState = taskReducer(startState, seaTasksActions.changeTaskAC(todolistID3, taskID, {
        id: v1(),
        title: 'hcahbdc',
        status: 0
    } as ItemType))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].title).toBe('hcahbdc')
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task should be removed', () => {
    let endState = taskReducer(startState, seaTasksActions.removeTaskAC(todolistID3, taskID))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(2)
    expect(endState[todolistID3][0].title).toBe("Helmet")
    expect(endState[todolistID3][1].title).toBe("Crank")
})