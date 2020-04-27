import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SigninScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>SigninScreen</Text>
      <Button
        title="Go to ForgotPassword"
        onPress={() => navigation.navigate("ForgotPassword")}
      />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </>
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
