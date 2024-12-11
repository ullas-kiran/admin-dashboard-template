import axiosInstance from "../api/apiConfig";

const login = (data: Record<string, any>) => axiosInstance.post(`/login`, data);

const loginService = {
  login,
};

export default loginService;
