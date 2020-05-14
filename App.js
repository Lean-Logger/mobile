import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import ExerciseLibraryScreen from "./src/screens/ExerciseLibraryScreen";
import ExerciseDetailScreen from "./src/screens/ExerciseDetailScreen";
import EditExerciseScreen from "./src/screens/EditExerciseScreen";
import CreateExerciseScreen from "./src/screens/CreateExerciseScreen";
import SelectWorkoutScreen from "./src/screens/SelectWorkoutScreen";
import RecordWorkoutScreen from "./src/screens/RecordWorkoutScreen";
import RecordExerciseScreen from "./src/screens/RecordExerciseScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import LogsScreen from "./src/screens/LogsScreen";
import LogDetailScreen from "./src/screens/LogDetailScreen";
import EditLogScreen from "./src/screens/EditLogScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    ResetPassword: ResetPasswordScreen,
    Register: RegisterScreen,
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
      CreateExercise: CreateExerciseScreen,
      EditExercise: EditExerciseScreen,
    }),
    workoutFlow: createStackNavigator({
      SelectWorkout: SelectWorkoutScreen,
      RecordWorkout: RecordWorkoutScreen,
      RecordExercise: RecordExerciseScreen,
    }),
    calendarFlow: createStackNavigator({
      Calendar: CalendarScreen,
      Logs: LogsScreen,
      LogDetail: LogDetailScreen,
      EditLog: EditLogScreen,
    }),
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
