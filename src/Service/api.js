import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9002/api",
  headers: {
    Authorization: "Qm94d1I5MFA6U3BMSlQ1NFFk",
  },
});
