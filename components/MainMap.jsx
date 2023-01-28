import MapView, { Callout, Marker } from "react-native-maps";
import { Image, StyleSheet, Text, View } from "react-native";

import langs from "../lang/langs";
import langDB from "../lang/langDB.json";

function MainMap(props) {
  const titles = [
    props.lang == "en" ? langDB.Папір.title : "Папір",
    props.lang == "en" ? langDB.Скло.title : "Скло",
    props.lang == "en" ? langDB.Органіка.title : "Органіка",
    props.lang == "en" ? langDB.Пластик.title : "Пластик",
    props.lang == "en" ? langDB.Електроніка.title : "Електроніка",
    props.lang == "en" ? langDB.Метал.title : "Метал",
  ];
  let { points, navigation, lang } = props;
  points = points.filter((item) => item.isSafe == true);
  const otherGarbages = [langs[lang].clothPoint, langs[lang].dump];
  return (
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
                      type.categoryId != 8 && type.categoryId != 9 ? size : ""
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
                point.user
                  ? () => {
                      navigation.navigate("User", {
                        id: point.userId,
                        email: point.user.email,
                        name: point.user.name,
                        image: point.user.image,
                      });
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
                        : otherGarbages[point.point_types[0].categoryId - 8]}
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
                {point.user ? (
                  <Text style={styles.author}>
                    {langs[lang].posted}
                    {point.user.name}
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
  map: {
    height: 500,
    marginTop: 15,
  },
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 5,
    width: 250,
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

  author: {
    color: "#fff",
    textAlign: "right",
    marginRight: 20,
  },
});

export default MainMap;
