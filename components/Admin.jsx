import { StyleSheet, Text, View } from "react-native";

import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { IconButton } from "react-native-paper";

function Settings({ navigation }) {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Адмінська частина</Text>
        </View>
        <View style={styles.list}>
          {/* */}
          <View style={{ ...styles.listItem, backgroundColor: colors[0] }}>
            <Text style={styles.itemText}>Керування категоріями</Text>
            <IconButton
              color="#fff"
              icon="arrow-right"
              size={40}
              style={styles.itemIcon}
              onPress={() => console.log("Pressed")}
            />
          </View>
          {/* */}
          <View style={{ ...styles.listItem, backgroundColor: colors[1] }}>
            <Text style={styles.itemText}>
              Керування пунктами сортування сміття
            </Text>
            <IconButton
              color="#fff"
              icon="arrow-right"
              size={40}
              style={styles.itemIcon}
              onPress={() => console.log("Pressed")}
            />
          </View>
          {/* */}
          <View style={{ ...styles.listItem, backgroundColor: colors[2] }}>
            <Text style={styles.itemText}>
              Керування пунктами прийому сміття
            </Text>
            <IconButton
              color="#fff"
              icon="arrow-right"
              size={40}
              style={styles.itemIcon}
              onPress={() => console.log("Pressed")}
            />
          </View>
          {/* */}
          <View style={{ ...styles.listItem, backgroundColor: colors[3] }}>
            <Text style={styles.itemText}>
              Керування поширеними запитаннями
            </Text>
            <IconButton
              color="#fff"
              icon="arrow-right"
              size={40}
              style={styles.itemIcon}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const colors = ["#00c2d9", "#01d48f", "#008884", "#f3c300"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    height: 100,
    marginTop: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto_500Medium",
    marginLeft: 17,
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    maxWidth: 230,
  },
  itemIcon: {
    marginLeft: "auto",
  },
});

export default Settings;
