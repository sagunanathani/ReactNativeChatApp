import { Ionicons } from "@expo/vector-icons"; // Icon library
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // State to hold chat messages
  const [messages, setMessages] = useState([]);

  // Get user info (name + background color) from Start screen
  const { name, color } = route.params || {};

  // Set the navigation bar title to the user's name
  useEffect(() => {
    if (name) navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Initialize with static messages (system + user)
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "You’ve entered the chat.", // system message
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: "Hello developer!", // user message
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any", // default avatar
        },
      },
    ]);
  }, []);

  // Handle sending new messages
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Customize the appearance of chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // bubble color for the current user
          },
          left: {
            backgroundColor: "#FFF", // bubble color for other users
          },
        }}
        textStyle={{
          right: {
            color: "#FFF", // white text on black bubble
          },
          left: {
            color: "#000", // black text on white bubble
          },
        }}
      />
    );
  };

  // Custom action button (for future features like sending images/location)
  const ActionButton = ({ onPress }) => {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Lets you choose to send an image or your location."
        accessibilityRole="button"
        onPress={onPress}
        style={styles.button}
      >
        <Ionicons name="add-circle-outline" size={28} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color || "#fff" }]}>
      {/* KeyboardAvoidingView makes sure input is not hidden by keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1, name: name || "You" }} // current user info
          //alwaysShowSend={true} // always show send button
          showUserAvatar={true} // show avatars
          renderUsernameOnMessage={true} // display usernames
          renderBubble={renderBubble} // custom bubble styling
          renderActions={(props) => (
            <ActionButton onPress={() => alert("More options pressed")} />
          )}
          alwaysShowSend={true}
          textInputProps={{
            editable: true,
            autoFocus: true,
            placeholder: "Type a message...",
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    marginHorizontal: 8,
  },
});

export default Chat;
