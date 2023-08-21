import api from "../../Service/api";
import { saveLoginData } from "../reducers/auth";

export const Login = (data, callback) => async (dispatch) => {
  api
    .post("/auth/validateuser", data)
    .then((response) => {
      console.log("Validate user data ->", response.data);
      if (response.data?.Details) {
        api
          .post("/auth/login", {
            UserId: response.data?.Details?.Id,
            UserType: response.data?.Details?.UserType,
          })
          .then((response) => {
            console.log("Login data -->", response.data);
            dispatch(saveLoginData(response.data));
            callback({
              status: true,
              response: response?.data,
            });
          })
          .catch((err) => {
            {
              console.log("error", err);
            }
          });
      } else if (response.data?.Error) {
        callback({ status: false, error: response.data?.Error?.ErrorMessage });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};

export const Logout = (data, token, callback) => async (dispatch) => {
  console.log("inside Logout", data);
  console.log("inside token", token);
  api
    .post("/auth/logout", data, {
      headers: {
        AuthToken: token,
      },
    })
    .then((response) => {
      console.log("LOGOUT RESPONSE :: ==>", response.data);
      if (response.data?.Details) {
        console.log("LOGOUT :: ==>", response.data?.Details);

        callback({ status: true, res: response.data?.Details });
      } else if (response.data?.Error?.ErrorMessage) {
        callback({ status: false, res: response.data?.Error?.ErrorMessage });
      }
    })
    .catch((err) => {
      callback({ status: true, res: err });
    });
};
