import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SigninScreen from "./src/screens/SigninScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import ExerciseLibraryScreen from "./src/screens/ExerciseLibraryScreen";
import ExerciseDetailScreen from "./src/screens/ExerciseDetailScreen";
import EditExerciseScreen from "./src/screens/EditExerciseScreen";
import RecordWorkoutScreen from "./src/screens/RecordWorkoutScreen";
import CalendarScreen from "./src/screens/CalendarScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    ForgotPassword: ForgotPasswordScreen,
    Signup: SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow: createStackNavigator({
      Home: HomeScreen,
      Settings: SettingsScreen,
      EditProfile: EditProfileScreen,
    }),
    exerciseFlow: createStackNavigator({
      ExerciseLibrary: ExerciseLibraryScreen,
      ExerciseDetail: ExerciseDetailScreen,
      EditExercise: EditExerciseScreen,
    }),
    RecordWorkout: RecordWorkoutScreen,
    Calendar: CalendarScreen,
  }),
});

export default createAppContainer(switchNavigator);
