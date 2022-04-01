import {FilterType} from "../Features/Todolists/Todolist/TodolistTypes";

export type AddFormSubmitHelperType =
    { setTitle: (title: string) => void, setError: (error: string) => void }
    | undefined
export type AddFormPropsType = {
    addFn: (title: string, helper?: AddFormSubmitHelperType) => void
}


export type EditSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export type FilteredButtonType = {
    actualFilter: FilterType
    todolistId: string
}