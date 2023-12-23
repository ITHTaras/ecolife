import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import langDB from "../lang/langDB.json";
import langs from "../lang/langs";
import { objectsEN, objectsUA } from "../categoryObjects";

function Categories(props) {
  const { lang } = useSelector((store) => store.user);
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  // Redux
  const { isLoading, categories, navigation } = props;

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (fontsLoaded && !isLoading) {
    return (
      <View>
        <View style={styles.container}>
          {categories.map((category) => {
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.category}
                onPress={
                  category.id == 9
                    ? () => {
                        navigation.navigate("Landfills");
                      }
                    : () => {
                        navigation.navigate("Category", {
                          name: category.name,
                          description: category.description,
                          categoryPoints: category.points,
                          color: colors[category.id - 1],
                          id: category.id - 1,
                          objects:
                            lang == "en"
                              ? objectsEN[category.id - 1]
                              : objectsUA[category.id - 1],
                        });
                      }
                }
              >
                <View
                  style={{
                    ...styles.categoryIcon,
                    backgroundColor: colors[category.id - 1],
                  }}
                >
                  {icons[category.id - 1]}
                </View>
                <Text style={styles.categoryText}>
                  {category.id == 9
                    ? langs[lang].landfills
                    : lang == "en"
                    ? langDB[category.name].title
                    : category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const icons = [
  <MaterialIcons name="file-document-multiple" color="#fff" size={40} />,
  <MaterialIcons name="glass-fragile" color="#fff" size={40} />,
  <MaterialIcons name="food-apple" color="#fff" size={40} />,
  <MaterialIcons name="bottle-soda" color="#fff" size={40} />,
  null,
  <MaterialIcons name="screw-machine-round-top" color="#fff" size={40} />,
  null,
  null,
  <MaterialIcons name="trash-can" color="#fff" size={40} />,
];

const colors = [
  "#2596be",
  "#2558be",
  "#38c638",
  "#f89c0c",
  null,
  "#b9b5b5",
  null,
  null,
  "#a56e15",
];

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 100,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    display: "flex",
    alignItems: "center",
    width: "33%",
    marginBottom: 20,
  },
  categoryIcon: {
    padding: 14,
    borderRadius: 30,
  },
  categoryText: {
    fontFamily: "Roboto_500Medium",
    color: "#8b9098",
    textAlign: "center",
  },
});

export default Categories;
