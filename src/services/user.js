import { api } from "configs/api"


const getProfile = () => api.get("/user/whoami").then(res => res || null);

const getPosts = () => api.get("/post/my")

const getAllPosts = () => api.get("")

const deletePost = (id) => api.delete(`/post/delete/${id}`);



export { getProfile, getPosts, getAllPosts, deletePost }