import { signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../assets/images/Background_Image.png";

const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
const { width, height } = Dimensions.get("window");

const Start = ({ navigation, auth }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const startChatting = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }

    if (!auth) {
      console.log("Auth not initialized yet!");
      return;
    }

    signInAnonymously(auth)
      .then((res) => {
        navigation.navigate("Chat", {
          uid: res.user.uid,
          name,
          color: "#FFF",
        });
      })
      .catch((err) => {
        console.log("Firebase auth error:", err);
        alert("Unable to sign in.");
      });
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>ChatApp</Text>
          <View style={styles.box}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="rgba(117,112,131,0.5)"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={startChatting}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: { fontSize: 45, fontWeight: "600", color: "#fff", marginBottom: 40 },
  box: {
    width: width * 0.88,
    height: height * 0.44,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-around",
  },
  label: { fontSize: 16, fontWeight: "300", color: "#333", marginBottom: 5 },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#757083",
    marginBottom: 15,
    color: "#000",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  colorCircle: { width: 50, height: 50, borderRadius: 25 },
  selectedColor: { borderWidth: 3, borderColor: "#000" },
  button: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default Start;
