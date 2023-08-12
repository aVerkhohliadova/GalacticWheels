import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import useDataContext from "../api/dataContext";

export default function Home({ navigation }) {
  const { user } = useDataContext();

  useEffect(() => {
    if (user) console.log("Dummy user logged in!");
  }, [user]);

  return (
    <View
      style={{
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>MY SPACESHIP WORLD!!</Text>

      {/* <Button
        title="View Profile"
        onPress={() => navigation.navigate("Profile")} // Navigate to Profile page
      /> */}
    </View>
  );
}
