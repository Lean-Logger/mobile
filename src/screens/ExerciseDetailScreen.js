import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const ExerciseDetailScreen = ({ navigation }) => {
  return <Text style={{ fontSize: 48 }}>ExerciseDetailScreen</Text>;
};

ExerciseDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate("EditExercise")}
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ExerciseDetailScreen;
