import { Text, View, Button } from "react-native";

export default function Login({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>This is login screen</Text>
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
      >
        Go to Signup
      </Button>
    </View>
  );
}
