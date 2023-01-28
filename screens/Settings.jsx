import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Divider } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/users/userSlice";
import { storage } from "../firebase";

import langs from "../lang/langs";

function Settings({ navigation }) {
  const dispatch = useDispatch();
  const { user, lang } = useSelector((store) => store.user);

  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    if (user.image && !imageURL) {
      getDownloadURL(
        ref(
          storage,
          `users/${
            user.image.substring(user.image.lastIndexOf("/") + 1) + user.email
          }`
        )
      ).then((url) => {
        setImageURL(url);
      });
    }
  }, []);

  const logoutF = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  const ArrowRight = () => (
    <MaterialIcon
      name="keyboard-arrow-right"
      size={25}
      color="#2596be"
      style={styles.itemArrow}
    />
  );
  return (
    <View style={styles.container}>
      {user.image ? (
        <Image source={{ uri: imageURL }} style={styles.image} />
      ) : (
        <Avatar.Image
          source={require("../assets/noname.png")}
          style={styles.avatar}
          size={160}
        />
      )}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Divider style={styles.divider} />

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcon
            color="#2596be"
            name="account"
            style={styles.itemIcon}
            size={25}
          />
          <Text style={styles.itemText}>{langs[lang].editProfile}</Text>
          <ArrowRight />
        </TouchableOpacity>
        {/* */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Creation")}
        >
          <MaterialIcon
            color="#2596be"
            name="add-circle-outline"
            style={styles.itemIcon}
            size={25}
          />
          <Text style={styles.itemText}>{langs[lang].addPoint}</Text>
          <ArrowRight />
        </TouchableOpacity>
        {/* */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate("User", {
              name: user.name,
              email: user.email,
              image: user.image ? user.image : null,
            })
          }
        >
          <MaterialCommunityIcon
            color="#2596be"
            name="map-marker-outline"
            style={styles.itemIcon}
            size={25}
          />
          <Text style={styles.itemText}>{langs[lang].changePoints}</Text>
          <ArrowRight />
        </TouchableOpacity>
        {/* */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Questions")}
        >
          <MaterialCommunityIcon
            color="#2596be"
            name="help-box"
            style={styles.itemIcon}
            size={25}
          />
          <Text style={styles.itemText}>{langs[lang].frequentQuestions}</Text>
          <ArrowRight />
        </TouchableOpacity>
        {/* Admin */}
        {user.name === "Admin" && user.email === "hornictaras@gmail.com" ? (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Admin")}
          >
            <MaterialIcon
              color="#2596be"
              name="admin-panel-settings"
              style={styles.itemIcon}
              size={25}
            />
            <Text style={styles.itemText}>{langs[lang].adminPanel}</Text>
            <ArrowRight />
          </TouchableOpacity>
        ) : (
          ""
        )}
        {/* */}
        <TouchableOpacity style={styles.menuItem} onPress={logoutF}>
          <MaterialIcon
            color="#ff0000"
            name="logout"
            style={styles.itemIcon}
            size={25}
          />
          <Text style={{ ...styles.itemText, color: "#ff0000" }}>
            {langs[lang].logout}
          </Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
  avatar: {
    backgroundColor: "#fdfdfd",
    elevation: 2,
    marginTop: 70,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: 40,
    position: "relative",
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
  menu: {
    marginHorizontal: 35,
    marginTop: 40,
    display: "flex",
    alignSelf: "flex-start",
  },
  menuItem: {
    marginTop: 13,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.813,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    letterSpacing: -0.3,
  },
  itemArrow: { marginLeft: "auto" },
});

export default Settings;
