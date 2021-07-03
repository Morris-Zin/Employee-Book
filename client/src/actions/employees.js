import { CREATE_POST, DELETE_POST, EDIT_POST, FETCH_POSTS, QUERY_POSTS } from "../api";
import { CREATE, DELETE, EDIT, GET } from "../CONSTANTS/actionTypes";

export const getEmployees = () => async (dispatch) => {
  try {
    const { data } = await FETCH_POSTS();
    dispatch({ type: GET, payload: data.response });
  } catch (error) {
    console.log(error);
  }
};

export const queryAndGetEmployees = (searchByName, salaryTags) => async (dispatch) => {
  try {
    const {data} = await QUERY_POSTS(searchByName, salaryTags); 
    console.log(data)
  } catch (error) {
    console.log(error); 
  }
}

export const createEmployee = (postData, history) => async (dispatch) => {
  try {
    const { data } = await CREATE_POST(postData);
    dispatch({type: CREATE, payload: data.response})
    history.push('/dashboard')
  } catch (error) {
    console.log(error); 
  }
};
export const editEmployee = (postData, id, history) => async (dispatch) => {
  try {
    const { data } = await EDIT_POST(postData, id); 
    dispatch({type: EDIT, payload: data.updatedEmployee})
    history.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}
export const deleteEmployee =  (id, history) => async (dispatch) => {
  try {
    await DELETE_POST(id); 
     dispatch({type: DELETE, id})
     history.push('/dashboard')
  } catch (error) {
    console.log(error); 
  }
}
