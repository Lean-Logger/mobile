import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const EditExerciseScreen = ({ navigation }) => {
  const { state } = useContext(ExerciseContext);

  const exercise = state.exercises.find(
    (exercise) => exercise.id === navigation.getParam("id")
  );

  return <Text style={{ fontSize: 48 }}>Exercise Name: {exercise.name}</Text>;
};

const styles = StyleSheet.create({});

export default EditExerciseScreen;
