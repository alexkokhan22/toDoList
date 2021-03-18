import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


type todoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoLIstId: string) => void
    changeFilter: (value: FilterValuesType, filterId: string) => void
    addTasks: (tittle: string, todoLIstId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoLIstId: string) => void
    filter: FilterValuesType
    id: string
    removeTl: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoLIstId: string) => void
    changeTodoLIstTitle: (title: string, todoListId: string) => void
}

export const TodoList = React.memo((props: todoListPropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [props.addTasks, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    const removeTl = () => {
        props.removeTl(props.id)
    }

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoLIstTitle(title, props.id)
    }, [props.changeTodoLIstTitle, props.id])

    let allTodolistTask = props.tasks
    let taskForTodoList = allTodolistTask

    if (props.filter === 'completed') {
        taskForTodoList = allTodolistTask.filter(t => t.isDone === true)
    }
    if (props.filter === 'active') {
        taskForTodoList = allTodolistTask.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTl}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    taskForTodoList.map(t => <Task
                        task={t}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        todolistId={props.id}
                        key={t.id}
                    />)
                }
            </div>

            <div>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    variant={'contained'}
                    //className={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    variant={'contained'}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    variant={'contained'}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
})

