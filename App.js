import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import Chat from "./components/Chat";
import Start from "./components/Start";

const firebaseConfig = {
  apiKey: "AIzaSyD992NjMKb7KpBrjK4O_Eeh6-ctukaxI20",
  authDomain: "chatapp-7d6d0.firebaseapp.com",
  projectId: "chatapp-7d6d0",
  storageBucket: "chatapp-7d6d0.firebasestorage.app",
  messagingSenderId: "357421378099",
  appId: "1:357421378099:web:de4cba363cc9ae280cd146",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("Platform:", Platform.OS);
    console.log("Auth object:", auth);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {(props) => <Start {...props} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { auth, db };
