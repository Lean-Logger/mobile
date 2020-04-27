import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const CalendarScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>CalendarScreen</Text>
      <Button title="Go to Logs" onPress={() => navigation.navigate("Logs")} />
    </>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
