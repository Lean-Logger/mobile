import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const AuthForm = () => {
  return (
    <>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="Email Address"
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
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
