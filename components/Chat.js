import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import {
  addDoc,
  collection,
  disableNetwork,
  enableNetwork,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

const Chat = ({ db, route }) => {
  const { uid, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  // Listen to network changes
  useEffect(() => {
    const unsubscribeNet = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });
    return () => unsubscribeNet();
  }, []);

  // Load messages from Firestore or AsyncStorage
  useEffect(() => {
    let unsubscribe;

    const loadMessages = async () => {
      if (isConnected) {
        enableNetwork(db); // ensure Firestore is online

        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );

        unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
          const loadedMessages = snapshot.docs.map((doc) => ({
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          }));

          setMessages(loadedMessages);

          try {
            await AsyncStorage.setItem(
              "chat_messages",
              JSON.stringify(loadedMessages)
            );
          } catch (err) {
            console.log("Error caching messages:", err);
          }
        });
      } else {
        disableNetwork(db); // prevent Firestore errors
        try {
          const cached = await AsyncStorage.getItem("chat_messages");
          if (cached) setMessages(JSON.parse(cached));
        } catch (err) {
          console.log("Error loading cached messages:", err);
        }
      }
    };

    loadMessages();

    return () => unsubscribe && unsubscribe();
  }, [db, isConnected]);

  // Send message to Firestore
  const onSend = (newMessages = []) => {
    if (!newMessages.length || !isConnected) return;

    const message = {
      ...newMessages[0],
      createdAt: serverTimestamp(),
      user: { _id: uid, name },
    };

    addDoc(collection(db, "messages"), message).catch(console.log);
  };

  // Customize message bubble
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

  // Render InputToolbar only if online
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color || "#fff" }]}>
      {!isConnected && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You are offline</Text>
        </View>
      )}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: uid, name }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        showUserAvatar
        alwaysShowSend
        renderUsernameOnMessage
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === "ios" ? 50 : 0 },
  offlineBanner: {
    backgroundColor: "red",
    padding: 5,
    alignItems: "center",
  },
  offlineText: { color: "white", fontWeight: "bold" },
});

export default Chat;
