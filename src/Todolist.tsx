import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(m => {
                return <li key={m.id}>
                    <input type="checkbox" checked={m.isDone}/>
                    <span>{m.title}</span>
                    <button onClick={() => props.removeTask(m.id)}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}
