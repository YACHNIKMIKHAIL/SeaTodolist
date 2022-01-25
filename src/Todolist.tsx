import React, {useState} from 'react';

export type FilterType = 'all' | 'complited' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const removeTaskHandler = (id: string) => props.removeTask(id)
    const changeTaskFilterHandler = (filterValue: FilterType) => props.changeFilter(filterValue)


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error ? <div>Invalid Title!</div> : ''}
        </div>
        <ul>
            {props.tasks.map(m => {
                return <li key={m.id}>
                    <input type="checkbox" checked={m.isDone}/>
                    <span>{m.title}</span>
                    <button onClick={() => removeTaskHandler(m.id)}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={() => changeTaskFilterHandler('all')}>All</button>
            <button onClick={() => changeTaskFilterHandler('active')}>Active</button>
            <button onClick={() => changeTaskFilterHandler('complited')}>Complited</button>
        </div>
    </div>
}
