import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTlActionType, RemoveTlActionType, todoListId1, todoListId2} from "./todolists-reducer";
import {FilterValuesType} from "../AppWithReducers";


type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todoListId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

type ChangeTaskStatusACType = {
    type: 'CHANGE-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string

}

type ChangeTaskTitleACType = {
    type: 'CHANGE-TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type ActionsTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTlActionType
    | RemoveTlActionType

const initialState: TasksStateType = {
    [todoListId1]:
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest Api", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
    [todoListId2]:
        [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: false}
        ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = {...state}
            let todolistTask = copyState[action.todoListId]
            copyState[action.todoListId] = todolistTask.filter(t => t.id != action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [task, ...todoListTasks]
            return copyState
        }
        case 'CHANGE-STATUS': {
            let copyState = {...state}
            let task = copyState[action.todolistId]
            let newTask = task.find(t => t.id === action.taskId)
            if (newTask) {
                newTask.isDone = action.isDone
            }
            return copyState
        }

        case 'CHANGE-TITLE': {
            let copyState = {...state}
            let task = copyState[action.todolistId]
            let newTask = task.find(t => t.id === action.taskId)
            if (newTask) {
                newTask.title = action.title
            }
            return copyState
        }

        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId: taskId, todoListId: todoListId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}

