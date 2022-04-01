import {useSeaSelector} from "../App/store";
import {todolistsActions} from "../Features/Todolists/Todolist/todoTasksIndex";
import Button from "@material-ui/core/Button";
import React from "react";
import {useSeaAction} from "../SeaUtils/ReduxUtils";
import {FilteredButtonType} from "./ComponentsTypes";
import {FilterType} from "../Features/Todolists/Todolist/TodolistTypes";

export const FilteredButton = ({actualFilter, todolistId}: FilteredButtonType) => {
    const buttonStyle = {
        active: {
            backgroundColor: 'hotpink', opacity: '0.9', color: '#071421',
            fontWeight: 'bold'
        },
        disactive: {
            backgroundColor: '#1F4B76', opacity: '0.7', color: 'hotpink'
        }
    }
    const currentFilter = useSeaSelector<FilterType>(state => state.todolists.filter(f => f.id === todolistId)[0].filter)
    const {changeTodolistFilter} = useSeaAction(todolistsActions)

    const changeFilter = (filter: FilterType) => {
        if (actualFilter === currentFilter) {
            return
        }
        changeTodolistFilter({todolistId: todolistId, filter: filter})
    }

    return <Button
        variant={currentFilter === actualFilter ? "contained" : 'outlined'}
        style={currentFilter === actualFilter ? buttonStyle.active : buttonStyle.disactive}
        onClick={() => changeFilter(actualFilter)}>{actualFilter}</Button>
}