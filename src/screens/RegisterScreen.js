import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { state, register, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opt_in, setOpt_in] = useState(false);

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
          style={styles.button}
          onPress={() => {
            register({ email, password, opt_in });
          }}
        >
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
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
  terms: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  switch: {
    marginLeft: 5,
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

export default RegisterScreen;
