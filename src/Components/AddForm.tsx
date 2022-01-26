import React, {useCallback, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddFormPropsType = {
    addFn: (title: string) => void
}
const AddForm = React.memo(({addFn}: AddFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const addTaskHandler = useCallback(() => {
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
    }, [addFn, title])
    const onKeyPressHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }, [addTaskHandler])
    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }, [])

    console.log('AddForm called')
    return (
        <div>
            <TextField id="outlined-basic" label="New challenge:" variant="outlined"
                       value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}/>
            <Button variant="contained" onClick={addTaskHandler} style={{height: '55px'}}>Add</Button>
        </div>
    );
})

export default AddForm;