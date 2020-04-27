import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const ExerciseDetailScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>ExerciseDetailScreen</Text>
      <Button
        title="Go to EditExercise"
        onPress={() => navigation.navigate("EditExercise")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ExerciseDetailScreen;
