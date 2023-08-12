import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useDataContext from "../api/dataContext";
import { logout } from "../api/authentication";

export default function Home({ navigation }) {
  const { setUser } = useDataContext();

  const onLogout = () => {
    logout();
    setUser();
  };

  return (
    <View style={{ marginTop: 50, marginRight: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onLogout}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#123A65",
              marginTop: 10,
              fontSize: 14,
            }}
          >
            {" "}
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          color: "#123A65",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        SPACESHIP WORLD
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/spaceship.png")}
          style={{ height: 200, width: 200 }}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: 25,
        }}
      >
        <View
          style={{
            margin: 20,
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6dc6e3",
            borderRadius: 25,
            width: "40%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("My Spaceships")}
          >
            <Icon
              name="user"
              size={24}
              style={{ textAlign: "center", color: "#123A65" }}
            />

            <Text
              style={{ color: "#123A65", fontWeight: "bold", paddingTop: 20 }}
            >
              SPACESHIPS
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            margin: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 150,
            backgroundColor: "#6dc6e3",
            width: "40%",
            borderRadius: 25,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
            <Icon
              name="user"
              size={24}
              style={{ textAlign: "center", color: "#123A65" }}
            />
            <Text
              style={{ color: "#123A65", fontWeight: "bold", paddingTop: 20 }}
            >
              ORDER HISTORY
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            margin: 20,
            display: "flex",
            height: 150,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6dc6e3",
            width: "40%",
            borderRadius: 25,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Icon
              name="user"
              size={24}
              style={{ textAlign: "center", color: "#123A65" }}
            />
            <Text
              style={{ color: "#123A65", fontWeight: "bold", paddingTop: 20 }}
            >
              PROFILE
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            margin: 20,
            display: "flex",
            height: 150,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6dc6e3",
            width: "40%",
            borderRadius: 25,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon
              name="shopping-cart"
              size={24}
              style={{ textAlign: "center", color: "#123A65" }}
            />
            <Text
              style={{ color: "#123A65", fontWeight: "bold", paddingTop: 20 }}
            >
              CART
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
