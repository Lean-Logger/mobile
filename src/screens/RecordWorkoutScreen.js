import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";

const RecordWorkoutScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      navigation.navigate("SelectWorkout");
    }
  };

  return (
    <>
      <Text style={{ fontSize: 48 }}>RecordWorkoutScreen</Text>
      <Button
        title="Go to RecordExercise"
        onPress={() => navigation.navigate("RecordExercise")}
      />
      <Button title="Discard workout" onPress={toggleModal} />
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      <Button title="Finish workout" onPress={toggleModal} />
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default RecordWorkoutScreen;
