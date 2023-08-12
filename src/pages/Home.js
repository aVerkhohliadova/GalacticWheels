import { View, Text, Button } from "react-native";
import useDataContext from "../api/dataContext";
import { logout } from "../api/authentication";

export default function Home({ navigation }) {
  const { user, setUser, updateUserData } = useDataContext();

  const onLogout = () => {
    logout();
    setUser(); // Do NOT use setUser elsewhere, use updateUserData instead
  };

  return (
    <View
      style={{
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Logged in as {user.email}</Text>
      <Text>Currently, name is: {user.name}, try sample button below </Text>

      <Button
        title="Sample Buton: Update User Name"
        onPress={() => updateUserData({ ...user, name: "Topsy Krett" })}
      />
      <Button
        title="View Profile"
        onPress={() => navigation.navigate("Profile")}
      />

      <Button
        title="Spaceships"
        onPress={() => navigation.navigate("My Spaceships")}
      />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}
