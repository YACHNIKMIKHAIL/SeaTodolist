import {v1} from "uuid";
import {
    changeTodolistFilterAC,
    changeTodolistStatusAC, changeTodolistsTC,
    postTodolistsTC, removeTodolistsTC,
    SeaTodolistsType,
    todolistReducer
} from "./TodolistReducer";
import {ApiTodolistType} from "../../../../Api/SeaApi";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string

let startState: SeaTodolistsType[] = []

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn?', filter: 'all', todolistStatus: 'idle'},
        {id: todolistID2, title: 'What to buy?', filter: 'all', todolistStatus: 'idle'},
        {id: todolistID3, title: 'What to fixie?', filter: 'all', todolistStatus: 'idle'},
        {id: todolistID4, title: 'C чего начать?', filter: 'all', todolistStatus: 'idle'}
    ] as SeaTodolistsType[]
})

test('correct todolist should be removed', () => {
    let endState = todolistReducer(startState, removeTodolistsTC.fulfilled({todolistId: todolistID1}, 'requestId', {todolistID: todolistID1}))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to buy?')
})
test('correct todolist should be added', () => {

    let endState = todolistReducer(startState, postTodolistsTC.fulfilled({
        item: {} as ApiTodolistType
    }, 'requestId', 'dcerd'))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(5)
})
test('correct todolist title should be changed', () => {
    let endState = todolistReducer(startState, changeTodolistsTC.fulfilled({
            todolistId: todolistID3,
            newTitle: 'Changed todolist'
        }, 'requestId', {
            todolistID: todolistID3,
            title: 'Changed todolist'
        }
    ))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(4)
    expect(endState[2].title).toBe('Changed todolist')
})
test('correct todolist filter should be changed', () => {
    let endState = todolistReducer(startState, changeTodolistFilterAC({todolistId: todolistID3, filter: 'complited'}))

    expect(endState.length).toBe(4)
    expect(endState[2].filter).toBe('complited')
})
test('correct todolist status should be changed', () => {
    let endState = todolistReducer(startState, changeTodolistStatusAC({todolistId: todolistID3, status: 'loading'}))

    expect(endState.length).toBe(4)
    expect(endState[2].todolistStatus).toBe('loading')
})