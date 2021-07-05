import { CREATE, DELETE, EDIT, GET, QUERY } from "../CONSTANTS/actionTypes";

// const initialState = [{
//     name: '',
//     active: null,
//     startDate: '',
//     salary: '',
//     address: '',
//     phoneNumber: null
// }];

const employeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case GET:
      return {
        employees: action.payload.response,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case QUERY:
      return { ...state, employees: action.payload };
      
    case CREATE:
      if (typeof state.employees !== "string") {
        return { ...state, employees: [...state.employees, action.payload] };
      } else break;

    case EDIT:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          return employee._id === action.payload._id
            ? action.payload
            : employee;
        }),
      };
    case DELETE:
      return {
        ...state,
        employees: state.employees.filter((employee) => {
          return employee._id !== action.id;
        }),
      };
    default:
      return state;
  }
};

export default employeeReducer;
