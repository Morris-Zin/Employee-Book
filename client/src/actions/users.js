const { SIGNUP_USER, LOGIN_USER } = require("../api");
const { LOG_IN, SIGN_UP, LOG_OUT } = require("../CONSTANTS/actionTypes");

export const signup = (postData, history) => async (dispatch) => {
  const { data } = await SIGNUP_USER(postData);

  if (data.response && typeof data.response !== "string") {
    await dispatch({ type: SIGN_UP, payload: data });
    history.push("/");
  }
};

export const logIn = (postData, history) => async (dispatch) => {

  const { data } = await LOGIN_USER(postData);
  
  if (data.response && typeof data.response !== "string") {
    await dispatch({ type: LOG_IN, payload: data });
    history.push("/");
  }
};

export const logOut = (history) => async (dispatch) => {
  await dispatch({ type: LOG_OUT });
  history.push("/");
};
