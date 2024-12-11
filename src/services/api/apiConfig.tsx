import {setupInterceptorsTo} from "./interceptors";
import axios from "axios";

// global instance
// setupInterceptorsTo(axios);


// for specific
const axiosInstance =axios.create({
    baseURL: "https://api.example.com", // Replace with your API base URL
    timeout: 10000, 
    headers: {
      "Content-Type": "application/json",
    },
}) 
setupInterceptorsTo(axiosInstance);

export default axiosInstance;