import createDataContext from "./createDataContext";

const userReducer = (state, action) => {
  switch (action.type) {
    case "edit_email":
      return { ...state, email: action.payload };
    case "edit_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const editEmail = (dispatch) => {
  console.log(email);
  return (email) => {
    dispatch({ type: "edit_email", payload: email });
  };
};

const editPassword = (dispatch) => {
  console.log(password);
  return (password) => {
    dispatch({ type: "edit_email", payload: password });
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { editEmail, editPassword },
  { email: "", password: "" }
);
