import React, { useContext } from "react";
import { StyleSheet, Image, ImageBackground, View, Platform } from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { auth, db} from "../config/firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; 

import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

function RegisterScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  let userID = null;

  const handleSubmit = ({ name, email, password }) => {
    auth
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userID = userCredential.user.uid;
        authContext.setUser(userCredential.user);
        db
          setDoc(doc(db, "users", userID), {/*.collection("users")
          .doc(`${userID}`)
          .set({*/
            name: name,
          })
    /*Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        userID = userCredential.user.uid;
        authContext.setUser(userCredential.user);

        Firebase.firestore()
          .collection("users")
          .doc(`${userID}`)
          .set({
            name: name,
          })*/
          .then(() => {
            console.log("Firestore document successfully written for UID:", userID);
            authContext.setUsername(name);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
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
        source={require("../assets/appsponsor_2.png")}
      ></Image>
    </View>

    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="name"
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="Name"
          textContentType="name"
        />
        <AppFormField
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          name="confirmPassword"
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-question"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />

        <View style={styles.fixContainer}>
          <SubmitButton title="Register" color='black' />

          <AppText style={styles.text}>
                —————— OR ——————
          </AppText>
          <AppButton
            title="back"
            onPress={() => navigation.navigate(routes.LOGIN)}
          />
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
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  logoContainer: {
    top: 20,
    margin: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  text: {
    color: colors.medium,
    fontSize: 20,
    textAlign: "center",
  }
});

export default RegisterScreen;
