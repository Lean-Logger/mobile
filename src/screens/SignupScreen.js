import React from "react";
import {
  StyleSheet,
  View,
  Text,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import AuthForm from "../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <AuthForm />
        <View style={styles.checkboxContainer}>
          <CheckBox style={styles.checkbox} />
          <Text>I read and agree to the Terms and Conditions.</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.link}>Sign up</Text>
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
  checkboxContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "black",
    height: 20,
    width: 20,
    marginRight: 10,
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

export default SignupScreen;
