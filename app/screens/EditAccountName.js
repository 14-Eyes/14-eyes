import React, { useContext } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";
import AppText from "../components/AppText";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Firebase from "../config/firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

function EditAccountName({ navigation }) {
  const authContext = useContext(AuthContext);
  let userID = authContext.user.uid;

  const handleSubmit = ({ name }) => {
    Firebase.firestore()
      .collection("users")
      .doc(`${userID}`)
      .set({
        name: name,
      })
      .then(() => {
        authContext.setUsername(name);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>Enter new name</AppText>
      <AppForm
        initialValues={{
          name: "",
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
    alignSelf: "center",
    textTransform: "capitalize",
  },
});

export default EditAccountName;
