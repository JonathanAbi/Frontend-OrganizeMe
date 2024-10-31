import axios from "axios";

const handleError = async (error) => {
  const originalRequest = error.config;

  // Cek jika error berasal dari token yang expired
  if (
    error.response &&
    error.response.data &&
    error.response.data.msg === "jwt expired" &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true; //request ini perlu dicoba ulang dengan token yang baru

    const session = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/cms/refresh-token/${session.refreshToken}/${session.email}`
      );

      // Simpan token baru di localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...session,
          token: res.data.data.token,
        })
      );

      // Set header Authorization dengan token baru
      originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;

      // Ulangi request asli dengan token yang diperbarui
      return axios(originalRequest);
    } catch (err) {
      console.error("Error refreshing token:", err);

      // Jika refresh gagal, redirect ke login dan hapus session
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
  }

  // Jika bukan error karena token expired, return error seperti biasa
  return Promise.reject(error);
};

export default handleError;
