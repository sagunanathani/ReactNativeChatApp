import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  const actionSheet = useActionSheet();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission denied to access gallery");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      onSend({ image: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission denied to use camera");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      onSend({ image: result.assets[0].uri });
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission denied to access location");

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } else {
      Alert.alert("Error fetching location");
    }
  };

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            takePhoto();
            break;
          case 2:
            getLocation();
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, wrapperStyle]}
      onPress={onActionPress}
    >
      <View style={styles.wrapper}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: 26, height: 26, marginLeft: 10, marginBottom: 10 },
  wrapper: {
    flex: 1,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#b2b2b2",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
