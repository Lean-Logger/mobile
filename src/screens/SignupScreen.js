import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";

const SignupScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      navigation.navigate("Signin");
    }
  };

  return (
    <>
      <Text style={{ fontSize: 48 }}>SignupScreen</Text>
      <Button title="Finish sign up" onPress={toggleModal} />
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

export default SignupScreen;
