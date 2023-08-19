import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import Rocket from "../../assets/rocket.png";
import CartImage from "../../assets/cart.png";
import Orders from "../../assets/orders.png";
import Profile from "../../assets/profile.png";

import useDataContext from "../api/dataContext";
import { logout } from "../api/authentication";

export default function Home({ navigation }) {
  const { setUser } = useDataContext();

  const onLogout = () => {
    logout();
    setUser();
  };

  const tabOptions = [
    {
      name: "Spaceships",
      img: Rocket,
      color: "#EAF0FF",
    },
    {
      name: "Cart",
      img: CartImage,
      color: "#EAF0FF",
    },
    {
      name: "Orders",
      img: Orders,
      color: "#EAF0FF",
    },
    {
      name: "Profile",
      img: Profile,
      color: "#EAF0FF",
    },
  ];

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
          fontSize: 20,
          color: "#123A65",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        GALACTIC WHEELS
      </Text>
      <Text style={{ color: "dimgrey", textAlign: "center", paddingTop: 5 }}>
        Unleash Your Inner Astronaut with us
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/spaceship.png")}
          style={{ height: 150, width: 150 }}
        />
      </View>

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 30,
          }}
        >
          {tabOptions.map((item) => {
            return (
              <View
                key={item.name}
                style={{
                  marginLeft: "5%",
                  marginRight: "5%",
                  marginTop: 20,
                  height: 200,
                  width: "40%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.name)}
                >
                  <Card style={{ backgroundColor: item.color }}>
                    <Card.Cover
                      style={{ height: 150, backgroundColor: item.color }}
                      source={item.img}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 15,
                        fontSize: 15,
                        color: "#123A65",
                      }}
                    >
                      {item.name}
                    </Text>
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
