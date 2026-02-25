
import React, { useState, useRef, useEffect } from "react";
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

    const REPLY_PRESETS = [
        "budget friendly snack options",
        "heart healthy shopping list",
        "low-budget, nutrient rich lunch options",
        "low-fat breakfast options", 
        "optimal grocery shopping tips",
    ];

    const getRandomPreset = (pool, count = 3) => {
        const presetArray = [...pool];
        const random = presetArray.sort(() => 0.5 - Math.random());
        return random.slice(0, count);
    };




    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your personal nutrition assistant! I can help with nutritional advice, budgeting help, and more! Try one of the prompts below, or ask me anything :)",
            sender: "ai",
            quickReplies: getRandomPreset(REPLY_PRESETS, 3),
        }
    ]);

    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const insets = useSafeAreaInsets();
    const ScrollViewRef = useRef(null);

    useEffect(() => {
        if (ScrollViewRef.current) {
            ScrollViewRef.current.scrollToEnd({ animated: true});
        }
    }, [messages]);

    const sendMessage = async (messageText = null) => {

        const textToSend = messageText || inputText.trim();

        if (!textToSend) return; //exits function early if no user message

        setMessages((prev) => [...prev, { text: textToSend, sender: "user" }]); //adds previous user message to messages array
        //const userQuestion = inputText; //saves user input to a variable
        setInputText(""); //cleares inputText
        setIsLoading(true); //sets loading boolean to true

        try {
            const result = await geminiModel.generateContent(textToSend); //calls api with user text
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

    const handleQuickReply = (reply) => {
        sendMessage(reply);
    }

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Ask about healthy budgeting choices, or nutritional advice!</AppText>
            <LineDivider/>
            <ScrollView 
                ref={ScrollViewRef}
                style={styles.messages}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {messages.map((msg, index) => (
                    <View key={index}>
                        <View style={[
                            styles.message,
                            msg.sender === "user" ? styles.userMessage : styles.aiMessage,
                        ]}
                        >
                            <AppText style={styles.messageText}>
                                {msg.text}
                            </AppText>
                        </View>

                        {msg.sender === "ai" && msg.quickReplies && (
                            <View style={styles.quickRepliesContainer}>
                                {msg.quickReplies.map((reply, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.quickReplyButton}
                                        onPress={() => handleQuickReply(reply)}
                                    >
                                        <AppText style={styles.quickReplyText}>{reply}</AppText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
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
                        style={[
                            styles.sendButton,
                            (!inputText.trim() || isLoading) && styles.sendButtonDisabled
                        ]}
                        onPress={() => sendMessage()}
                        disabled={!inputText.trim() || isLoading}
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
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 10,
    gap: 8,
  },
  quickReplyButton: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.eltrgreen,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quickReplyText: {
    color: colors.eltrgreen,
    fontSize: 14,
    fontweight: '500'
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
  sendButtonDisabled: {
    backgroundColor: colors.medium,
    opacity: 0.6,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default ChatBot;

