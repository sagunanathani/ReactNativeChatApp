# Welcome to my Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# 💬 React Native Chat App

This is a simple chat app built using **React Native** and **Expo**. It allows users to enter their name, choose a background color, and navigate to a chat screen where their name is displayed in the header and the background reflects their chosen color.

## 🚀 Features

- Start screen with:
  - Text input for username
  - TouchableOpacity button to enter chat
  - Background image using `ImageBackground`
  - Color selection using circular buttons
- Chat screen with:
  - User’s name displayed in the navigation bar
  - Background color set based on user’s selection
- Navigation handled via **React Navigation**
- Layout styled using **Flexbox**
- Android Emulator tested (iOS optional)

# 📱 React Native Chat App

A modern, cross-platform chat application built with **React Native (Expo)** and **Firebase**.  
ChatApp allows users to join anonymously, send and receive real-time messages, share photos (from library or camera), and share their live location.  
The app is designed with **offline support, accessibility, and a clean UI**.

---

## ✨ Features

- **Anonymous Authentication** – No signup needed, powered by Firebase Auth.
- **Customizable Experience** – Users enter their name and select a background color.
- **Real-Time Messaging** – Messages are synced instantly using Firebase Firestore.
- **Media Sharing** – Send images from your camera roll or take new photos, stored in Firebase Storage.
- **Location Sharing** – Share your current location with an in-chat map view.
- **Offline Support** – Cached messages available offline with AsyncStorage.
- **Network Awareness** – Detects connection status with `@react-native-community/netinfo`.
- **Accessibility First** – Accessible labels, keyboard avoidance, color contrast, and screen reader support.
- **Cross-Platform** – Works on **Android & iOS** (tested on emulator and physical device).

---

## 🛠️ Tech Stack

- **React Native (Expo)** – cross-platform development
- **Firebase** – Auth, Firestore, Storage
- **React Navigation** – screen navigation
- **AsyncStorage** – offline caching
- **react-native-gifted-chat** – modern chat UI
- **expo-image-picker** – select/take photos
- **expo-location** – geolocation services
- **react-native-maps** – map rendering
- **@expo/react-native-action-sheet** – custom actions UI

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project (with **Auth, Firestore, Storage** enabled)

---

### ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/sagunanathani/ReactNativeChatApp
cd ReactNativeChatApp

# Install dependencies
npm install
# or
yarn install
```

▶️ Running the App
npx expo start -c

# Start the development server

npm start

# or

yarn start

# Run on iOS simulator

npm run ios

# Run on Android emulator

npm run android

# Run in web browser

npm run web

🌍 Accessibility
Accessible labels for all buttons and input fields
Screen reader support with descriptive instructions
Color contrast adjustments for selected background colors
Keyboard avoiding views prevent input from being hidden
