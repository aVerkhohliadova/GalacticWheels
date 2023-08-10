import { useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { signUp } from "../api/authentication";
import { COLLECTION, addWithId } from "../api/firestore";
import useDataContext from "../api/dataContext";

export default function Login({ navigation }) {
  const { setUser } = useDataContext();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onSignup = async () => {
    setError("");

    if (!email) {
      setError("Please enter an email");
      return;
    }

    if (!pass || pass.length < 6) {
      setError("Please enter a (min 6 letter) password");
      return;
    }

    let authUser;
    try {
      authUser = await signUp(email, pass);
    } catch (err) {
      setError(`Error while signing up: ${err}`);
    }

    if (!authUser) return;

    const newUser = {
      id: authUser.uid,
      email: authUser.email,
      phone: authUser.phoneNumber,
      name: authUser.displayName,
      orderHistory: [],
      cart: [],
    };

    try {
      await addWithId(COLLECTION.USERS, newUser.id, newUser);
      setUser(newUser);
    } catch (err) {
      setError(`Error while adding user to db: ${err}`);
    }
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
      <Button title="Signup" onPress={onSignup} />
      <Button title="Back to Login" onPress={() => navigation.pop()} />
      <Text>{error}</Text>
    </View>
  );
}
