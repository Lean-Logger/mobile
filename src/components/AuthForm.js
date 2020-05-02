import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Context as UserContext } from "../context/UserContext";

const AuthForm = () => {
  const { state, editEmail, editPassword } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(email) => editEmail(email)}
        placeholder="Email Address"
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(password) => editPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginBottom: 20,
    fontSize: 22,
  },
});

export default AuthForm;
