import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { signUp } from "../api/authentication";
import { COLLECTION, addWithId } from "../api/firestore";
import useDataContext from "../api/dataContext";
import Logo from "../components/Logo";

const styles = StyleSheet.create({
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    margin: 10,
  },
});

export default function Login({ navigation }) {
  const { setUser } = useDataContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onSignup = async () => {
    setError("");

    if (!name) {
      setError("Please enter a name");
      return;
    }

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
      name,
      cart: [],
      orderHistory: [],
      id: authUser.uid,
      email: authUser.email,
      phone: authUser.phoneNumber,
    };

    try {
      await addWithId(COLLECTION.USERS, newUser.id, newUser);
      setUser(newUser);
    } catch (err) {
      setError(`Error while adding user to db: ${err}`);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Logo />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          SIGNUP
        </Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
          autoFocus
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
        />
        <Text style={{ fontSize: 12, fontWeight: "100", marginTop: 20 }}>
          {error}
        </Text>
      </View>

      <View style={{ marginBottom: 50 }}>
        <Button title="Submit" onPress={onSignup} />
        <Button
          color="dimgrey"
          title="Back to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
}
