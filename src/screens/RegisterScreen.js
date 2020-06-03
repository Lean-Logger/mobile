import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register, state } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [opt_in, setOpt_in] = useState(false);
  const [password, setPassword] = useState("");

  const toggleOptIn = () => {
    setOpt_in(!opt_in);
  };

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Register for Lean Logger</Text>
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
        <View style={styles.terms}>
          <Text>I agree to the Terms and Conditions</Text>
          <Switch
            onValueChange={setOpt_in}
            style={styles.switch}
            value={opt_in}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            register({ email, opt_in, password });
          }}
          style={styles.button}
        >
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.link}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

RegisterScreen.navigationOptions = () => {
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
  switch: {
    marginLeft: 5,
  },
  terms: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    marginBottom: 20,
  },
});

export default RegisterScreen;
