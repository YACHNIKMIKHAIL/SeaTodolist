import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./TodolistsActions";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./TasksActions";
import {taskReducer, TasksStateType} from "./TaskReducer";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let taskID: string

let startState: TasksStateType = {};

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
    }
})

test('correct todolist should be added', () => {
    let endState = taskReducer(startState, addTodolistAC({id:'hbdcuhbc',title:'New todolist',filter:'all'}))

    expect(endState[todolistID1].length).toBe(3)
})
test('correct todolist should be removed', () => {
    let endState = taskReducer(startState, removeTodolistAC(todolistID3))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
})
test('correct task should be added', () => {
    let endState = taskReducer(startState, addTaskAC(todolistID3, 'bla-bla'))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(4)
    expect(endState[todolistID3][0].title).toBe('bla-bla')
})
test('correct task status should be changed', () => {
    let endState = taskReducer(startState, changeTaskStatusAC(todolistID3, taskID, 2))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].id).toBe(taskID)
    expect(endState[todolistID3][1].status).toBe(2)
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task title should be changed', () => {
    let endState = taskReducer(startState, changeTaskTitleAC(todolistID3, taskID, 'hcahbdc'))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].id).toBe(taskID)
    expect(endState[todolistID3][1].title).toBe('hcahbdc')
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task should be removed', () => {
    let endState = taskReducer(startState, removeTaskAC(todolistID3, taskID))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(2)
    expect(endState[todolistID3][0].title).toBe("Helmet")
    expect(endState[todolistID3][1].title).toBe("Crank")
})