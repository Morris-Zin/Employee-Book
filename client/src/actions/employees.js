import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  FETCH_POSTS,
  QUERY_POSTS,
} from "../api";
import {
  CREATE,
  DELETE,
  EDIT,
  GET,
  LOADING_ENDED,
  LOADING_STARTED,
  QUERY,
} from "../CONSTANTS/actionTypes";

export const getEmployees =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_STARTED });

      const { data } = await FETCH_POSTS(page);
      dispatch({ type: GET, payload: data });

      dispatch({ type: LOADING_ENDED });
    } catch (error) {
      console.log(error);
    }
  };

export const queryAndGetEmployees =
  ({ searchQuery, salaryTags }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_STARTED });

      const {
        data: { data },
      } = await QUERY_POSTS(searchQuery, salaryTags);
      dispatch({ type: QUERY, payload: data });

      dispatch({ type: LOADING_ENDED });
    } catch (error) {
      console.log(error);
    }
  };

export const createEmployee = (postData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_STARTED });

    const { data } = await CREATE_POST(postData);
    dispatch({ type: CREATE, payload: data.response });

    dispatch({ type: LOADING_ENDED });
    history.push("/dashboard");
    
  } catch (error) {
    console.log(error);
  }
};
export const editEmployee = (postData, id, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_STARTED });
    console.log('hi')
    console.log(postData)
    const { data } = await EDIT_POST(postData, id);
    dispatch({ type: EDIT, payload: data.updatedEmployee });

    dispatch({ type: LOADING_ENDED });
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
export const deleteEmployee = (id, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_STARTED });

    await DELETE_POST(id);
    dispatch({ type: DELETE, id });

    history.push("/dashboard");
    dispatch({ type: LOADING_ENDED });
  } catch (error) {
    console.log(error);
  }
};
