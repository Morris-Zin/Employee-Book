import axios from "axios";

let API;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  API = axios.create({ baseURL: "http://localhost:8000" });
} else {
  // production code
  API = axios.create({ baseURL: "" });
}
export const FETCH_POSTS = () => API.get("/api/getEmployees");
export const CREATE_POST = (postData) => API.post("/api/addEmployee", { postData });
export const EDIT_POST = (postData, id) => API.patch(`/api/editEmployee/${id}`, { postData });
export const DELETE_POST = (id) => API.delete(`/api/deleteEmployee/${id}`)