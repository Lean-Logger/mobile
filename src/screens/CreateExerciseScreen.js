import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const CreateExerciseScreen = () => {
  const { state, createExercise } = useContext(ExerciseContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        {state.errorMessage ? (
          <Text style={styles.error}>{state.errorMessage}</Text>
        ) : null}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          onChangeText={setName}
          placeholder="E.g: Bicep Curl Machine"
          style={styles.input}
          value={name}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          onChangeText={setDescription}
          placeholder="E.g: Machine near the AC unit"
          style={styles.input}
          value={description}
        />
        <Text style={styles.label}>Type:</Text>
        <View style={styles.input}>
          <Picker
            itemStyle={{ fontSize: 32, color: "red" }}
            selectedValue={type}
            style={{ color: "black", height: 35 }}
            onValueChange={setType}
          >
            <Picker.Item label="Select type..." value="" />
            <Picker.Item label="Weighted reps" value="weighted_reps" />
            <Picker.Item label="Non-weighted reps" value="non_weighted_reps" />
            <Picker.Item label="Duration" value="duration" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createExercise({ name, description, type });
          }}
        >
          <Text style={styles.link}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CreateExerciseScreen.navigationOptions = () => {
  return {
    title: "Add Exercise",
  };
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  form: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    fontSize: 22,
    padding: 5,
    marginBottom: 20,
  },
  picker: {},
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  link: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CreateExerciseScreen;
