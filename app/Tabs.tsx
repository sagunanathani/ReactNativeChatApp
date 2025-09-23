// app/Tabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Chat from "../components/Chat";
import Start from "../components/Start";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={Start} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}
