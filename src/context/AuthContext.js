import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // Make API request
    // Modify state is we sign in
    // Display error message is sign in fails
  };
};

const signup = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      // const response = await leanLoggerApi.post("/signup", { email, password });
      // console.log(response.data);
      // callback();
    } catch (err) {
      // dispatch({ type: "add_error", payload: "Something went wrong with sign up."});
    }
  };
};

const signout = (dispatch) => {
  return () => {
    // Make API request
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout },
  { isSignedIn: false, errorMessage: "" }
);
