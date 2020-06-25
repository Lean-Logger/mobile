import React, { useContext, useEffect, useState } from "react";
import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const CreateExerciseScreen = ({ navigation }) => {
  const { createExercise, state } = useContext(ExerciseContext);
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const checkForm = () => {
    if (description.trim() !== "" || name.trim() !== "" || type !== "") {
      toggleModal();
    } else {
      navigation.navigate("ExerciseLibrary");
    }
  };

  useEffect(() => {
    navigation.setParams({
      checkForm: checkForm,
    });
  }, [description, name, type]);

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
            createExercise({ description, name, type });
          }}
          style={styles.button}
        >
          <Text style={styles.link}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>
            Are you sure you would like to discard this exercise?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.link}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ExerciseLibrary");
                toggleModal();
              }}
              style={styles.button}
            >
              <Text style={styles.link}>Discard Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

CreateExerciseScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.getParam("checkForm")();
        }}
        style={styles.headerButton}
      >
        <Ionicons name="ios-arrow-back" size={28} color="black" />
        <Text style={styles.headerButtonText}>Back</Text>
      </TouchableOpacity>
    ),
    title: "Add Exercise",
  };
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 22,
    marginBottom: 20,
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    color: "#fff",
    fontSize: 18,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  picker: {
    height: 52,
  },
  pickerInput: {
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
  },
  pickerItem: {
    borderColor: "white",
    borderWidth: 4,
    height: 50,
  },
});

export default CreateExerciseScreen;
