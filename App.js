import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useDataContext, { DataContext } from "./src/api/dataContext";
import { Home, List, Login, Orders, Profile, Signup } from "./src/pages";
import { PaperProvider } from 'react-native-paper';
import SpaceshipDetail from "./src/pages/SpaceshipDetail";

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Orders" component={Orders} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Orders" component={Orders} /> */}
            <Stack.Screen name="My Spaceships"  component={List} />
            <Stack.Screen name="SpaceshipDetail"  component={SpaceshipDetail} />
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
