import axios from 'axios';

const handleError = (error) => {
  const originalRequest = error.config;
  if (error.response.data.msg === 'jwt expired') {
    originalRequest._retry = true; //request ini perlu dicoba ulang dengan token yang baru
    const session = localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken'))
      : {};

    return axios
      .get(`${process.env.REACT_APP_API_URL}/refresh-token/${session.refreshToken}/${session.email}`)
      .then((res) => {
        console.log('res');
        console.log(res);
        localStorage.setItem(
          'authToken',
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`; // mengganti ketoken yang baru

        console.log('originalRequest');
        console.log(originalRequest);

        return axios(originalRequest); //hit ulang endpoint dan mengenmbalikan dalam bentuk promise
      })
      .catch((err) => {
        console.log(err)
        window.location.href = '/auth/signin';
        localStorage.removeItem('authToken');
      });
  }
  return Promise.reject(error);
};

export default handleError;