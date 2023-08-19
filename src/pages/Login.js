import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { login } from "../api/authentication";
import { COLLECTION, get } from "../api/firestore";
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
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303a45",
    padding: 12,
    width: 200,
    borderRadius: 20,
  },
  createAccountText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});

export default function Login({ navigation }) {
  const { setUser } = useDataContext();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onLogin = async () => {
    setError("");

    if (!email) {
      setError("Please enter an email!");
      return;
    }

    if (!pass || pass.length < 6) {
      setError("Please enter a password!");
      return;
    }

    try {
      const authUser = await login(email, pass);
      const dbUser = await get(COLLECTION.USERS, authUser.uid);
      setUser(dbUser);
    } catch (err) {
      setError(err);
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
          LOGIN
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoFocus
          style={styles.textInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            marginTop: 20,
            color: "red",
          }}
        >
          {error}
        </Text>
      </View>

      <View style={{ marginBottom: 50, textAlign: "center" }}>
        <TouchableOpacity onPress={onLogin} style={styles.submitButton}>
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.createAccountText}
        >
          <Text style={{ color: "dimgrey" }}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
