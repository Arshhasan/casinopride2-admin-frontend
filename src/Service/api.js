import axios from "axios";

console.log("process.env.BOOKING_PORT", process.env.BOOKING_PORT);

const api = {
  BOOKING_PORT: axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BOOKING_PORT}/api`,
    headers: {
      Authorization: "Qm94d1I5MFA6U3BMSlQ1NFFk",
    },
  }),

  CORE_PORT: axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_CORE_PORT}/api`,
    headers: {
      Authorization: "Qm94d1I5MFA6U3BMSlQ1NFFk",
    },
  }),

  AUTH_PORT: axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH_PORT}/api`,
    headers: {
      Authorization: "Qm94d1I5MFA6U3BMSlQ1NFFk",
    },
  }),
};

export default api;
