import React, { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseDetailScreen = ({ navigation }) => {
  const { state } = useContext(ExerciseContext);
  const exercise = state.exercises.find(
    (exercise) => exercise.id === navigation.getParam("id")
  );

  const ExerciseType = ({ type }) => {
    switch (type) {
      case "duration":
        return <Text style={styles.data}>Duration</Text>;
      case "non_weighted_reps":
        return <Text style={styles.data}>Non-weighted reps</Text>;
      case "weighted_reps":
        return <Text style={styles.data}>Weighted reps</Text>;
      default:
        return <Text style={styles.data}>N/A</Text>;
    }
  };

  return (
    <>
      {state.loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
      )}
    </>
  );
};

ExerciseDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ExerciseLibrary");
        }}
        style={styles.headerButton}
      >
        <Ionicons name="ios-arrow-back" size={28} color="black" />
        <Text style={styles.headerButtonText}>Back</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
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
  area: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  data: {
    fontSize: 22,
    paddingVertical: 5,
    marginBottom: 20,
  },
  headerButton: {
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  headerButtonText: {
    fontSize: 18,
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default ExerciseDetailScreen;
