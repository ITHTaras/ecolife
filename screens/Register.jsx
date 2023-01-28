import { useState, useEffect } from "react";

import {
  ActivityIndicator,
  Button,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { register, resetErrors } from "../features/users/userSlice";

import langs from "../lang/langs";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const { user, lang, isError, isLoading, isSuccess, message } = useSelector(
    (store) => store.user
  );

  const [helper, setHelper] = useState({
    eye: false,
  });
  const [snack, setSnack] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("SUCCESS");
      navigation.navigate("Creation");
    }

    if (isError) {
      console.log("ERROR!" + message);
      setSnack(true);
    }

    resetErrors();
  }, [user, isError, isSuccess, message]);

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#7936ac" size={40} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{langs[lang].register}</Text>

        <CustomInput
          name="name"
          placeholder={langs[lang].name}
          control={control}
          style={styles.input}
          rules={{
            required: langs[lang].fillField,
            maxLength: {
              value: 50,
              message: `${langs[lang].lengthLessThan} 50 ${langs[lang].symbols}`,
            },
            pattern: {
              value:
                /^[a-zA-Z0-9АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщьЮюЯя]*$/,
              message: "Ім'я не має містити спеціальних символів",
            },
          }}
        />
        <CustomInput
          name="email"
          placeholder={langs[lang].email}
          control={control}
          style={styles.input}
          rules={{
            required: langs[lang].fillField,
            maxLength: {
              value: 50,
              message: `${langs[lang].lengthLessThan} 50 ${langs[lang].symbols}`,
            },
            pattern: {
              value:
                /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: langs[lang].unexistingEmail,
            },
          }}
        />

        <CustomInput
          name="password"
          placeholder={langs[lang].password}
          control={control}
          style={styles.input}
          secureTextEntry={helper.eye}
          icon={
            <TextInput.Icon
              icon={helper.eye ? "eye-off" : "eye"}
              color={helper.eye ? "#0b0b0b" : "#2596be"}
              onPress={() => setHelper({ ...helper, eye: !helper.eye })}
            />
          }
          rules={{
            required: langs[lang].fillField,
            minLength: {
              value: 6,
              message: `${langs[lang].lengthMoreThan} 6 ${langs[lang].symbols}`,
            },
            maxLength: {
              value: 50,
              message: `${langs[lang].lengthLessThan} 50 ${langs[lang].symbols}`,
            },
          }}
        />

        <Button
          style={styles.submit}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          {langs[lang].registerVerb}
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          style={styles.login}
          color="#2596be"
        >
          {langs[lang].orLogin}
        </Button>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          style={styles.popup}
        >
          {langs[lang].falsyData}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.9,
  },
  header: {
    fontSize: 30,
    marginTop: 70,
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    marginTop: 20,
    backgroundColor: "transparent",
    color: "#2596be",
  },
  submit: {
    marginTop: 60,
    borderRadius: 6,
    width: Dimensions.get("window").width * 0.6,
    padding: 4,
    backgroundColor: "#2596be",
  },
  forgot: {
    marginTop: 10,
    borderRadius: 6,
    width: Dimensions.get("window").width * 0.8,
    padding: 10,
  },
  login: {
    color: "#464343",
    fontSize: 13,
    width: Dimensions.get("window").width * 0.6,
    marginTop: 10,
    padding: 4,
  },
  loadingContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b8888b6",
  },
  errorText: {
    color: "#ba1a1a",
    fontSize: 13,
  },
  popup: {
    backgroundColor: "#6200ed",
    color: "#fff",
  },
});
