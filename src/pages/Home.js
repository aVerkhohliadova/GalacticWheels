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
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>This is home screen</Text>

      <Button
                title="View Profile"
                onPress={() => navigation.navigate("Profile")} // Navigate to Profile page
            />
    </View>
  );
}
