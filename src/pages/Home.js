import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Card } from "react-native-paper";
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
      img: "https://img.freepik.com/premium-vector/rocket-icon-rocket-planets-space-icon-white-isolated_138676-551.jpg",
      color: "#EAF0FF",
    },
    {
      name: "Cart",
      img: "https://cdn-icons-png.flaticon.com/512/3900/3900101.png",
      color: "#EAF0FF",
    },
    {
      name: "Orders",
      img: "https://cdn-icons-png.flaticon.com/512/3225/3225247.png",
      color: "#EAF0FF",
    },
    {
      name: "Profile",
      img: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
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
          fontSize: 25,
          color: "#123A65",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        GALACTIC WHEELS
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

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
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
                      source={{ uri: item.img }}
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
