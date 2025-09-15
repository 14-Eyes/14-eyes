import React, { useContext } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Firebase from "../config/firebase";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";

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
    Firebase.auth()
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
          })
          .then(() => {
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
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/eltrRainbow.png")}
      />
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
          placeholder="Name                                                                                                                                                  "
          textContentType="name"
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
          placeholder="Password                                                                                                                                                  "
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          name="confirmPassword"
          autoCaptilize="none"
          autoCorrect={false}
          icon="lock-question"
          placeholder="Confirm Password                                                                                                                                                  "
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
		<View style={styles.buttonContainer}>
			<AppButton
			title="back"
			onPress={() => navigation.navigate(routes.WELCOME)}
			/>
		</View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.secondary,
  },
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
