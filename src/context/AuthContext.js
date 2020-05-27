import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_errors":
      return { ...state, errorMessage: action.payload, alertMessage: "" };
    case "update_errors":
      return { ...state, errorMessage: action.payload, alertMessage: "" };
    case "update_alert":
      return { ...state, errorMessage: "", alertMessage: action.payload };
    default:
      return state;
  }
};

const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const login = (dispatch) => async ({ email, password }) => {
  const loginDetails = { email, password };

  if (
    loginDetails.email !== "" &&
    emailCheck.test(String(loginDetails.email).toLowerCase()) &&
    loginDetails.password !== ""
  ) {
    try {
      const response = await leanLoggerApi.post("/login", loginDetails);
      await AsyncStorage.setItem("token", response.data.login_token);
      dispatch({
        type: "clear_errors",
        payload: "",
      });
      navigate("Home");
    } catch (err) {
      switch (err.response.status) {
        case 404:
          dispatch({
            type: "update_errors",
            payload: "Cannot find a user with those details, please try again.",
          });
          break;
        case 422:
          dispatch({
            type: "update_errors",
            payload: "Please enter a valid email address.",
          });
          break;
        case 500:
          dispatch({
            type: "update_errors",
            payload: "Server error, please try again.",
          });
          break;
        default:
          dispatch({
            type: "update_errors",
            payload: "Something went wrong with log in.",
          });
      }
    }
  } else {
    if (loginDetails.email === "" || loginDetails.password === "") {
      dispatch({
        type: "update_errors",
        payload: "Please enter an email address and password.",
      });
    } else {
      dispatch({
        type: "update_errors",
        payload: "Please enter a valid email address.",
      });
    }
  }
};

const register = (dispatch) => async ({ email, password, opt_in }) => {
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
      await AsyncStorage.setItem("token", loginResponse.data.login_token);
      dispatch({
        type: "clear_errors",
        payload: "",
      });
      navigate("Home");
    } catch (err) {
      switch (err.response.status) {
        case 404:
          dispatch({
            type: "update_errors",
            payload: "Cannot find a user with those details, please try again.",
          });
          break;
        case 422:
          if (
            err.response.data.errors.email[0] ===
            "The email has already been taken."
          ) {
            dispatch({
              type: "update_errors",
              payload: "The email address is already in use, please try again.",
            });
          } else {
            dispatch({
              type: "update_errors",
              payload: "Please enter a valid email address.",
            });
          }
          break;
        case 500:
          dispatch({
            type: "update_errors",
            payload: "Server error, please try again.",
          });
          break;
        default:
          dispatch({
            type: "update_errors",
            payload: "Something went wrong with register.",
          });
      }
    }
  } else {
    if (registerDetails.email === "" || registerDetails.password === "") {
      dispatch({
        type: "update_errors",
        payload: "Please enter an email address and a password.",
      });
    } else if (!emailCheck.test(String(registerDetails.email).toLowerCase())) {
      dispatch({
        type: "update_errors",
        payload: "Please enter a valid email address.",
      });
    } else if (registerDetails.opt_in !== 1) {
      dispatch({
        type: "update_errors",
        payload: "Please agree to the Terms and Conditions.",
      });
    }
  }
};

const logout = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await leanLoggerApi.post(
      "/logout",
      {},
      {
        headers: {
          "X-Login-Token": token,
        },
      }
    );
    await AsyncStorage.removeItem("token");
    navigate("Login");
  } catch (err) {
    dispatch({
      type: "update_errors",
      payload: "Something went wrong with log out",
    });
  }
};

const requestpasswordreset = (dispatch) => async (email) => {
  if (email !== "" && emailCheck.test(String(email).toLowerCase())) {
    try {
      const response = await leanLoggerApi.post("request-password-reset", {
        email,
      });
      dispatch({
        type: "update_alert",
        payload:
          "Please check your inbox for an email containing instructions on how to reset your password.",
      });
    } catch (err) {
      dispatch({
        type: "update_errors",
        payload: "Something went wrong with reset password.",
      });
    }
  } else if (email === "") {
    dispatch({
      type: "update_errors",
      payload: "Please ensure you have filled out your email address.",
    });
  } else {
    dispatch({
      type: "update_errors",
      payload: "Please provide a valid email address.",
    });
  }
};

const passwordreset = (dispatch) => async (email) => {
  if (email !== "" && emailCheck.test(String(email).toLowerCase())) {
    try {
      const response = await leanLoggerApi.post("request-password-reset", {
        email,
      });
      dispatch({
        type: "update_alert",
        payload:
          "Please check your inbox for an email containing instructions on how to reset your password.",
      });
    } catch (err) {
      dispatch({
        type: "update_errors",
        payload: "Something went wrong with reset password.",
      });
    }
  } else if (email === "") {
    dispatch({
      type: "update_errors",
      payload: "Please ensure you have filled out your email address.",
    });
  } else {
    dispatch({
      type: "update_errors",
      payload: "Please provide a valid email address.",
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, register, logout, requestpasswordreset, requestpasswordreset },
  { errorMessage: "", alertMessage: "" }
);
