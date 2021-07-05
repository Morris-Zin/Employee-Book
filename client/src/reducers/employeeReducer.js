import {
  CREATE,
  DELETE,
  EDIT,
  LOADING_STARTED,
  GET,
  QUERY,
  LOADING_ENDED,
} from "../CONSTANTS/actionTypes";

const INITIAL_STATE = {
  employees: [],
  isLoading: true,
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return { ...state, isLoading: true };

    case LOADING_ENDED:
      return { ...state, isLoading: false };

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
