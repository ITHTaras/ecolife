import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Creation from "../screens/Creation";

// Screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";

// Redux
import { useSelector } from "react-redux";

const EmptyComponent = () => null;

function Tabs({ navigation }) {
  const { user } = useSelector((store) => store.user);
  //console.log(user);

  return (
    <Tab.Navigator
      activeColor="#f89c0c"
      inactiveColor="#fff"
      barStyle={{
        backgroundColor: "#2596be",
        height: 60,
      }}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={30}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Creation"
        component={Creation}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name={focused ? "pluscircle" : "pluscircleo"}
              color={color}
              size={focused ? 70 : 50}
              style={{
                width: focused ? 70 : 50,
                height: focused ? 70 : 50,
                position: "absolute",
                bottom: focused ? -15 : -13,
              }}
            />
          ),
        }}
      />
      {user ? (
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={30}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Settings"
          component={EmptyComponent}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Login");
            },
          })}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={30}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default Tabs;
