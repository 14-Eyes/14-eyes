
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { geminiModel } from "../config/firebase";
import LineDivider from "../components/Divider";

const { width, height } = Dimensions.get("window");


function ChatBot({ navigation }) {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your personal nutrition assistant! I can help with nutritional advice, budgeting help, and more! Just ask me anything :)",
            sender: "ai",
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const insets = useSafeAreaInsets();

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
        <View style={styles.container}>
            <AppText style={styles.title}>Ask about healthy budgeting choices, or nutritional advice!</AppText>
            <LineDivider/>
            <ScrollView 
                style={styles.messages}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {messages.map((msg, index) => (
                    <View key={index} style={[
                        styles.message,
                        msg.sender === "user" ? styles.userMessage : styles.aiMessage,
                    ]}
                    >
                        <AppText style={styles.messageText}>
                            {msg.sender === "user" ? "" : ""}
                            {msg.text}
                        </AppText>
                    </View>
                ))}
                {isLoading && <AppText>AI is thinking...</AppText>}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
            >
                <View style={[styles.inputContainer, { paddingBottom: insets.bottom || 10}]}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Ask Away!"
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
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.eltrgreen,
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
    backgroundColor: colors.eltrblue,
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: colors.eltrapricot,
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

