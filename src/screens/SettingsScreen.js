import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";

const SettingsScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      navigation.navigate("loginFlow");
    }
  };

  return (
    <>
      <Text style={{ fontSize: 48 }}>SettingsScreen</Text>
      <Button
        title="Go to EditProfile"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <Button title="Delete account" onPress={toggleModal} />
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      <Button title="Logout!" onPress={toggleModal} />
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

export default SettingsScreen;
