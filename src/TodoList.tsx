import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";


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
}

export function TodoList(props: todoListPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onNewTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        //метод обрезает строку
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addTasks(newTaskTitle, props.id);
            setNewTaskTitle('');
        } else {
            setError('Tittle is required')
        }

    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTl = () => {props.removeTl(props.id)}


    return (
        <div>
            <h3>{props.title}<button onClick={removeTl}>x</button></h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTittleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={changeStatus}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}