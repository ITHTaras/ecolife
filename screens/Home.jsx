import { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import Categories from "../components/Categories";
import MainMap from "../components/MainMap";

import langs from "../lang/langs";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../features/categories/categorySlice";
import { getMe, setLang } from "../features/users/userSlice";
function Home({ navigation }) {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  // Redux
  const dispatch = useDispatch();
  const { categories, points, isLoading } = useSelector(
    (store) => store.category
  );
  const { lang } = useSelector((store) => store.user);

  // useEffect
  useEffect(() => {
    dispatch(getMe());
    setTimeout(() => dispatch(getCategories()), 10);
  }, []);

  //console.log(categories);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#7936ac" size={40} />
      </View>
    );
  }

  if (fontsLoaded && !isLoading) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.heading}>
              <Text style={styles.titleText}>Eco</Text>
              <Image
                style={styles.titleImage}
                source={require("../assets/L.png")}
              />
              <Text style={styles.life}>ife</Text>
            </View>
            <View style={styles.langContainer}>
              {/* English */}
              {lang == "en" ? (
                <View style={styles.lang}>
                  <Text style={{ ...styles.langText, color: "#000" }}>EN</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.lang}
                  onPress={() => dispatch(setLang("en"))}
                >
                  <Text style={styles.langText}>EN</Text>
                </TouchableOpacity>
              )}
              <View style={styles.langDivider}></View>
              {/* Ukrainian */}
              {lang == "ua" ? (
                <View style={styles.lang}>
                  <Image
                    style={styles.uaImg}
                    source={require("../assets/ua.png")}
                  />
                  <Text style={{ ...styles.langText, color: "#000" }}>UA</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.lang}
                  onPress={() => dispatch(setLang("ua"))}
                >
                  <Image
                    style={styles.uaImg}
                    source={require("../assets/ua.png")}
                  />
                  <Text style={styles.langText}>UA</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/*  Categories  */}
          <Categories
            categories={categories}
            points={points}
            isLoading={isLoading}
            navigation={navigation}
          />
          {/* Map */}
          <Text style={styles.mapHeading}>{langs[lang].wastePoints}</Text>
          <MainMap points={points} navigation={navigation} lang={lang} />
          <View style={{ height: 10 }}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fdfdfd",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 45,
    fontWeight: "bold",
    alignSelf: "flex-end",
    color: "#2596be",
  },
  life: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#6db810",
    alignSelf: "flex-end",
    marginTop: 4.5,
  },
  titleImage: { width: 50, height: 52.3 },
  langContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  lang: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
  },
  langText: { color: "#797878", fontSize: 15 },
  uaImg: { width: 20, height: 20, borderRadius: 100, marginRight: 6 },
  langDivider: {
    height: 30,
    width: 1,
    backgroundColor: "#797878",
    marginRight: 7,
  },
  name: { fontFamily: "Roboto_500Medium", fontSize: 23 },
  loadingContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b8888b6",
  },
  mapHeading: {
    marginTop: 160,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    textAlign: "center",
  },
});

export default Home;
