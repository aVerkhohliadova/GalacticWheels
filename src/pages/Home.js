import { useEffect } from "react";
import { Text, View } from "react-native";
import useDataContext from "../api/dataContext";

export default function Home() {
  const { user, isLoading } = useDataContext();

  useEffect(() => {
    console.log("Dummy user logged in!");
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? <Text>Loading...</Text> : <Text>App has now loaded!</Text>}
    </View>
  );
}
