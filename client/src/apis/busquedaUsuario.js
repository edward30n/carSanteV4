import axios from "axios"
//api/v1/carSante
//http://localhost:4000/api/v1/carSante
export default axios.create({
     baseURL: "/api/v1/carSante",
});