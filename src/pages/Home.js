import { useEffect } from "react";
import { View, Text } from "react-native";
import useDataContext from "../api/dataContext";

export default function Home() {
  const { user } = useDataContext();

  useEffect(() => {
    if (user) console.log("Dummy user logged in!");
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
      <Text>This is home screen</Text>
    </View>
  );
}
