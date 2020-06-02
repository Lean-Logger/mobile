import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseDetailScreen = ({ navigation }) => {
  const { state } = useContext(ExerciseContext);

  const exercise = state.exercises.find(
    (exercise) => exercise.id === navigation.getParam("id")
  );

  const ExerciseType = ({ type }) => {
    switch (type) {
      case "weighted_reps":
        return <Text style={styles.data}>Weighted reps</Text>;
      case "non_weighted_reps":
        return <Text style={styles.data}>Non-weighted reps</Text>;
      case "duration":
        return <Text style={styles.data}>Duration</Text>;
      default:
        return <Text style={styles.data}>N/A</Text>;
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.area}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.data}>{exercise.name}</Text>
        <Text style={styles.label}>Description</Text>
        {exercise.description !== "" ? (
          <Text style={styles.data}>{exercise.description}</Text>
        ) : (
          <Text style={styles.data}>N/A</Text>
        )}
        <Text style={styles.label}>Type</Text>
        <ExerciseType type={exercise.type} />
      </View>
    </View>
  );
};

ExerciseDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() =>
          navigation.navigate("EditExercise", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  area: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
  },
  data: {
    fontSize: 22,
    paddingVertical: 5,
    marginBottom: 20,
  },
});

export default ExerciseDetailScreen;
