import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import ChatService from "@/services/chat-service";

export default function Chat({ dialog }) {
  const history = useSelector((state) => state.messages[dialog.id]);
  const [messageText, setMessageText] = useState("");

  console.warn("history", history);

  useEffect(() => {
    // Fetch initial chat messages
    ChatService.getMessagesAndStore(dialog).catch((e) =>
      alert(`Error.\n\n${JSON.stringify(e)}`)
    );
  }, []);

  const sendMessage = async () => {
    if (messageText.length > 0) {
      await ChatService.sendMessage(dialog, messageText);
      setMessageText("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Message history */}
      <FlatList
        inverted
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.error(item);

          return (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "blue" }}>{item.body}</Text>
            </View>
          );
        }}
      />

      {/* Input and send button */}
      <View style={{ flexDirection: "row", padding: 10 }}>
        <TextInput
          style={{ flex: 1, borderColor: "gray", borderWidth: 1, padding: 10 }}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{ justifyContent: "center", padding: 10 }}
        >
          <Text style={{ color: "blue" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
