import axiosInstance from "../api/apiConfig";

const usersList = (signal:AbortSignal) => axiosInstance.get(`users/`,{signal});
const currentUser=(signal:AbortSignal)=>axiosInstance.get(`current_user/`,{signal});

const userServices = {
    usersList,
    currentUser
};

export default userServices;