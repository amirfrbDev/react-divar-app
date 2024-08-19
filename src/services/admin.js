import { api } from "configs/api"

const addCategory = data => api.post("/category", data)

const getCategories = () => api.get("/category")

const deleteCategory = id => api.delete(`/category/${id}`, { id })

export { addCategory, getCategories, deleteCategory }