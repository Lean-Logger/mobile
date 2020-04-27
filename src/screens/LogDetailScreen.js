import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const LogDetailScreen = ({ navigation }) => {
  return <Text style={{ fontSize: 48 }}>LogDetailScreen</Text>;
};

LogDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate("EditLog")}
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default LogDetailScreen;
