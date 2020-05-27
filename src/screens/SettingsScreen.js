import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Context as AuthContext } from "../context/AuthContext";

const SettingsScreen = ({ navigation }) => {
  const { state, logout } = useContext(AuthContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleModal = () => {
    setDeleteModal(!deleteModal);
  };

  const deleteAccount = () => {
    setDeleteModal(!deleteModal);
    if (deleteModal) {
      navigation.navigate("Login");
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
          <Text style={styles.modalText}>
            Are you sure you would like to delete your account?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.link}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={deleteAccount}>
              <Text style={styles.link}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.link}>Log out</Text>
      </TouchableOpacity>
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
});

export default SettingsScreen;
