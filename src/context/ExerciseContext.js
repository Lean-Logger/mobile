import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";
import { navigate } from "../navigationRef";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case "clear_error":
      return { ...state, errorMessage: action.payload };
    case "update_error":
      return { ...state, errorMessage: action.payload };
    case "get_exercises":
      return { ...state, exercises: action.payload, errorMessage: "" };
    case "set_loading":
      return { ...state, loading: action.payload };
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
        type: "clear_error",
        payload: "",
      });
      navigate("ExerciseLibrary");
      dispatch({
        type: "set_loading",
        payload: true,
      });
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

const getExercises = (dispatch) => async () => {
  dispatch({
    type: "set_loading",
    payload: true,
  });
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await leanLoggerApi.get("/exercises", {
      headers: {
        "X-Login-Token": token,
      },
    });
    dispatch({
      type: "get_exercises",
      payload: response.data.items,
    });
  } catch (err) {
    switch (err.response.status) {
      case 500:
        dispatch({
          type: "update_error",
          payload: "Server error, please try again.",
        });
        break;
      default:
        dispatch({
          type: "update_error",
          payload: "Something went wrong with getting exercises.",
        });
    }
  }
  dispatch({
    type: "set_loading",
    payload: false,
  });
};

export const { Provider, Context } = createDataContext(
  exerciseReducer,
  { createExercise, getExercises },
  { errorMessage: "", exercises: [], loading: false }
);
