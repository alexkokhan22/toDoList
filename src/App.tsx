import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoLIstsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    function removeTask(id: string, todoLIstId: string ) {
        let remove = tasks[todoLIstId]
        let task = remove.filter(t => t.id !== id);
        tasks[todoLIstId] = task
        setTasks({...tasks})
    }

    function addTasks(title: string, todoLIstId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let task = tasks[todoLIstId]
        let newTasks = [newTask, ...task];
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, filterId: string) {
        let todoList = todoLists.find(tl => tl.id === filterId);
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }

    //меняем чекбокс
    function changeStatus(taskId: string, isDone: boolean, todoLIstId: string) {
        let taskss = tasks[todoLIstId]
        let task = taskss.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    //вариант через map
    /*const newTask = tasks.map( t => {
        if(t.id === taskId) {
            return {...t, isDone: isDone}
        } else {
            return t
        }
    })
    setTasks(newTask)*/

    let removeTl = (todoLIstId: string) => {
        let filterTl = todoLists.filter( tl => tl.id !== todoLIstId )
        setTodoLists(filterTl)
        delete tasks[todoLIstId]
        setTasks({...tasks})
    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoLIstsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bye', filter: 'completed'},
    ])



    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest Api", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: false}

        ]

    })

    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let taskForTodoList = tasks[tl.id];
                    if (tl.filter === 'completed') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTl={removeTl}
                    />
                })
            }

        </div>
    );
}

export default App;
