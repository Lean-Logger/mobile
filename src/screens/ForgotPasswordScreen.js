import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      navigation.navigate("Signin");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email Address"
          style={styles.input}
          value={email}
        />
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.link}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.link}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>
            Please check your inbox for an email containing instructions to
            reset your password.
          </Text>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.link}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

ForgotPasswordScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  form: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginBottom: 20,
    fontSize: 22,
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

export default ForgotPasswordScreen;
