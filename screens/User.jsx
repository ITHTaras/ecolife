import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import MapView, { Callout, Marker } from "react-native-maps";
import { Avatar, DataTable, Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Complaint from "../components/Complaint";

import { useSelector } from "react-redux";

import langs from "../lang/langs";
import langDB from "../lang/langDB.json";

function User({ navigation, route }) {
  const { user, lang } = useSelector((store) => store.user);
  const titles = [
    lang == "en" ? langDB.Папір.title : "Папір",
    lang == "en" ? langDB.Скло.title : "Скло",
    lang == "en" ? langDB.Органіка.title : "Органіка",
    lang == "en" ? langDB.Пластик.title : "Пластик",
    lang == "en" ? langDB.Електроніка.title : "Електроніка",
    lang == "en" ? langDB.Метал.title : "Метал",
  ];
  const otherGarbages = [langs[lang].clothPoint, langs[lang].dump];

  const { points } = useSelector((store) => store.category);

  const userPoints = route.params.id
    ? points.filter((item) => item.userId == route.params.id)
    : points.filter(
        (item) => (item.user ? item.user.email : null) == route.params.email
      );
  let count = 0;

  const [modal, setModal] = useState(false);
  const [pointId, setPointId] = useState(null);
  const [region, setRegion] = useState({
    latitude: 50.7499503,
    longitude: 25.3441864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (route.params.image && !imageURL) {
      getDownloadURL(
        ref(
          storage,
          `users/${
            route.params.image.substring(
              route.params.image.lastIndexOf("/") + 1
            ) + route.params.email
          }`
        )
      ).then((url) => {
        setImageURL(url);
      });
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {route.params.image ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : (
          <Avatar.Image
            source={require("../assets/noname.png")}
            style={styles.avatar}
            size={100}
          />
        )}
        <Text style={styles.name}>{route.params.name}</Text>
        <Text>{route.params.email}</Text>
        <Divider style={styles.divider} />
        <View style={styles.menu}>
          <Text style={styles.header}>{langs[lang].createdPoints}</Text>
        </View>
        {user && user.email == route.params.email && userPoints.length > 0 ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>№</DataTable.Title>
              <DataTable.Title numeric>{langs[lang].date}</DataTable.Title>
              <DataTable.Title numeric>{langs[lang].active}</DataTable.Title>
            </DataTable.Header>
            {userPoints.map((point) => {
              count++;
              return (
                <TouchableOpacity
                  key={count}
                  onPress={() =>
                    setRegion({
                      ...region,
                      latitude: point.latitude,
                      longitude: point.longtitude,
                    })
                  }
                >
                  <DataTable.Row style={{ display: "flex" }}>
                    <DataTable.Cell>{count}</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                      {point.createdAt.slice(0, point.createdAt.indexOf("T"))}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                      {point.isSafe ? (
                        <Ionicons
                          color={"#38c638"}
                          name="shield-checkmark-outline"
                          size={20}
                        />
                      ) : (
                        <MaterialIcons
                          color={"#d4401f"}
                          name="error-outline"
                          size={20}
                        />
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              );
            })}
          </DataTable>
        ) : (
          ""
        )}

        {/* Map */}
        <MapView style={styles.map} region={region}>
          {userPoints.map((point) => {
            let count = 0;

            const description = point.point_types.map((type) => {
              return "\u2022 " + titles[type.categoryId - 1] + "\n";
            });

            return (
              <Marker
                key={point.id}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longtitude,
                }}
              >
                {point.point_types.length < 6 ? (
                  point.point_types.map((type) => {
                    let size;
                    count++;
                    switch (count) {
                      case point.point_types.length:
                        size = { width: 10, height: 14 };
                        break;
                      case point.point_types.length - 1:
                        size = { width: 15, height: 21 };
                        break;
                      case point.point_types.length - 2:
                        size = { width: 20, height: 28 };
                        break;
                      case point.point_types.length - 3:
                        size = { width: 25, height: 35 };
                        break;
                      case point.point_types.length - 4:
                        size = { width: 30, height: 42 };
                        break;

                      default:
                        size = { width: 35, height: 49 };
                        break;
                    }

                    return (
                      <Image
                        key={type.id}
                        source={images[type.categoryId - 1]}
                        style={
                          type.categoryId != 8 && type.categoryId != 9
                            ? size
                            : ""
                        }
                      />
                    );
                  })
                ) : (
                  <Image
                    source={require("../assets/trashCollection.png")}
                    style={{ width: 40, height: 47 }}
                  />
                )}
                <Callout
                  tooltip
                  onPress={
                    user
                      ? () => {
                          setModal(true);
                          setPointId(point.id);
                        }
                      : () => {}
                  }
                >
                  <View style={styles.tooltip}>
                    {point.point_types.length < 6 ? (
                      <View>
                        <Text style={styles.tooltipTitle}>
                          {point.point_types[0].categoryId != 8 &&
                          point.point_types[0].categoryId != 9
                            ? langs[lang].wastePoint
                            : otherGarbages[
                                point.point_types[0].categoryId - 8
                              ]}
                        </Text>
                        <Text style={styles.tooltipText}>
                          {point.point_types[0].categoryId != 8 &&
                          point.point_types[0].categoryId != 9
                            ? description
                            : ""}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.tooltipTitle}>
                        {langs[lang].wastePoint}
                      </Text>
                    )}
                    {user && user.email != route.params.email ? (
                      <Text style={styles.complaint}>
                        {langs[lang].complain}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        {user && user.email != route.params.email ? (
          <Complaint modal={modal} setModal={setModal} pointId={pointId} />
        ) : (
          ""
        )}
      </View>
    </ScrollView>
  );
}

const images = [
  require("../assets/paper.png"),
  require("../assets/glass.png"),
  require("../assets/organic.png"),
  require("../assets/plastic.png"),
  require("../assets/electronic.png"),
  require("../assets/metal.png"),
  0,
  require("../assets/clothes.png"),
  require("../assets/trash.png"),
];

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: 40,
    position: "relative",
  },
  avatar: {
    backgroundColor: "#fdfdfd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: 70,
  },
  name: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 11,
  },
  divider: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginTop: 15,
  },
  header: {
    fontSize: 34,
    fontWeight: "500",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 500,
    marginTop: 15,
  },
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 5,
    width: 250,
    minHeight: 60,
  },
  tooltipTitle: {
    fontSize: 15,
    marginBottom: 2,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  tooltipText: {
    fontSize: 12,
    color: "white",
    marginLeft: 10,
  },
  complaint: {
    color: "#fff",
    textAlign: "right",
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginRight: 20,
    textAlignVertical: "bottom",
    marginTop: 10,
  },
});

export default User;
