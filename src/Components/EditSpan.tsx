import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    callback:(title:string)=>void
}
const EditSpan = React.memo(({title,callback}: EditSpanPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [stateTitle, setStateTitle] = useState(title)

    console.log(`EditSpan ${title}`)
    const activate = () => {
        debugger
        setChangeMode(true)
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
        : <span onDoubleClick={activate}
        >{title}</span>
})

export default EditSpan;