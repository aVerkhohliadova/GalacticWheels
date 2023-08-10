import { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { login } from "../api/authentication";
import { COLLECTION, get } from "../api/firestore";
import useDataContext from "../api/dataContext";

export default function Login({ navigation }) {
  const { setUser } = useDataContext();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onLogin = async () => {
    const authUser = await login(email, pass);
    const dbUser = await get(COLLECTION.USERS, authUser.uid);
    setUser(dbUser);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={pass} onChangeText={setPass} />
      <Button title="Login" onPress={onLogin} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}
