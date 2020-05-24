import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseLibraryScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const { state, getExercises } = useContext(ExerciseContext);

  useEffect(() => {
    getExercises();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      navigation.navigate("ExerciseLibrary");
    }
  };

  return (
    <>
      <Text style={{ fontSize: 48 }}>ExerciseLibraryScreen</Text>
      <Button
        title="Go to ExerciseDetail"
        onPress={() => navigation.navigate("ExerciseDetail")}
      />
      <Button title="Delete exercise" onPress={toggleModal} />
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
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
  modal: {
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default ExerciseLibraryScreen;
