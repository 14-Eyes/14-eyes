import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import firebase from "firebase";

import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import ChildBackButton from "../../components/ChildBackButton";
import AuthContext from "../../auth/context";
import Firebase from "../../config/firebase";
import ErrorMessage from "../../components/forms/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function ChildChangeMode({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password }) => {
    let user = Firebase.auth().currentUser;
    let credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credentials)
      .then(function () {
        // User re-authenticated.
        navigation.navigate("AppNavigator");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        setLoginFailed(true);
      });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <AppText style={styles.textbox}>
          You are about to switch to Adult Mode. Please enter your password to
          continue
        </AppText>

        <AppForm
          initialValues={{ password: "", email: authContext.user.email }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error="Invalid password." visible={loginFailed} />
          <AppFormField
            name="password"
            autoCaptilize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Change to Adult Mode" />
        </AppForm>

        <View style={styles.space}>
          <ChildBackButton
            title="<<   GO BACK"
            onPress={() => navigation.navigate(routes.CHILD_HOME)}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.eltrlightblue,
  },

  container: {
    padding: 15,
    marginVertical: 70,
    alignItems: "center",
  },

  space: {
    marginVertical: 50,
  },
});

export default ChildChangeMode;
