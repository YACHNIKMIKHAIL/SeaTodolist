import {v1} from "uuid";
import {SeaTodolistsType, todolistReducer} from "./TodolistReducer";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../Actions/TodolistsActions";

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
        {id: todolistID1, title: 'What to learn?', filter: 'all'},
        {id: todolistID2, title: 'What to buy?', filter: 'all'},
        {id: todolistID3, title: 'What to fixie?', filter: 'all'},
        {id: todolistID4, title: 'C чего начать?', filter: 'all'}
    ] as SeaTodolistsType[]
})

test('correct todolist should be removed', () => {
    let endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to buy?')
})
test('correct todolist should be added', () => {

    let endState = todolistReducer(startState, addTodolistAC({
        id: 'hbdcuhbc',
        title: 'New todolist',
        filter: 'all'
    } as SeaTodolistsType))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(5)
    expect(endState[0].title).toBe('New todolist')
})
test('correct todolist title should be changed', () => {
    let endState = todolistReducer(startState, changeTodolistTitleAC(todolistID3, 'Changed todolist'))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(4)
    expect(endState[2].title).toBe('Changed todolist')
})
test('correct todolist filter should be changed', () => {
    let endState = todolistReducer(startState, changeTodolistFilterAC(todolistID3, 'complited'))

    expect(endState.length).toBe(4)
    expect(endState[2].filter).toBe('complited')
})