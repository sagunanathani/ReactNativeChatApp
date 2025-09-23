import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params || {};

  useEffect(() => {
    if (name) navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: color || "#fff" }]}>
      <Text style={styles.text}>Welcome to the chat, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, color: "#fff" },
});

export default Chat;
