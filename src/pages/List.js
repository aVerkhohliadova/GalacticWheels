import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import useDataContext from "../api/dataContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
  addedToCart: {
    paddingTop: 10,
    color: "#ff4500",
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

function List({ navigation }) {
  const { user, spaceships } = useDataContext();
  return (
    <View style={styles.container}>
      <ScrollView>
        {spaceships.length > 0 ? (
          spaceships.map((item) => {
            const isAdded = !!user.cart.find(
              (cartItem) => cartItem.spaceshipId === item.id
            );

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
                                ? isAdded
                                  ? styles.addedToCart
                                  : styles.availableStatus
                                : styles.unavailable
                            }
                          >
                            {item.available
                              ? isAdded
                                ? "Added to cart"
                                : "Available"
                              : "Unavailable"}
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
