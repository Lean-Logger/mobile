import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login, state } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome to Lean Logger</Text>
        {state.errorMessage ? (
          <Text style={styles.error}>{state.errorMessage}</Text>
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
          onPress={() => {
            login({ email, password });
          }}
          style={styles.button}
        >
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RequestPasswordReset")}
          style={styles.button}
        >
          <Text style={styles.link}>Forgot password? Reset password here</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.link}>No account? Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#019ee1",
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  form: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    fontSize: 22,
    padding: 5,
    marginBottom: 20,
  },
  link: {
    color: "#fff",
    fontSize: 18,
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    marginBottom: 20,
  },
});

export default LoginScreen;
