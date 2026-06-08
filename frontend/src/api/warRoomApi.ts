// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
// });

// export default api;

// // import axios from "axios";

// const API_URL = "http://127.0.0.1:8000";

// export const runDecision = async (query: string) => {
//   const response = await axios.post(
//     `${API_URL}/run-decision`,
//     { query }
//   );

//   return response.data;
// };

// export const getDecisionHistory = async () => {
//   const response = await axios.get(
//     `${API_URL}/decisions`
//   );

//   return response.data;
// };



import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const runDecision = async (query: string) => {
  const response = await api.post("/run-decision", {
    query,
  });

  return response.data;
};

export const getDecisionHistory = async () => {
  const response = await api.get("/decisions");

  return response.data;
};

export default api;