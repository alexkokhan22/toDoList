import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const task1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ]
    const task2 = [
        {id: 1, title: "Hello World", isDone: false},
        {id: 2, title: "I am Happy", isDone: true},
        {id: 3, title: "Yo", isDone: false},
    ]
    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task1}/>
            <TodoList title={"What to read"} tasks={task2}/>
        </div>
    );
}

export default App;
