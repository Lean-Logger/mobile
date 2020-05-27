import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseLibraryScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const { state, getExercises, deleteExercise } = useContext(ExerciseContext);

  useEffect(() => {
    getExercises();

    const listener = navigation.addListener("didFocus", () => {
      getExercises();
    });

    return () => {
      listener.remove();
    };
  }, []);

  const setModalInfo = (id, name) => {
    setExerciseId(id);
    setExerciseName(name);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const DataDisplay = ({ exercises }) =>
    exercises.length > 0 ? (
      <>
        <FlatList
          data={state.exercises}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.exercise}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => setModalInfo(item.id, item.name)}
                >
                  <Feather style={styles.deleteIcon} name="trash-2" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
        <Modal isVisible={modalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              Are you sure you would like to delete {exerciseName}?
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.link}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  deleteExercise(exerciseId);
                  toggleModal();
                }}
              >
                <Text style={styles.link}>Delete Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    ) : (
      <Text style={styles.alert}>
        You don't have any exercises, why not add one?
      </Text>
    );

  return (
    <>
      {state.errorMessage ? (
        <Text style={styles.error}>{state.errorMessage}</Text>
      ) : null}
      {state.loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <DataDisplay exercises={state.exercises} />
      )}
    </>
  );
};

ExerciseLibraryScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate("CreateExercise")}
      >
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "space-around",
  },
  alert: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  exercise: {
    borderColor: "#000",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  name: {
    fontSize: 24,
  },
  deleteIcon: {
    fontSize: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  link: {
    fontSize: 18,
    color: "#fff",
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
});

export default ExerciseLibraryScreen;
