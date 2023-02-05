import { useState } from "react";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import LandfillCallout from "../components/LandfillCallout";
import LandfillModal from "../components/LandfillModal";

function Landfills({ route, navigation }) {
  let { points } = useSelector((store) => store.category);

  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  points = points.filter(
    (item) => item.isSafe == true && item.point_types[0].categoryId == 9
  );

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.7499503,
          longitude: 25.3441864,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {points.map((point) => {
          return (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longtitude,
              }}
            >
              <Image source={require("../assets/trash.png")} />
              <LandfillCallout
                styles={styles}
                point={point}
                setModal={setModal}
                setModalImage={setModalImage}
                navigation={navigation}
              />
            </Marker>
          );
        })}
      </MapView>
      <LandfillModal
        modal={modal}
        setModal={setModal}
        modalImage={modalImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height,
  },
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 5,
    width: 250,
  },
  tooltipTitle: {
    fontSize: 15,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 5,
    marginTop: 10,
  },
  author: {
    color: "#fff",
    textAlign: "right",
    marginRight: 20,
  },
});

export default Landfills;
