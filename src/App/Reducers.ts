import {combineReducers} from "redux";
import {todolistReducer} from "../Features/Todolists/Todolist/todoTasksIndex";
import {taskReducer} from "../Features/Todolists/Todolist/Reducers/TaskReducer";
import {seaAppResucer} from "../Features/SeaApplication/SeaApplicationReducer";
import {seaAuthReducer} from "../Features/SeaLogin/authIndex";

export const seaReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: seaAppResucer,
    auth: seaAuthReducer
})