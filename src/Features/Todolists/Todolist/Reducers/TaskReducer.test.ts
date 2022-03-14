import {v1} from "uuid";
import {addTaskAC, changeTaskAC, loadTask, removeTaskTC, taskReducer, TasksStateType} from "./TaskReducer";
import {TaskPriorities, TaskStatuses} from "../../../../Api/SeaApi";
import {addTodolistAC, removeTodolistAC, SeaTodolistsType} from "./TodolistReducer";

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
        [todolistID1]: [{id: v1(), title: "HTML&CSS", status: 2, loading: false},
            {id: v1(), title: "JS", status: 2, loading: false},
            {id: v1(), title: "ReactJS", status: 1, loading: false}],
        [todolistID2]: [{id: v1(), title: "Book", status: 1, loading: false},
            {id: v1(), title: "Milk", status: 1, loading: false},
            {id: v1(), title: "Bread", status: 1, loading: false}],
        [todolistID3]: [{id: v1(), title: "Helmet", status: 2, loading: false},
            {id: taskID, title: "Wheels", status: 1, loading: false},
            {id: v1(), title: "Crank", status: 1, loading: false}],
        [todolistID4]: [{id: v1(), title: "Тудулист", status: 2, loading: false},
            {id: v1(), title: "Нативочка", status: 1, loading: false},
            {id: v1(), title: "Чилл)))", status: 1, loading: false}],
    } as TasksStateType
})

test('correct todolist should be added', () => {
    let endState = taskReducer(startState, addTodolistAC({
        item: {
            id: 'hbdcuhbc',
            title: 'New todolist',
            filter: 'all'
        } as SeaTodolistsType
    }))

    expect(endState[todolistID1].length).toBe(3)
})
test('correct todolist should be removed', () => {
    let endState = taskReducer(startState, removeTodolistAC({todolistId: todolistID3}))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
})
test('correct task should be added', () => {
    let endState = taskReducer(startState, addTaskAC({
        todolistID: todolistID3, item:
            {
                id: 'string',
                title: 'bla-bla',
                description: 'string',
                todoListId: 'string',
                order: 4,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string',
                loading: false
            }
    }))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(4)
    expect(endState[todolistID3][0].title).toBe('bla-bla')
})
test('correct task status should be changed', () => {
    let endState = taskReducer(startState, changeTaskAC({
        todolistID: todolistID3, taskID: taskID,
        item: {
            id: v1(),
            title: 'hcahbdc',
            description: 'string',
            todoListId: 'string',
            order: 4,
            status: TaskStatuses.Complited,
            priority: TaskPriorities.Low,
            startDate: 'string',
            deadline: 'string',
            addedDate: 'string',
            loading: false
        }
    }))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].status).toBe(2)
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task title should be changed', () => {
    let endState = taskReducer(startState, changeTaskAC({
        todolistID: todolistID3, taskID: taskID,
        item: {
            id: v1(),
            title: 'hcahbdc',
            description: 'string',
            todoListId: 'string',
            order: 4,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: 'string',
            deadline: 'string',
            addedDate: 'string',
            loading: false
        }
    }))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3].length).toBe(3)
    expect(endState[todolistID3][1].title).toBe('hcahbdc')
    expect(endState[todolistID3][2].status).toBe(1)
})
test('correct task should be removed', () => {
    let endState = taskReducer(startState, removeTaskTC.fulfilled({todolistID: todolistID3, taskID: taskID},'requestId',{todolistID: todolistID3, taskID: taskID}))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    // expect(endState[todolistID3].length).toBe(2)
    // expect(endState[todolistID3][0].title).toBe("Helmet")
    // expect(endState[todolistID3][1].title).toBe("Crank")
})
test('correct task should be loaded', () => {
    let endState = taskReducer(startState, loadTask({todolistID: todolistID3, taskID: taskID, loading: true}))

    expect(endState[todolistID4].length).toBe(3)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID3][0].title).toBe("Helmet")
    expect(endState[todolistID3][1].loading).toBe(true)
})