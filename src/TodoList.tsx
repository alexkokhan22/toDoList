import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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

export function TodoList(props: todoListPropsType) {

    const addTask = (title: string) => {
        props.addTasks(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTl = () => {
        props.removeTl(props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoLIstTitle(title, props.id)
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
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }


                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    color={'secondary'}
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />
                                <EditTableSpan title={t.title} changeItem={changeTitle}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
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
                }