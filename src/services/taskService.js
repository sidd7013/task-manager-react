import axios from "axios";

const API_URL = window.location.hostname ==="localhost" ? "http://localhost:8080/tasks":"https://task-manager-backend-uq7s.onrender.com/tasks";


export const getTasks =()=>{
    return axios.get(API_URL);
};

export const createTask =(task)=>{
    return axios.post(API_URL,task);
};

export const deleteTaskApi =(id)=>{
    return axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskApi = (id,updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask);
};

export const updateTaskApi = (id, updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask);
};