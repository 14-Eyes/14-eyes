import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";
import AppText from "../components/AppText";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function EditAccountEmail({ navigation }) {
  const authContext = useContext(AuthContext);
  let user = authContext.user;

  const handleSubmit = ({ email }) => {
    user
      .updateEmail(email)
      .then(function () {
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>Your current email address is {authContext.user.email}</AppText>
      <AppText style={styles.tooltip}>What would you like to change it to?</AppText>
      <AppForm
        initialValues={{
          email: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          autoCaptilize="none"
          autoCorrect={false}
          keyboardType="email-address"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <SubmitButton title="Save" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  tooltip: {
    fontSize: 15,
    alignSelf: "center",
  },
});

export default EditAccountEmail;
