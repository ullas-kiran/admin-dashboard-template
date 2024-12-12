import axiosInstance from "../api/apiConfig";

const usersList = (signal:AbortSignal) => axiosInstance.get(`users/`,{signal});

const userServices = {
    usersList
};

export default userServices;