
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { geminiModel } from "../config/firebase";

function ChatBot({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {

        if (!inputText.trim()) return; //exits function early if no user message

        setMessages((prev) => [...prev, { text: inputText, sender: "user" }]); //adds previous user message to messages array
        const userQuestion = inputText; //saves user input to a variable
        setInputText(""); //cleares inputText
        setIsLoading(true); //sets loading boolean to true

        try {
            const result = await geminiModel.generateContent(userQuestion); //calls api with user text
            const aiResponse = result.response.text(); //saves the ai response to a variable

            setMessages((prev)  => [...prev, { text: aiResponse, sender: "ai" }]); //adds previous ai message to messages array
        
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages((prev)  => [...prev, { text: "Error: " + error.message, sender: "ai" }]);
            //catches and logs error to console, and saves message to array
        } finally {
            setIsLoading(false); //sets loading boolean to false (done loading)
        }
    };

    return (
        <Screen style={styles.container}>
            <AppText style={styles.title}>AI Chat Test</AppText>
            <ScrollView style={styles.messages}>
                {messages.map((msg, index) => (
                    <View key={index} style={[
                        styles.message,
                        msg.sender === "user" ? styles.userMessage : styles.aiMessage,
                    ]}
                    >
                        <AppText style={styles.messageText}>
                            {msg.sender === "user" ? "You: " : "AI: "}
                            {msg.text}
                        </AppText>
                    </View>
                ))}
                {isLoading && <AppText>AI is thinking...</AppText>}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type something!"
                    multiline
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                    disabled={isLoading}
                >
                    <AppText style={styles.sendButtonText}>Send</AppText>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  messages: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default ChatBot;

