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
        [todolistID1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todolistID2]: [{id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false}],
        [todolistID3]: [{id: v1(), title: "Helmet", isDone: true},
            {id: taskID, title: "Wheels", isDone: false},
            {id: v1(), title: "Crank", isDone: false}],
        [todolistID4]: [{id: v1(), title: "Тудулист", isDone: true},
            {id: v1(), title: "Нативочка", isDone: false},
            {id: v1(), title: "Чилл)))", isDone: false}],
    }
})

test('correct todolist should be added', () => {
    let endState = taskReducer(startState, addTodolistAC('New todolist'))

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
    let endState = taskReducer(startState, changeTaskStatusAC(todolistID3, taskID, true))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].id).toBe(taskID)
    expect(endState[todolistID3][1].isDone).toBe(true)
    expect(endState[todolistID3][2].isDone).toBe(false)
})
test('correct task title should be changed', () => {
    let endState = taskReducer(startState, changeTaskTitleAC(todolistID3, taskID, 'hcahbdc'))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].id).toBe(taskID)
    expect(endState[todolistID3][1].title).toBe('hcahbdc')
    expect(endState[todolistID3][2].isDone).toBe(false)
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