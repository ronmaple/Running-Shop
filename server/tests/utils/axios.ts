import AxiosInstance from 'axios'

const axios = AxiosInstance.create({
  baseURL: 'http://localhost:3000' || process.env.BASE_URL
})

// TODO: meaningful logs
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

export default axios