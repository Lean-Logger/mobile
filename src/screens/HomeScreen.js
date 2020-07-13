import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>HomeScreen</Text>
    </>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={styles.headerButton}
      >
        <FontAwesome5 name="user-cog" size={24} color="black" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerButton: {
    padding: 5,
  },
});

export default HomeScreen;
