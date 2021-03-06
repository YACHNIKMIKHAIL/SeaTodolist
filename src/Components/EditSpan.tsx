import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import {EditSpanPropsType} from "./ComponentsTypes";

const EditSpan = React.memo(({title, callback}: EditSpanPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [stateTitle, setStateTitle] = useState('')

    const activate = () => {
        setChangeMode(true)
        setStateTitle(title)
    }
    const desactivate = () => {
        setChangeMode(false)
        callback(stateTitle)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setStateTitle(e.currentTarget.value)

    return changeMode
        ? <TextField id="outlined-basic" label={title} variant="outlined"
                     value={stateTitle} onChange={changeTitle}
                     autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate} style={{maxWidth: '170', overflowX: 'scroll'}}
        >{title}</span>
})

export default EditSpan;