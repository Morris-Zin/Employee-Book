import { CREATE, DELETE, EDIT, GET, QUERY } from "../CONSTANTS/actionTypes";

// const initialState = [{
//     name: '',
//     active: null,
//     startDate: '',
//     salary: '',
//     address: '',
//     phoneNumber: null
// }];

const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case GET:
      return action.payload;
    case CREATE:
      if (typeof stae !== "string") {
        return [...state, action.payload];
      } else break;
    case EDIT:
      return state.map((employee) => {
        return employee._id === action.payload._id ? action.payload : employee;
      });
    case DELETE:
      return state.filter((employee) => {
        return employee._id !== action.id;
      });
    default:
      return state;
  }
};

export default employeeReducer;
