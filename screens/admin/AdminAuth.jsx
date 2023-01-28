import { useForm } from "react-hook-form";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import langs from "../../lang/langs";
import CustomInput from "../../components/CustomInput";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin } from "../../features/users/userSlice";
import { Button } from "react-native-paper";

function AdminAuth() {
  const dispatch = useDispatch();
  const { lang } = useSelector((store) => store.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(adminLogin(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{langs[lang].authorization}</Text>
      <CustomInput
        name="password"
        placeholder={langs[lang].password}
        control={control}
        style={styles.input}
        secureTextEntry={true}
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
        {langs[lang].submit}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.8,
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    marginTop: 30,
    backgroundColor: "transparent",
    color: "#2596be",
  },
  login: {
    color: "#2596be",
    fontSize: 13,
    width: Dimensions.get("window").width * 0.6,
    marginTop: 10,
    padding: 4,
  },
  header: {
    fontSize: 30,
    fontWeight: "500",
  },
  submit: {
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: "#2596be",
    width: Dimensions.get("window").width * 0.6,
    padding: 4,
  },
});

export default AdminAuth;
