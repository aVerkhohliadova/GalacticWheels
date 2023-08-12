import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import useDataContext from "../api/dataContext";
import { Divider, Card } from "react-native-paper";

function List({ navigation }) {
  // const { user, isLoading } = useDataContext();

  const spaceshipsList = [
    {
      id: 0,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: true,
    },
    {
      id: 1,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: false,
    },
    {
      id: 2,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: true,
    },
    {
      id: 3,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: false,
    },
    {
      id: 4,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: true,
    },
    {
      id: 5,
      src: "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      title: "Lambda-class Imperial Shuttle",
      subtitle: "Empire transport, moderate defense.",
      description:
        "About 66 feet (20 meters) long, this relatively little guy packs a punch thanks to cannons, hyperdrive and a host of famous users, from Darth Vader to Luke Skywalker, who uses one to escape Death Star II in Star Wars: Return of the Jedi.",
      type: "Lambda-class Shuttle",
      price: "800,000",
      available: false,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    spaceshipHeading: {
      marginTop: 80,
      marginLeft: 20,
      fontSize: 25,
      fontWeight: "bold",
    },
    spaceshipItem: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      marginBottom: 10,
    },
    spaceshipItemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modelName: {
      fontWeight: "bold",
      fontSize: 16,
    },
    modelType: {
      marginTop: 5,
      fontSize: 14,
    },
    availableStatus: {
      paddingTop: 10,
      color: "green",
    },
    unavailable: {
      paddingTop: 10,
      color: "red",
    },
    amount: {
      paddingTop: 10,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.spaceshipHeading}>My Spaceships</Text>
      <Divider style={{ marginTop: 30, width: "100%", marginBottom: 20 }} />
      <ScrollView>
        {spaceshipsList.length > 0 ? (
          spaceshipsList.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate("SpaceshipDetail", { item })}
              >
                <Card style={styles.spaceshipItem} key={item.id}>
                  <Card.Content>
                    <View style={styles.spaceshipItemContainer}>
                      <View>
                        <Text variant="titleLarge" style={styles.modelName}>
                          {item.title}
                        </Text>
                        <Text variant="bodyMedium" style={styles.modelType}>
                          {item.type}
                        </Text>
                        <Text style={styles.amount}>${item.price} / day</Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={
                              item.available
                                ? styles.availableStatus
                                : styles.unavailable
                            }
                          >
                            { item.available ? "Available" : "Unavailable"}
                          </Text>
                          <Text
                            style={{
                              color: "grey",
                              paddingTop: 10,
                              paddingLeft: 5,
                            }}
                          >
                            for Renting
                          </Text>
                        </View>
                      </View>

                      <Image
                        source={{ uri: item.src }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
            <Text>No Spaceships</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default List;
