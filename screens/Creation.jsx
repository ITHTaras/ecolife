import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Snackbar,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../features/categories/categorySlice";
import Select from "../components/Select";

import langs from "../lang/langs";
import { ref, uploadBytes } from "firebase/storage";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { storage } from "../firebase";

export default function Creation() {
  const dispatch = useDispatch();
  const { user, lang } = useSelector((store) => store.user);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.category
  );

  const handleSubmit = () => {
    let tempImage;
    if (checked && image) {
      uploadImage();
      tempImage = image.substring(image.lastIndexOf("/") + 1);
    }

    let data;

    if (checked) {
      data = {
        latitude: marker.latitude,
        longtitude: marker.longitude,
        categories: [{ categoryId: 9 }],
        image: tempImage,
      };
    } else {
      data = {
        latitude: marker.latitude,
        longtitude: marker.longitude,
        categories,
        image: null,
      };
    }

    // console.log(data);
    dispatch(addPoint(data));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const imageRef = ref(
      storage,
      `points/${image.substring(image.lastIndexOf("/") + 1) + user.email}`
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
    if (isSuccess) {
      console.log("success!!!!!");
      setSnack(true);
    }

    if (isError) {
      console.log("error!!!!!");
      setSnack(true);
    }
  }, [isSuccess, isError]);

  const [snack, setSnack] = useState(false);

  const [marker, setMarker] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [checked, setChecked] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#7936ac" size={40} />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.header}>{langs[lang].pointCreation}</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 50.7499503,
                  longitude: 25.3441864,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.05,
                }}
                onPress={(e) => setMarker(e.nativeEvent.coordinate)}
              >
                {marker ? <Marker coordinate={marker} /> : ""}
              </MapView>
              <View style={styles.check}>
                <Text style={styles.landfills}>{langs[lang].landfills}</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              {!checked ? (
                <>
                  <Select setCategories={setCategories} lang={lang} />
                </>
              ) : image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <TouchableOpacity style={styles.editImage} onPress={pickImage}>
                  <Image
                    source={require("../assets/noimage.png")}
                    style={styles.noimage}
                  />
                </TouchableOpacity>
              )}

              <Button
                style={styles.submit}
                mode="contained"
                onPress={handleSubmit}
                disabled={
                  !user || !marker || (categories.length == 0 && !checked)
                }
              >
                {langs[lang].add}
              </Button>

              <View style={{ height: 200 }} />
            </View>
          }
        />
        <View style={styles.popupContainer}>
          <Snackbar
            visible={snack}
            onDismiss={() => setSnack(false)}
            style={{
              ...styles.popup,
              backgroundColor: isSuccess ? "#38c638" : "#ba1a1a",
            }}
          >
            {isSuccess ? "Точку додано успішно!" : message.message}
          </Snackbar>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    marginTop: 70,
  },
  noimage: {
    width: 202,
    height: 142,
    marginTop: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 400,
    marginTop: 15,
  },
  check: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  landfills: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  submit: {
    marginTop: 50,
    backgroundColor: "#2596be",
    borderRadius: 6,
    width: Dimensions.get("window").width * 0.6,
    padding: 4,
  },
  popupContainer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#38c638",
    color: "#fff",
  },
  loadingContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b8888b6",
  },
});
