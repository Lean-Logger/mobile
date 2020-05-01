import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const SettingsScreen = ({ navigation }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);

  const toggleModal = () => {
    setSignOutModal(!signOutModal);
  };

  const signOut = () => {
    setSignOutModal(!signOutModal);
    if (signOutModal) {
      navigation.navigate("loginFlow");
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.link}>Edit account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.link}>Delete account</Text>
      </TouchableOpacity>
      <Modal isVisible={deleteModal}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Hello!</Text>
          <TouchableOpacity
            style={styles.button}
            title="Hide modal"
            onPress={toggleModal}
          >
            <Text style={styles.link}></Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.link}>Sign out</Text>
      </TouchableOpacity>
      <Modal isVisible={signOutModal}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>
            Are you sure you would like to sign out of your account?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.link}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signOut}>
              <Text style={styles.link}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  link: {
    fontSize: 18,
    color: "#fff",
  },
});

export default SettingsScreen;
