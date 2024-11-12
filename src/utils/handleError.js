import api from "../api/api";

const handleError = (error) => {
  const originalRequest = error.config;

  if (error.response.data.msg === "jwt expired") {
    originalRequest._retry = true; //request ini perlu dicoba ulang dengan token yang baru

    const session = localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : {};

    return api
      .get(`/api/refresh-token/${session.refreshToken}/${session.email}`)
      .then((res) => {

        localStorage.setItem(
          "authToken",
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`; // mengganti ketoken yang baru

        return api(originalRequest); //hit ulang endpoint dan mengenmbalikan dalam bentuk promise
      })
      .catch((err) => {
        console.log("err");
        console.log(err.message);
        // localStorage.removeItem("authToken");
        // window.location.href = "/auth/signin";
        return Promise.reject(err);
      });
  }
  return Promise.reject(error);
};

export default handleError;
