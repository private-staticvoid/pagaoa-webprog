import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const API = axios.create({
  baseURL: `${BASE_URL}/api/article`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const mapArticleFromApi = (a) => ({
  ...a,
  id: a._id ?? a.id,
  name: a.name ?? "",
  title: a.title ?? "",
  imageUrl: a.imageUrl ?? "",
  isActive: a.isActive ?? true,
  content: Array.isArray(a.content) ? a.content : [a.content ?? ""],
});

export const getArticleErrorMessage = (err) => {
  if (err?.response?.status === 404) return "Article not found.";
  if (err?.response?.status === 500)
    return "Server error. Please try again later.";
  return (
    err?.response?.data?.message ||
    "Failed to load article. Check your connection."
  );
};

export const fetchArticles = () => API.get("/");
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);
