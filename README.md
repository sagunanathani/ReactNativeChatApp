# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 🛠 Setup Instructions

1. **Node Version**  
   Ensure Node.js version is **16.19.0** or lower. Use `nvm` to manage versions:

   nvm install 16.19.0
   nvm use 16.19.0

2. npm install -g expo-cli

3. expo init ChatApp
   cd ChatApp

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
