import React from "react";
import { StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const ExerciseLibraryScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>ExerciseLibraryScreen</Text>
      <Button
        title="Go to ExerciseDetail"
        onPress={() => navigation.navigate("ExerciseDetail")}
      />
    </>
  );
};

ExerciseLibraryScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate("CreateExercise")}
      >
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ExerciseLibraryScreen;
