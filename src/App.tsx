import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskType, Todolist} from './Todolist';

function App() {
    const initialTasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "rest api", isDone: false },
        { id: 5, title: "graphQL", isDone: false },
    ]
    const [tasks,setTasks]=useState<Array<TaskType>>(initialTasks)
    const [filter,setFilter]=useState<FilterType>('all')

    const removeTask=(id:number)=>{
        setTasks(tasks.filter(f=>f.id!==id))
    }
    let tasksForRender=tasks
    if(filter==='complited'){
        tasksForRender=tasks.filter(f=>f.isDone)
    }
    if(filter==='active'){
        tasksForRender=tasks.filter(f=>!f.isDone)
    }

    const changeFilter=(filter:FilterType)=>{
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
