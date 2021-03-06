import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const PasswordResetScreen = ({ navigation }) => {
  const { state, passwordreset } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        {state.alertMessage ? (
          <Text style={styles.alert}>{state.alertMessage}</Text>
        ) : null}
        {state.errorMessage ? (
          <Text style={styles.error}>{state.errorMessage}</Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPasswordConfirmation}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={passwordConfirmation}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={console.log("Password reset")}
        >
          <Text style={styles.link}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

PasswordResetScreen.navigationOptions = () => {
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
  alert: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
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

export default PasswordResetScreen;
