import axios from "axios";

// replace this baseURL with environment variable in future.
const instance = axios.create({
    baseURL: "http://localhost:8080",
});

export default instance;
