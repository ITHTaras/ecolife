import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";
import { useSelector } from "react-redux";
import langDB from "../lang/langDB.json";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import langs from "../lang/langs";

function Category({ route }) {
  const { lang } = useSelector((store) => store.user);
  const { name, description, color, id, objects } = route.params;
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  let count = 0;
  return (
    <ScrollView>
      <View style={styles.image}>{icons[id]}</View>
      <View style={styles.container}>
        <Text style={styles.title}>
          {lang == "en" ? langDB[name].title : name}
        </Text>
        <Text style={styles.description}>
          {lang == "en" ? langDB[name].text : description}
        </Text>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Accordion
            title={langs[lang].wasteExamples}
            expanded={expanded}
            onPress={handlePress}
            style={{
              backgroundColor: "#fff",
            }}
            titleStyle={{ fontSize: 20, fontWeight: "400" }}
          >
            {objects.map((item) => {
              count++;
              return (
                <View key={count} style={styles.item}>
                  <MaterialIcons name="rhombus" color={color} size={13} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              );
            })}
          </List.Accordion>
        </List.Section>
      </View>
    </ScrollView>
  );
}

const icons = [
  <MaterialIcons name="file-document-multiple" color="#2596be" size={150} />,
  <MaterialIcons name="glass-fragile" color="#2558be" size={150} />,
  <MaterialIcons name="food-apple" color="#38c638" size={150} />,
  <MaterialIcons name="bottle-soda" color="#f89c0c" size={150} />,
  <Ionicons name="phone-portrait-outline" color="#d4401f" size={150} />,
  <MaterialIcons name="screw-machine-round-top" color="#b9b5b5" size={150} />,
];

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  description: {
    marginTop: 13,
    fontSize: 18,
    color: "#606569",
    lineHeight: 23,
  },
  divider: {
    alignSelf: "stretch",
    marginHorizontal: 5,
    marginTop: 15,
    height: 2,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 10,
  },
  itemText: { marginLeft: 15, fontSize: 18, color: "#606569" },
  image: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Category;
