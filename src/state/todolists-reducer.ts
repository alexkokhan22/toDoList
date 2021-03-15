import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";


export type RemoveTlActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTlActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
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

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: Array<TodoListsType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to bye', filter: 'completed'}
]

export const todoListsReducer = (state: Array<TodoListsType> = initialState, action: ActionsTypes): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return   [...state, {
                id: action.todolistId,
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
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTlActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTlActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTitleTodolistAC = (todolistId: string, title: string): ChangeTitleTlActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}

export const changeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeFilterTlActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter }
}
