import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

function App() {
    const initialTasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "rest api", isDone: false },
        { id: 5, title: "graphQL", isDone: false },
    ]
    const [state,setState]=useState<Array<TaskType>>(initialTasks)

    const removeTask=(id:number)=>{
        setState(state.filter(f=>f.id!==id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={state}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
