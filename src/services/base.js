import axios from 'axios';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { accept: "application/json" },
});




export default apiClient;
