import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";

const authReducer = (state, action) => {
  switch (action.type) {
    case "update_error":
      return { ...state, errorMessage: action.payload };
    case "update_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const login = (dispatch) => {
  return async ({ email, password }, callback) => {
    const loginDetails = { email, password };

    if (
      loginDetails.email !== "" &&
      emailCheck.test(String(loginDetails.email).toLowerCase()) &&
      loginDetails.password !== ""
    ) {
      try {
        const response = await leanLoggerApi.post("/login", loginDetails);
        dispatch({
          type: "update_token",
          payload: response.data.login_token,
        });
        dispatch({
          type: "update_error",
          payload: "",
        });
        if (callback) {
          callback();
        }
      } catch (err) {
        switch (err.response.status) {
          case 404:
            dispatch({
              type: "update_error",
              payload:
                "Cannot find a user with those details, please try again.",
            });
            break;
          case 422:
            dispatch({
              type: "update_error",
              payload: "Please provide a valid email address.",
            });
            break;
          case 500:
            dispatch({
              type: "update_error",
              payload: "Server error, please try again.",
            });
            break;
          default:
            dispatch({
              type: "update_error",
              payload: "Something went wrong with log in",
            });
        }
      }
    } else {
      if (loginDetails.email === "" || loginDetails.password === "") {
        dispatch({
          type: "update_error",
          payload:
            "Please ensure you have filled out both your email address and password.",
        });
      } else {
        dispatch({
          type: "update_error",
          payload: "Please provide a valid email address.",
        });
      }
    }
  };
};

const register = (dispatch) => {
  return async ({ email, password, opt_in }, callback) => {
    let registerDetails = { email, password, opt_in };

    if (registerDetails.opt_in) {
      registerDetails = { ...registerDetails, opt_in: 1 };
    } else {
      registerDetails = { ...registerDetails, opt_in: 0 };
    }

    if (
      registerDetails.email !== "" &&
      emailCheck.test(String(registerDetails.email).toLowerCase()) &&
      registerDetails.password !== "" &&
      registerDetails.opt_in === 1
    ) {
      try {
        const registerResponse = await leanLoggerApi.post(
          "/register",
          registerDetails
        );
        const loginResponse = await leanLoggerApi.post("/login", {
          email,
          password,
        });
        dispatch({
          type: "update_token",
          payload: loginResponse.data.login_token,
        });
        dispatch({
          type: "update_error",
          payload: "",
        });
        if (callback) {
          callback();
        }
      } catch (err) {
        switch (err.response.status) {
          case 404:
            dispatch({
              type: "update_error",
              payload:
                "Cannot find a user with those details, please try again.",
            });
            break;
          case 422:
            if (
              err.response.data.errors.email[0] ===
              "The email has already been taken."
            ) {
              dispatch({
                type: "update_error",
                payload:
                  "The email address is already in use, please try again.",
              });
            } else {
              dispatch({
                type: "update_error",
                payload: "Please enter a valid email address.",
              });
            }
            break;
          case 500:
            dispatch({
              type: "update_error",
              payload: "Server error, please try again.",
            });
            break;
          default:
            dispatch({
              type: "update_error",
              payload: "Something went wrong with log in",
            });
        }
      }
    } else {
      if (registerDetails.email === "" || registerDetails.password === "") {
        dispatch({
          type: "update_error",
          payload:
            "Please ensure you have filled out both your email address and password.",
        });
      } else if (
        !emailCheck.test(String(registerDetails.email).toLowerCase())
      ) {
        dispatch({
          type: "update_error",
          payload: "Please provide a valid email address.",
        });
      } else if (registerDetails.opt_in !== 1) {
        dispatch({
          type: "update_error",
          payload: "Please ensure you have agreed to the Terms and Conditions.",
        });
      }
    }
  };
};

const signout = (dispatch) => {
  return () => {
    // Make API request
  };
};

const requestpasswordreset = (dispatch) => {
  return async ({ email }) => {
    try {
      const response = await leanLoggerApi.post("request-password-reset", {
        email,
      });
      console.log(response.data);
    } catch (err) {
      dispatch({
        type: "update_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, register, signout, requestpasswordreset },
  { token: "", errorMessage: "" }
);
