import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";


type RemoveTlActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTlActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

type ChangeTitleTlActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeFilterTlActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionsTypes = RemoveTlActionType | AddTlActionType | ChangeTitleTlActionType | ChangeFilterTlActionType


export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsTypes): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return   [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTlActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTlActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}

export const ChangeTitleTodolistAC = (todolistId: string, title: string): ChangeTitleTlActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}

export const ChangeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeFilterTlActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter }
}
