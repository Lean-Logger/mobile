import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AuthForm from "../components/AuthForm";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
        <AuthForm />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.link}>Forgot password? Tap here to reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.link}>No account? Tap here to sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});

export default SigninScreen;
