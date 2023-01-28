import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  Button,
  DataTable,
  Dialog,
  Divider,
  Portal,
  Provider,
  Snackbar,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useSelector, useDispatch } from "react-redux";

import langs from "../../lang/langs";
import langDB from "../../lang/langDB.json";
import { activatePoint } from "../../features/categories/categorySlice";

function AdminDashboard({ navigation, route }) {
  const dispatch = useDispatch();
  const { adminAuth, lang } = useSelector((store) => store.user);

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
  let count = 0;

  const [dialog, setDialog] = useState(false);
  const [activate, setActivate] = useState(null);
  const [snack, setSnack] = useState(false);
  const [pointId, setPointId] = useState(null);

  const [region, setRegion] = useState({
    latitude: 50.7499503,
    longitude: 25.3441864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onActivate = (isSafe, pointId) => {
    setDialog(false);
    setSnack(true);

    dispatch(activatePoint({ isSafe, pointId, password: adminAuth }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.name}>{langs[lang].adminPanel}</Text>
        <Divider style={styles.divider} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title numeric>{langs[lang].date}</DataTable.Title>
            <DataTable.Title numeric>{langs[lang].active}</DataTable.Title>
          </DataTable.Header>
          {points.map((point) => {
            return (
              <TouchableOpacity
                key={point.id}
                onPress={() =>
                  setRegion({
                    ...region,
                    latitude: point.latitude,
                    longitude: point.longtitude,
                  })
                }
              >
                <DataTable.Row style={{ display: "flex", padding: 15 }}>
                  <DataTable.Cell>{point.id}</DataTable.Cell>
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

        {/* Map */}
        <MapView style={styles.map} region={region}>
          {points.map((point) => {
            count = 0;

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
                    source={require("../../assets/trashCollection.png")}
                    style={{ width: 40, height: 47 }}
                  />
                )}
                <Callout
                  tooltip
                  onPress={() => {
                    setDialog(true);
                    setActivate(!point.isSafe);
                    setPointId(point.id);
                  }}
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
                        <Text style={styles.complaint}>
                          {point.isSafe
                            ? langs[lang].deactivate
                            : langs[lang].activate}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.tooltipTitle}>
                          {langs[lang].wastePoint}
                        </Text>
                        <Text style={styles.complaint}>
                          {point.isSafe
                            ? langs[lang].deactivate
                            : langs[lang].activate}
                        </Text>
                      </View>
                    )}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
      <Provider>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={dialog}
              onDismiss={() => setDialog(false)}
            >
              <Dialog.Title>{langs[lang].activationConfirmation}</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => onActivate(activate, pointId)}>
                  {activate ? langs[lang].activate : langs[lang].deactivate}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <View style={styles.popupContainer}>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          style={styles.popup}
        >
          {langs[lang].activatedSuccess}
        </Snackbar>
      </View>
    </ScrollView>
  );
}

const images = [
  require("../../assets/paper.png"),
  require("../../assets/glass.png"),
  require("../../assets/organic.png"),
  require("../../assets/plastic.png"),
  require("../../assets/electronic.png"),
  require("../../assets/metal.png"),
  0,
  require("../../assets/clothes.png"),
  require("../../assets/trash.png"),
];

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
  name: {
    fontSize: 30,
    marginTop: 50,
    fontWeight: "500",
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
  dialog: {
    display: "flex",
    alignItems: "center",
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
});

export default AdminDashboard;
