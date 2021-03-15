import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Button, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {TasksStateType, TodoListsType} from "./App";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWitchRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function removeTask(id: string, todoLIstId: string) {
        const action = removeTaskAC(id, todoLIstId)
        dispatch(action)
    }

    function addTasks(title: string, todoLIstId: string) {
        const action = addTaskAC(title, todoLIstId)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, title: string, todoLIstId: string) {
        const action = changeTaskTitleAC(taskId, title, todoLIstId)
        dispatch(action)
    }

    //меняем чекбокс
    function changeStatus(taskId: string, isDone: boolean, todoLIstId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoLIstId)
        dispatch(action)
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        const action = changeFilterTodolistAC(todolistId, filter)
        dispatch(action)

    }

    let removeTl = (todoLIstId: string) => {
        const action = removeTodolistAC(todoLIstId)
        dispatch(action)
    }

    function addNewTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }


    function changeTodoLIstTitle(title: string, todoListId: string) {
        const action = changeTitleTodolistAC(todoListId, title)
        dispatch(action)
    }

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

                            let taskForTodoList = tasks[tl.id];
                            if (tl.filter === 'completed') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
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

export default AppWitchRedux;
