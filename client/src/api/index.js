import axios from "axios";

let API;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  API = axios.create({ baseURL: "http://localhost:8000/api" });
} else {
  // production code
  API = axios.create({
    baseURL: "https://employee-book-api.herokuapp.com/api",
  });
}

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const token = JSON.parse(localStorage.getItem("profile")).token;
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const FETCH_POSTS = () => API.get("/getEmployees");

export const QUERY_POSTS = (searchByName, salaryTags) => API.delete(`/getEmployees/search?searchByName=${searchByName}&salaryTags=${salaryTags.join(',')}`);


export const CREATE_POST = (postData) => API.post("/addEmployee", { postData });
export const EDIT_POST = (postData, id) =>
  API.patch(`/editEmployee/${id}`, { postData });
export const DELETE_POST = (id) => API.delete(`/deleteEmployee/${id}`);

export const SIGNUP_USER = (userData) => API.post("/signup", { userData });
export const LOGIN_USER = (userData) => API.post("/login", { userData });
export const IMAGE_UPLOAD = (fileName, fileType) =>
  API.post("/uploadEmployeeImages", { fileName, fileType });
