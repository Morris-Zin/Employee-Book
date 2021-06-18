import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
    employees: employeeReducer
}); 
export default reducers; 