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
            if (title.trim().length < 20) {
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

    return (
        <div>
            {/*<TextField id="outlined-basic" label="New challenge:" variant="outlined"*/}
            {/*           value={title} onChange={onChangeHandler}*/}
            {/*           onKeyPress={onKeyPressHandler}*/}
            {/*           helperText={error}*/}
            {/*/>*/}
            <TextField id="filled-basic" label="New challenge:" variant="filled"
                       value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}
                       style={!error
                           ? {backgroundColor: 'white', opacity: '0.6', color: '#F3D9D4'}
                           : {backgroundColor: 'red', opacity: '0.4', color: 'white'}}
            />

            <Button variant="contained" onClick={addTaskHandler}
                    style={{height: '55px', backgroundColor: '#1F4B76',color:'hotpink'}}>Add</Button>
        </div>
    );
})

export default AddForm;