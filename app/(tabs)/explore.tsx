import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSelector } from "react-redux";
import authService from "@/services/auth-service";
import chatService from "@/services/chat-service";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Dialog from "@/models/dialogs";
import Chat from "@/components/Chat";

export default function TabTwoScreen() {
  const currentUser = useSelector((state: any) => state.currentUser);
  const appIsLoading = useSelector((state: any) => state.appIsLoading);
  const dialogs = useSelector((state: any) => state.dialogs);

  console.log("currentUser", currentUser);

  const [dialog, setDialog] = useState<Dialog | null>(null); // Dialog type or null initially

  useEffect(() => {
    setDialog(null);
    if (!currentUser) {
    }
  }, [currentUser]);

  const onUserLogout = () => {
    Alert.alert(
      "Are you sure you want to logout?",
      "",
      [
        {
          text: "Yes",
          onPress: () => {
            authService.logout();
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handlechatClick = async () => {
    try {
      // [12681589, 12681605]
      const user_id = 12681605;
      chatService
        .createPrivateDialog(user_id)
        .then((newDialog) => {
          console.log("newdailog", newDialog);
          if (newDialog) {
            console.log("newDialog", newDialog);
            setDialog(newDialog);
          }
        })
        .catch((error) => {
          console.log(">>>>>>>>", error);
        });
    } catch (error) {}
  };

  console.log("dialog", dialog);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      <TouchableOpacity onPress={onUserLogout}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>logout</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlechatClick}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>new chat</Text>
        </View>
      </TouchableOpacity>

      {dialog && <Chat dialog={dialog} />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonContainer: {
    marginTop: 40,
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: "#00e3cf",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
});
