import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer})

{/*type AppRootStateType = {
    todoLists: Array<TodoListsType>
    tasks: TasksStateType
}*/}

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;