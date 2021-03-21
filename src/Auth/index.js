import axios from "axios";

const Backend = axios.create({
  baseURL: "http://localhost:9999",
  withCredentials: true,
});

Backend.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("refreshing the token...");
      return Backend.post("/user/refresh/token")
        .then((res) => {
          if (res.status === 200) {
            console.log("token is refreshed");
            return Backend(originalRequest);
          }
        })
        .catch(() => {
          window.location.replace("/login");
          return Promise.reject(error);
        });
    }
  }
);

export default Backend;
