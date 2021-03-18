import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Button, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWitchReducer() {

    function removeTask(id: string, todoLIstId: string) {
        const action = removeTaskAC(id, todoLIstId)
        dispatchToTasksReducer(action)
    }

    function addTasks(title: string, todoLIstId: string) {
        const action = addTaskAC(title, todoLIstId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, title: string, todoLIstId: string) {
        const action = changeTaskTitleAC(taskId, title, todoLIstId)
        dispatchToTasksReducer(action)
    }

    //меняем чекбокс
    function changeStatus(taskId: string, isDone: boolean, todoLIstId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoLIstId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        const action = changeFilterTodolistAC(todolistId, filter)
        dispatchToTodoListReducer(action)

    }

    let removeTl = (todoLIstId: string) => {
        const action = removeTodolistAC(todoLIstId)
        dispatchToTodoListReducer(action)
        dispatchToTasksReducer(action)
    }

    function addNewTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodoListReducer(action)
        dispatchToTasksReducer(action)
    }


    function changeTodoLIstTitle(title: string, todoListId: string) {
        const action = changeTitleTodolistAC(todoListId, title)
        dispatchToTodoListReducer(action)
    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, dispatchToTodoListReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to bye', filter: 'completed'}
        ])


    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
    {
        [todoListId1]
    :
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest Api", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
            [todoListId2]
    :
        [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: false}
        ]
    }
)

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

export default AppWitchReducer;
