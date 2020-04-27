import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const RecordWorkoutScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>RecordWorkoutScreen</Text>
      <Button
        title="Go to RecordExercise"
        onPress={() => navigation.navigate("RecordExercise")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default RecordWorkoutScreen;
