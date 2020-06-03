import React, { useContext, useState } from "react";
import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const EditExerciseScreen = ({ navigation }) => {
  const { editExercise, state } = useContext(ExerciseContext);

  const exercise = state.exercises.find(
    (exercise) => exercise.id === navigation.getParam("id")
  );

  const [description, setDescription] = useState(exercise.description);
  const [name, setName] = useState(exercise.name);
  const [type, setType] = useState(exercise.type);

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        {state.errorMessage ? (
          <Text style={styles.error}>{state.errorMessage}</Text>
        ) : null}
        <Text style={styles.label}>Name:*</Text>
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
        <Text style={styles.label}>Type:*</Text>
        <View style={styles.pickerInput}>
          <Picker
            itemStyle={styles.pickerItem}
            onValueChange={(type) => setType(type)}
            selectedValue={type}
            style={styles.picker}
          >
            <Picker.Item label="Please select a type..." value="" />
            <Picker.Item label="Duration" value="duration" />
            <Picker.Item label="Non-weighted reps" value="non_weighted_reps" />
            <Picker.Item label="Weighted reps" value="weighted_reps" />
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => {
            editExercise(exercise.id, { description, name, type });
          }}
          style={styles.button}
        >
          <Text style={styles.link}>Save Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

EditExerciseScreen.navigationOptions = () => {
  return {
    title: "Edit Exercise",
  };
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  form: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    fontSize: 22,
    padding: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    color: "#fff",
    fontSize: 18,
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  picker: {
    height: 52,
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  pickerItem: {
    height: 50,
    borderWidth: 4,
    borderColor: "white",
  },
});

export default EditExerciseScreen;
