import React, {useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    callback: (id: string, title: string) => void
    id: string
    isDone?: boolean
}
const EditSpan = React.memo(({title, callback, id, isDone}: EditSpanPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [stateTitle, setStateTitle] = useState(title)

    const activate = useCallback(() => {
        setChangeMode(true)
    }, [])
    const desactivate = useCallback(() => {
        setChangeMode(false)
        callback(id, stateTitle)
    }, [callback, id, stateTitle])

    return changeMode
        ? <TextField id="outlined-basic" label={title} variant="outlined"
                     value={stateTitle} onChange={(e) => setStateTitle(e.currentTarget.value)}
                     autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate}
                style={isDone ? {opacity: '0.4'} : {}}>{title}</span>
})

export default EditSpan;