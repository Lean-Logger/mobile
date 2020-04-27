import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SelectWorkoutScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>SelectWorkoutScreen</Text>
      <Button
        title="Go to RecordWorkout"
        onPress={() => navigation.navigate("RecordWorkout")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SelectWorkoutScreen;
