import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./components/Tabs";
import Category from "./screens/Category";

// Redux
import store from "./store";

import { Provider } from "react-redux";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Questions from "./screens/Questions";
import User from "./screens/User";
import EditProfile from "./screens/EditProfile";
import Admin from "./screens/admin/Admin";
import Landfills from "./screens/Landfills";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen
            name="Tabs"
            options={{ headerShown: false }}
            component={Tabs}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={({ route }) => ({
              title: "",
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Questions"
            component={Questions}
            options={{
              title: "Поширені запитання",
              contentStyle: { backgroundColor: "#f2f2f2" },
            }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={({ route }) => ({
              title: route.params.name,
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={() => ({
              title: "Редагування профілю",
              contentStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
            })}
          />
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={() => ({
              title: "Адмінська частина",
              contentStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
            })}
          />
          <Stack.Screen
            name="Landfills"
            component={Landfills}
            options={() => ({
              title: "",
              contentStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
