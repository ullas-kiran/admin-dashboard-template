import axiosInstance from "../api/apiConfig";
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

const usersList = (signal:AbortSignal) => axiosInstance.get(`users/`,{signal});
const currentUser=(signal:AbortSignal)=>axiosInstance.get(`current_user/`,{signal});
const userRegister=(data:any)=>axiosInstance.post("user/register",data);
const uploadResume=(data:any)=>axiosInstance.post("/upload/resume",data,config);
const uploadDocs=(docs:any)=>axiosInstance.post("/upload/docs",docs)

const userServices = {
    usersList,
    currentUser,
    userRegister,
    uploadResume,
    uploadDocs
};

export default userServices;