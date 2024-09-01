//axiosConfig.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";// base-url of your backend server

//can also use interceptors if needed in future.

export default axios;