import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

// Firestore imports
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const Chat = ({ db, route }) => {
  const { uid, name, color } = route.params; // values passed from Start
  const [messages, setMessages] = useState([]);

  // Listen to Firestore messages in real-time
  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(), // fallback if createdAt is missing
        };
      });

      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // cleanup listener
  }, [db]);

  // Send message to Firestore
  const onSend = (newMessages = []) => {
    if (!newMessages.length) return;

    const message = {
      ...newMessages[0],
      createdAt: serverTimestamp(), // server timestamp for consistency
      user: { _id: uid, name }, // ensure correct user info
    };

    addDoc(collection(db, "messages"), message).catch((err) => {
      console.log("Error sending message:", err);
    });
  };

  // Customize bubble colors
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" },
      }}
      textStyle={{
        right: { color: "#FFF" },
        left: { color: "#000" },
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: color || "#fff" }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: uid, name }}
          renderBubble={renderBubble}
          showUserAvatar
          alwaysShowSend
          renderUsernameOnMessage
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Chat;
