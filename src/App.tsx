import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Button, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    function removeTask(id: string, todoLIstId: string) {
        let remove = tasksObj[todoLIstId]
        let task = remove.filter(t => t.id !== id);
        tasksObj[todoLIstId] = task
        setTasksObj({...tasksObj})
    }

    function addTasks(title: string, todoLIstId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoLIstId]
        let newTasks = [task, ...tasks];
        tasksObj[todoLIstId] = newTasks
        setTasksObj({...tasksObj});
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
        let tasks = tasksObj[todoLIstId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let removeTl = (todoLIstId: string) => {
        let filterTl = todoLists.filter(tl => tl.id !== todoLIstId)
        setTodoLists(filterTl)
        delete tasksObj[todoLIstId]
        setTasksObj({...tasksObj})
    }

    function addNewTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListsType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasksObj({...tasksObj, [newTodoListId]: []})

    }

    function changeTaskTitle(taskId: string, title: string, todoLIstId: string) {
        let tasks = tasksObj[todoLIstId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasksObj({...tasksObj})
        }
    }

    function changeTodoLIstTitle(title: string, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])

        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bye', filter: 'completed'},
    ])


    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addNewTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            let taskForTodoList = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                taskForTodoList = tasksObj[tl.id].filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                taskForTodoList = tasksObj[tl.id].filter(t => t.isDone === false)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    < TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTasks={addTasks}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTl={removeTl}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoLIstTitle={changeTodoLIstTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
