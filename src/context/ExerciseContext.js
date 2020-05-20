import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";
import { navigate } from "../navigationRef";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case "update_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const createExercise = (dispatch) => async ({ name, description, type }) => {
  const token = await AsyncStorage.getItem("token");
  const exerciseDetails = { name, description, type };

  if (exerciseDetails.name !== "" && exerciseDetails.type !== "") {
    try {
      const response = await leanLoggerApi.post("/exercises", exerciseDetails, {
        headers: {
          "X-Login-Token": token,
        },
      });
      dispatch({
        type: "update_error",
        payload: "",
      });
      navigate("ExerciseLibrary");
    } catch (err) {
      const response = err.response;

      switch (response.status) {
        case 401:
          dispatch({
            type: "update_error",
            payload: "Unauthorized user, please log in to create an exercise.",
          });
          break;
        case 422:
          if (
            response.data.errors.name[0] === "The name field is required." &&
            response.data.errors.type[0] === "The type field is required."
          ) {
            dispatch({
              type: "update_error",
              payload: "Please enter an exercise name and type.",
            });
          } else {
            if (
              response.data.errors.name[0] === "The name field is required."
            ) {
              dispatch({
                type: "update_error",
                payload: "Please enter an exercise name.",
              });
            }
            if (
              response.data.errors.type[0] === "The type field is required."
            ) {
              dispatch({
                type: "update_error",
                payload: "Please select an exercise type.",
              });
            }
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
            payload: "Something went wrong with creating an exercise.",
          });
      }
    }
  } else {
    if (exerciseDetails.name === "" && exerciseDetails.type === "") {
      dispatch({
        type: "update_error",
        payload: "Please enter an exercise name and type.",
      });
    } else {
      if (exerciseDetails.name === "") {
        dispatch({
          type: "update_error",
          payload: "Please enter an exercise name.",
        });
      }
      if (exerciseDetails.type === "") {
        dispatch({
          type: "update_error",
          payload: "Please enter an exercise type.",
        });
      }
    }
  }
};

export const { Provider, Context } = createDataContext(
  exerciseReducer,
  { createExercise },
  { errorMessage: "" }
);
