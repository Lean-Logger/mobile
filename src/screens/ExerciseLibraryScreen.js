import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseLibraryScreen = ({ navigation }) => {
  const { deleteExercise, getExercises, state } = useContext(ExerciseContext);
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ExerciseDetail", { id: item.id })
                }
                style={styles.exercise}
              >
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
              Are you sure you would like to delete "{exerciseName}"?
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.link}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteExercise(exerciseId);
                  toggleModal();
                }}
                style={styles.button}
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
    title: "Exercise Library",
  };
};

const styles = StyleSheet.create({
  alert: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
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
  deleteIcon: {
    fontSize: 24,
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
  indicator: {
    flex: 1,
    justifyContent: "space-around",
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
  name: {
    fontSize: 24,
  },
});

export default ExerciseLibraryScreen;
