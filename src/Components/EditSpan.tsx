import React, {useState} from 'react';

type EditSpanPropsType = {
    title: string
    callback: (id:string,title: string) => void
    id:string
    isDone:boolean
}
const EditSpan = (props: EditSpanPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [stateTitle, setStateTitle] = useState(props.title)
    const activate = () => {
        setChangeMode(true)
    }
    const desactivate = () => {
        setChangeMode(false)
        props.callback(props.id,stateTitle)
    }

    return changeMode
        ? <input value={stateTitle} onChange={(e) => setStateTitle(e.currentTarget.value)}
                 autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate}
                style={props.isDone ? {opacity: '0.4'} : {}}>{props.title}</span>
};

export default EditSpan;