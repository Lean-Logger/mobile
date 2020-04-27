import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const LogsScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>LogsScreen</Text>
      <Button
        title="Go to LogDetail"
        onPress={() => navigation.navigate("LogDetail")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default LogsScreen;
