import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all'| 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([

        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest Api", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},

    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id !== id);
        setTasks(tasks)
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodoList = tasks;
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
