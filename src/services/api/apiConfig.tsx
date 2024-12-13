import {setupInterceptorsTo} from "./interceptors";
import axios from "axios";
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

// global instance
// setupInterceptorsTo(axios);


// for specific
const axiosInstance =axios.create({
    baseURL: baseURL, // Replace with your API base URL
    timeout: 10000, 
    headers: {
      'Content-Type': 'application/json',
    },
}) 
setupInterceptorsTo(axiosInstance);

export default axiosInstance;