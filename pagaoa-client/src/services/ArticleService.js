import constants from "../constant";
import axios from "axios";

const API = axios.create({
  baseURL: `${constants.HOST}/article`,
});

export const mapArticleFromApi = (a) => ({
  ...a,
  id: a._id ?? a.id,

  img: a.thumbnailUrl || "https://placehold.co/600x400?text=No+Image",

  desc: a.summary ?? "",
  name:
    a.slug ??
    a.title
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") ??
    a._id ??
    a.id,
});

export const fetchArticles = () => API.get("/");
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);
