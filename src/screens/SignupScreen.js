import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const opt_in = 1;

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        {state.errorMessage ? (
          <Text style={styles.error}>
            Can't find a user with those details.
          </Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email Address"
          style={styles.input}
          value={email}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signup({ email, password, opt_in }, () => {
              signin({ email, password }, () =>
                navigation.navigate("mainFlow")
              );
            });
          }}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.link}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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
    textAlign: "center",
    fontSize: 34,
    marginBottom: 20,
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
    fontSize: 22,
    padding: 5,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  link: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SignupScreen;
