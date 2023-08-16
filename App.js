import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import useDataContext, { DataContext } from "./src/api/dataContext";
import { Cart, Checkout, Home, List, Login, Orders, Profile, Signup } from "./src/pages";
import SpaceshipDetail from "./src/pages/SpaceshipDetail";
import UpdateProfile from "./src/pages/UpdateProfile";

const Stack = createNativeStackNavigator();

function Router() {
  const { user, isLoadingContext } = useDataContext();

  // NOTE: Maybe splash screen here?
  if (isLoadingContext)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Orders" component={Orders} />
              <Stack.Screen name="My Spaceships" component={List} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen
                name="SpaceshipDetail"
                component={SpaceshipDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Update Personal Information" component={UpdateProfile}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <DataContext>
      <Router />
    </DataContext>
  );
}
