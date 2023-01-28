import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Button, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../features/categories/categorySlice";
import Select from "../components/Select";

import langs from "../lang/langs";

export default function Creation() {
  const dispatch = useDispatch();
  const { user, lang } = useSelector((store) => store.user);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.category
  );

  const handleSubmit = () => {
    const data = {
      latitude: marker.latitude,
      longtitude: marker.longitude,
      categories,
    };
    // console.log(data);
    dispatch(addPoint(data));
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
              <Select setCategories={setCategories} lang={lang} />
              <Button
                style={styles.submit}
                mode="contained"
                onPress={handleSubmit}
                disabled={!user || !marker || categories.length == 0}
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
  map: {
    width: Dimensions.get("window").width,
    height: 500,
    marginTop: 15,
  },
  submit: {
    marginTop: 60,
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
