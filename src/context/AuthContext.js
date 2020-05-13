import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "update_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const response = await leanLoggerApi.post("/login", { email, password });
      console.log(response.data);
      dispatch({
        type: "update_token",
        payload: response.data.login_token,
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password, opt_in }, callback) => {
    try {
      const response = await leanLoggerApi.post("/register", {
        email,
        password,
        opt_in,
      });
      console.log(response.data);
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
    if (callback) {
      callback();
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
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, requestpasswordreset },
  { token: "", errorMessage: "" }
);
