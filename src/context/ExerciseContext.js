import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import leanLoggerApi from "../api/leanLogger";
import { navigate } from "../navigationRef";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "delete_exercise":
      return {
        ...state,
        exercises: [
          ...state.exercises.filter(
            (exercise) => exercise.id !== action.payload
          ),
        ],
      };
    case "edit_exercise":
      return {
        ...state,
        exercises: [
          ...state.exercises.map((exercise) => {
            return exercise.id === action.payload.id
              ? action.payload
              : exercise;
          }),
        ],
      };
    case "get_exercises":
      return { ...state, exercises: action.payload };
    case "set_loading":
      return { ...state, loading: action.payload };
    case "update_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const createExercise = (dispatch) => async ({ description, name, type }) => {
  const token = await AsyncStorage.getItem("token");
  const exerciseDetails = { description, name, type };

  if (exerciseDetails.name.trim() !== "" && exerciseDetails.type !== "") {
    try {
      const response = await leanLoggerApi.post("/exercises", exerciseDetails, {
        headers: {
          "X-Login-Token": token,
        },
      });
      dispatch({
        type: "clear_error",
      });
      dispatch({
        type: "set_loading",
        payload: true,
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
    if (exerciseDetails.name.trim() === "" && exerciseDetails.type === "") {
      dispatch({
        type: "update_error",
        payload: "Please enter an exercise name and type.",
      });
    } else {
      if (exerciseDetails.name.trim() === "") {
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

const deleteExercise = (dispatch) => async (id) => {
  dispatch({
    type: "set_loading",
    payload: true,
  });
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await leanLoggerApi.delete("/exercises/" + id, {
      headers: {
        "X-Login-Token": token,
      },
    });
    dispatch({
      type: "delete_exercise",
      payload: id,
    });
    dispatch({
      type: "clear_error",
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
          payload: "Something went wrong with deleting the exercise.",
        });
    }
  }
  dispatch({
    type: "set_loading",
    payload: false,
  });
};

const editExercise = (dispatch) => async (id, { description, name, type }) => {
  const exerciseDetails = { name, description, type };
  const token = await AsyncStorage.getItem("token");

  if (exerciseDetails.name !== "" && exerciseDetails.type !== "") {
    try {
      const response = await leanLoggerApi.put(
        "/exercises/" + id,
        exerciseDetails,
        {
          headers: {
            "X-Login-Token": token,
          },
        }
      );
      dispatch({
        type: "edit_exercise",
        payload: { id, name, description, type },
      });
      dispatch({
        type: "clear_error",
      });
      navigate("ExerciseDetail", { id });
    } catch (err) {
      const response = err.response;

      switch (response.status) {
        case 401:
          dispatch({
            type: "update_error",
            payload: "Unauthorized user, please log in to edit an exercise.",
          });
          break;
        case 404:
          dispatch({
            type: "update_error",
            payload: "Exercise not found, please try again.",
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
            payload: "Something went wrong with editing an exercise.",
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
    dispatch({
      type: "clear_error",
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
  { createExercise, deleteExercise, editExercise, getExercises },
  { errorMessage: "", exercises: [], loading: false }
);
