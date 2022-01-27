import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";
import {changeTodolistTitleAC} from "./Redux/TodolistsActions";
import {useDispatch} from "react-redux";

type EditSpanPropsType = {
    title: string
    id: string
}
const EditSpan = React.memo(({title, id}: EditSpanPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [stateTitle, setStateTitle] = useState(title)
    const dispatch = useDispatch()
    console.log(`EditSpan ${title}`)
    const activate = () => {
        setChangeMode(true)
    }
    const desactivate = () => {
        setChangeMode(false)
        dispatch(changeTodolistTitleAC(id, stateTitle))
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setStateTitle(e.currentTarget.value)

    return changeMode
        ? <TextField id="outlined-basic" label={title} variant="outlined"
                     value={stateTitle} onChange={changeTitle}
                     autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate}
        >{title}</span>
})

export default EditSpan;