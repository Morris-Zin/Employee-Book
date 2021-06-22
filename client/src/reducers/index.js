import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
    employees: employeeReducer, 
    auth: authReducer
}); 
export default reducers; 