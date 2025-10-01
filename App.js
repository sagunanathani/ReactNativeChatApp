import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  disableNetwork,
  enableNetwork,
  getFirestore,
} from "firebase/firestore";

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
  const netInfo = useNetInfo(); // 👈 hook for network status
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (netInfo.isConnected === false) {
      disableNetwork(db);
      setIsConnected(false);
      Alert.alert("Offline", "You are offline – viewing cached messages only.");
    } else if (netInfo.isConnected === true) {
      enableNetwork(db);
      setIsConnected(true);
      Alert.alert("Online", "You are connected – live chat enabled.");
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {(props) => <Start {...props} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} isConnected={isConnected} />}
          {/* 👈 pass isConnected */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { auth, db };
