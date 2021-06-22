const { LOG_IN, SIGN_UP, LOG_OUT } = require("../CONSTANTS/actionTypes");

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case SIGN_UP:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload };
    case LOG_IN:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload };
    case LOG_OUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:  
      return state;
  }
};
export default authReducer;
