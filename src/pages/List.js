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
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Available",
    },
    {
      id: 1,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
    },
    {
      id: 2,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Available",
    },
    {
      id: 3,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
    },
    {
      id: 4,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Available",
    },
    {
      id: 5,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
    },
    {
      id: 6,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
    },
    {
      id: 7,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Available",
    },
    {
      id: 8,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
    },
    {
      id: 9,
      photo:
        "https://media.istockphoto.com/id/1190295119/photo/unidentified-flying-object-clipping-path-included.jpg?s=612x612&w=0&k=20&c=2CGLdoTGZ1eTrsKYxlydbcj6-UaGt-hiStjW1J-LYXU=",
      modelName: "Riot",
      modelType: "Sci-Fi Spaceship",
      amount: "230.34",
      status: "Unavailable",
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
      fontSize: 18,
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
                          {item.modelName}
                        </Text>
                        <Text variant="bodyMedium" style={styles.modelType}>
                          {item.modelType}
                        </Text>
                        <Text style={styles.amount}>${item.amount} / day</Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={
                              item.status === "Available"
                                ? styles.availableStatus
                                : styles.unavailable
                            }
                          >
                            {item.status}
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
                        source={{ uri: item.photo }}
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
