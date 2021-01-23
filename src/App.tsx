import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([

        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest Api", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},

    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string ) {
        tasks = tasks.filter(t => t.id !== id);
        setTasks(tasks)
    }

    function addTasks(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
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
                      addTasks={addTasks}
            />
        </div>
    );
}

export default App;
