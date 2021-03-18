import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditTableSpan from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    removeTask: (taskId: string, todoLIstId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoLIstId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoLIstId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTitle = useCallback((title: string) => {
            props.changeTaskTitle(props.task.id, title, props.todolistId)
        }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={'secondary'}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditTableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )

})