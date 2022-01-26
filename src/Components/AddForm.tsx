import React, {useState} from 'react';

type AddFormPropsType = {
    addFn: (title: string) => void
}
const AddForm = (props:AddFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            if (title.trim().length < 11) {
                props.addFn(title.trim())
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
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error !== '' ? <div style={{color: 'red'}}>{error}</div> : ''}
        </div>
    );
};

export default AddForm;