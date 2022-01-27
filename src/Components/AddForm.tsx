import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddFormPropsType = {
    addFn: (title: string) => void
}
const AddForm = React.memo(({addFn}: AddFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            if (title.trim().length < 11) {
                addFn(title.trim())
                setTitle('')
            } else {
                setError('Title is too long!')
            }
        } else {
            setError('Invalid title!')
        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    console.log(`AddForm ${title}`)
    return (
        <div>
            <TextField id="outlined-basic" label="New challenge:" variant="outlined"
                       value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}/>
            <Button variant="contained" onClick={addTaskHandler} style={{height: '55px',backgroundColor:'rgba(243,217,212,0.55)'}}>Add</Button>
        </div>
    );
})

export default AddForm;