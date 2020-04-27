import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>HomeScreen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
