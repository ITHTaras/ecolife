import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { Avatar, Button, Snackbar, TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector, useDispatch } from "react-redux";
import { resetImage, updateUser } from "../features/users/userSlice";
import CustomInput from "../components/CustomInput";
import langs from "../lang/langs";
import { useForm } from "react-hook-form";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditProfile() {
  const dispatch = useDispatch();

  const { user, lang } = useSelector((store) => store.user);

  const [snack, setSnack] = useState(false);
  const [helper, setHelper] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
  });

  const onSubmit = (data) => {
    if (image) {
      uploadImage();
      data.image = image.substring(image.lastIndexOf("/") + 1);
    }

    dispatch(updateUser(data));
    setSnack(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
    resetImage();
  };

  const uploadImage = async () => {
    const imageRef = ref(
      storage,
      `users/${image.substring(image.lastIndexOf("/") + 1) + user.email}`
    );

    const response = await fetch(image);
    const blobImage = await response.blob();

    try {
      await uploadBytes(imageRef, blobImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.image && !imageURL) {
      getDownloadURL(
        ref(
          storage,
          `users/${
            user.image.substring(user.image.lastIndexOf("/") + 1) + user.email
          }`
        )
      ).then((url) => {
        setImageURL(url);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {user.image ? (
          <Image
            source={{ uri: imageURL ? imageURL : image }}
            style={styles.image}
          />
        ) : (
          <Avatar.Image
            source={require("../assets/noname.png")}
            style={styles.avatar}
            size={160}
          />
        )}
        <TouchableOpacity style={styles.editImage} onPress={pickImage}>
          <Ionicons name="image-outline" color={"#fff"} size={22} />
        </TouchableOpacity>
      </View>

      <CustomInput
        name="email"
        value={user.email}
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
        name="name"
        value={user.name}
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
          required: {
            value:
              control._defaultValues.email != watch("email") ||
              control._defaultValues.name != watch("name") ||
              image
                ? false
                : true,
            message: langs[lang].fillField,
          },
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

      {/* SUBMIT */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submit}
        disabled={
          control._defaultValues.email == watch("email") &&
          control._defaultValues.name == watch("name") &&
          !image &&
          control._defaultValues.password == watch("password")
            ? true
            : false
        }
      >
        {langs[lang].submit}
      </Button>
      <View style={styles.popupContainer}>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          style={styles.popup}
        >
          {langs[lang].changedOk}
        </Snackbar>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
  avatar: {
    backgroundColor: "#fff",
    marginTop: 40,
    borderColor: "#c0cad2",
    elevation: 1,
    position: "relative",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: 40,
    position: "relative",
  },
  editImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#c0cad2",

    borderColor: "#fff",
    borderWidth: 5,

    position: "absolute",
    bottom: 10,
    left: 120,
  },
  input: {
    width: "80%",
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
  popupContainer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    top: Dimensions.get("window").height * 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#38c638",
    color: "#fff",
  },
});
