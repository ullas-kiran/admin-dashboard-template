import axiosInstance from "../api/apiConfig";
const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
}

const urlEncodeConfig={
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

const usersList = (signal:AbortSignal) => axiosInstance.get(`users/`,{signal});
const currentUser=(signal:AbortSignal)=>axiosInstance.get(`current_user/`,{signal});
const userRegister=(data:any)=>axiosInstance.post("user/register",data);
const uploadResume=(data:any)=>axiosInstance.post("/upload/resume/",data,config);
const uploadDocs=(docs:any)=>axiosInstance.post("/upload/docs/",docs,urlEncodeConfig)

const userServices = {
    usersList,
    currentUser,
    userRegister,
    uploadResume,
    uploadDocs
};

export default userServices;