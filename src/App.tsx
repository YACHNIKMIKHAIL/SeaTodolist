import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

function App() {
    const initialTasks = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "rest api", isDone: false},
        {id: v1(), title: "graphQL", isDone: false},
    ]
    const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks)
    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const addTask = (newTitle: string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])

    }

    let tasksForRender = tasks
    if (filter === 'complited') {
        tasksForRender = tasks.filter(f => f.isDone)
    }
    if (filter === 'active') {
        tasksForRender = tasks.filter(f => !f.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={filter}
            />
        </div>
    );
}

export default App;
