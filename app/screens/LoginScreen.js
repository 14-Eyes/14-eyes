import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View, Platform } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";

import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import ErrorMessage from "../components/forms/ErrorMessage";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen( { navigation} ) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);


  const handleSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      authContext.setUser(user);

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        authContext.setUsername(userDoc.data().name);
      } else {
        console.log("No such document!");
      }

      setLoginFailed(false);
    } catch (error) {
      setLoginFailed(true);
      console.log("Login error:", error);
    }
  };

  return (
    <ImageBackground
      blurRadius={Platform.OS === "android" ? 1 : 5}
      style={styles.background}
      source={require("../assets/welcome_2.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/eltrRainbow_new.png")}
        ></Image>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
            <ErrorMessage
              error="Invalid email and/or password."
              visible={loginFailed}
            />
            <AppFormField
              name="email"
              autoCaptilize="none"
              autoCorrect={false}
              keyboardType="email-address"
              icon="email"
              placeholder="Email                                                                                                                                                  "
              textContentType="emailAddress"
            />
            <AppFormField
              name="password"
              autoCaptilize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password                                                                                                                                        "
              secureTextEntry
              textContentType="password"
            />
            <View style={styles.fixContainer}>
              <SubmitButton title="Login" color='black' />

              <AppText style={styles.text}>
                —————— OR ——————
              </AppText>

              <AppButton
              title="register"
              onPress={() => navigation.navigate(routes.REGISTER)}
              />

              <AppText style={styles.forgotText} onPress={() => navigation.navigate(routes.REGISTER)}>
                Forgot password?
              </AppText>
            </View>
          </AppForm>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 25,
    justifyContent: 'center', // Center the box vertically
    alignItems: 'center',     // Center the box horizontally
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'purple',
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    position: "fixed",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 25,
  },
  logoContainer: {
    top: 20,
    margin: 50,
    position: "absolute",
    alignItems: "center",
  },
  text: {
    color: colors.medium,
    fontSize: 20,
    textAlign: "center",
  },
  forgotText: {
    color: colors.medium,
    fontSize: 18,
    textDecorationLine: 'underline',
    textAlign: "right",
  },
});

export default LoginScreen;
