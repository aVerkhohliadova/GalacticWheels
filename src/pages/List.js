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

const List = ({ navigation }) => {
  const { spaceships } = useDataContext();

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
      width: 200,
      fontSize: 16,
    },
    modelType: {
      marginTop: 5,
      fontSize: 14,
      width: 200,
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
        {spaceships.length > 0 ? (
          spaceships.map((item) => {
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
                            {item.available ? "Available" : "Unavailable"}
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
