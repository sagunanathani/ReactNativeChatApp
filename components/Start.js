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

// Background image
import BackgroundImage from "../assets/images/Background_Image.png";

const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
const { width, height } = Dimensions.get("window");

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

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
          <Text style={styles.title} accessibilityRole="header">
            ChatApp
          </Text>

          <View style={styles.box}>
            {/* Name Input */}
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="rgba(117,112,131,0.5)"
              value={name}
              onChangeText={setName}
              accessible={true}
              accessibilityLabel="Name input field"
              accessibilityHint="Enter your name to display in the chat"
            />

            {/* Background Color Options */}
            <Text style={styles.label}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                  accessible={true}
                  accessibilityLabel={`Color option ${index + 1}`}
                  accessibilityHint="Double tap to select this as your chat background"
                  accessibilityRole="button"
                />
              ))}
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!name.trim()) {
                  alert("Please enter your name!");
                } else {
                  navigation.navigate("Chat", { name, color: selectedColor });
                }
              }}
              accessible={true}
              accessibilityLabel="Start chatting button"
              accessibilityHint="Double tap to enter the chat screen"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  box: {
    width: width * 0.88,
    height: height * 0.44,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-around",
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "#333333", // darkened for better contrast
    marginBottom: 5,
  },
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
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#000",
  },
  button: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Start;
