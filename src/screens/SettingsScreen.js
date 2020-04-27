import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SettingsScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>SettingsScreen</Text>
      <Button
        title="Go to EditProfile"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <Button
        title="Go to Login flow"
        onPress={() => navigation.navigate("loginFlow")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
