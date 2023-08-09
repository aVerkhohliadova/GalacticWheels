import { ActivityIndicator, View } from "react-native";
import useDataContext, { DataContext } from "./src/api/dataContext";
import { Home, Login } from "./src/pages";

function Router() {
  const { user, isLoading } = useDataContext();

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (!user) return <Login />;

  return <Home />;
}

export default function App() {
  return (
    <DataContext>
      <Router />
    </DataContext>
  );
}
