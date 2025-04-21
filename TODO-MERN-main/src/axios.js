import axios from "axios";

const API_URL = "http://localhost:5000/api/todos/"; // Updated API URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers : {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": true,
    }
})

export const fetchTodo = async () => {
    try {
        const response = await axiosInstance.get("/");
        return response.data;
    } catch (err) {
        console.error("Error fetching: ", err)
        throw err
    }
}

export const createTodo = async (description) => {
    try {
        const response = await axiosInstance.post("/", {description});
        return response.data;
    } catch (err) {
        console.error("Error creating: ", err)
        throw err
    }
}

export const deleteTodo = async (id) => {
    try {
        console.log(id);
       
      await axiosInstance.delete(`/${id}`);
    } catch (err) {
      console.error("Error deleting:", err);
      throw err;
    }
  }
  
  export const editTodo = async (id, task) => {
    try {
      console.log(id);
      await axiosInstance.put(`/${id}`, {
        description: task.description,
        completed: task.completed
      });
    } catch (err) {
      console.error("Error Editing", err);
      throw err;
    }
  };
  
  

export default axiosInstance
