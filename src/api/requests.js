import axios from "./axios";

// Get all the available categories
export const getCategories = () => axios.get("/categories");

// Get all the questions of a spacific category
export const getQuestions = (category, difficulty, limit) =>
  axios.get(
    `/questions?categories=${category}&difficulty=${difficulty}&limit=${limit}`
  );
