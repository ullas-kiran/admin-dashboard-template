import axiosInstance from "../api/apiConfig";
const config = {
  headers: {
      'content-type': 'application/x-www-form-urlencoded'
  }
}


const login = (data: Record<string, any>) => axiosInstance.post(`admin/login/`, data,config);

const loginService = {
  login,
};

export default loginService;
