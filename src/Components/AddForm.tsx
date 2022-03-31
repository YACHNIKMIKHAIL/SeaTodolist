import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import {seaReducerType} from "../App/store";
import {seaStatusTypes} from "../App/SeaAppReducer";
import styled from "styled-components";

type AddFormPropsType = {
    addFn: (title: string) => Promise<any>
}
const AddForm = React.memo(({addFn}: AddFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const seaStatus = useSelector<seaReducerType, seaStatusTypes>(state => state.app.seaStatus)


    const addTaskHandler = async () => {
        if (title.trim() !== '') {
            if (title.trim().length < 20) {
                try {
                    await addFn(title.trim())
                    setTitle('')
                } catch (err:any) {
                    setError(err)
                }
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
        <AddFormCase>
            <TextField id="filled-basic" label="New challenge:" variant="filled"
                       value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       disabled={seaStatus === 'loading'}
                       helperText={error}
                       style={!error
                           ? {backgroundColor: 'white', opacity: '0.6', color: '#F3D9D4'}
                           : {backgroundColor: 'red', opacity: '0.4', color: 'white'}}
            />

            <Button variant="contained" onClick={addTaskHandler} disabled={seaStatus === 'loading'}
                    style={{height: '55px', backgroundColor: '#1F4B76', color: 'hotpink'}}>Add</Button>
        </AddFormCase>
    );
})

export default AddForm;

const AddFormCase = styled.div`
  display: flex;
  justify-content: space-around;
`