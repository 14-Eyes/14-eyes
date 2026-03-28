// this navigator file sets the "mode" for the app to exist in
// mode: use the "child" navigators or use the "adult"/base navigators

import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./AppNavigator"; // base navigator
import ChildNavigator from "./ChildNavigator"; // child navigator
import ModeContext from "../auth/ModeContext";
import SponsoredBy from "../screens/SponsoredBy";

const Stack = createStackNavigator();

export default function RootNavigator() {
    const [mode, setModeState] = useState(null); // null until loaded
    const [bootComplete, setBootComplete] = useState(false);

    // this has the app load to "adult" mode every time it is reloaded or opened
    // if we want to use this we need to remove the below useEffect blocks
    // const [mode, setMode] = useState("adult"); 

    // save mode in AsyncStorage whenever it changes
    const setMode = async (newMode) => {
        try {
            await AsyncStorage.setItem("APP_MODE", newMode);
            setModeState(newMode);
        } catch (e) {
            console.log("Error saving mode", e);
            setModeState(newMode);
        }
    };

    // load whatever the last used mode was when app starts
    useEffect(() => {
        const loadMode = async () => {
            try {
                const savedMode = await AsyncStorage.getItem("APP_MODE");

                setModeState(savedMode || "adult"); // adult is default mode
            } catch (error) {
                console.log("Error loading mode:", error);
                setModeState("adult");
            }
        };

        loadMode();
    }, []);

    // // save mode in AsyncStorage whenever it changes
    // useEffect(() => {
    //     const saveMode = async () => {
    //         if (mode) {
    //             await AsyncStorage.setItem("APP_MODE", mode);
    //         }
    //     };

    //     saveMode();
    // }, [mode]);

    // prevent navigator from rendering before mode loads
    if (!mode) return null;

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            {!bootComplete ? (
                <Stack.Screen name="SponsoredBy">
                    {(props) => (
                    <SponsoredBy
                        {...props}
                        onFinish={() => setBootComplete(true)}
                    />
                    )}
                </Stack.Screen>
            ) : mode === "adult" ? (
                <Stack.Screen name="AdultApp" component={AppNavigator} />
            ) : (
                <Stack.Screen name="ChildApp" component={ChildNavigator} />
            )}
        </Stack.Navigator>
        </ModeContext.Provider>
    );
}