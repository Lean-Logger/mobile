import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

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

const styles = StyleSheet.create({});

export default ExerciseLibraryScreen;
