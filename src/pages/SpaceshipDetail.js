import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const SpaceshipDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const goBackToList = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: 380,
      position: "relative",
    },
    modelName: {
      fontSize: 35,
      fontWeight: "bold",
      marginTop: 20,
    },
    modelType: {
      fontSize: 18,
      marginTop: 5,
    },
    amount: {
      fontSize: 16,
      marginTop: 10,
    },
    status: {
      fontSize: 16,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      color: "green",
    },
    unavailable: {
      fontSize: 16,
      marginTop: 10,
      color: "red",
      marginLeft: 10,
      marginRight: 10,
    },
    addButton: {
      marginTop: 20,
      backgroundColor: "#123A65",
      padding: 12,
      borderRadius: 20,
      width: "100%",
    },
    backButtonText: {
      textAlign: "center",
      color: "white",
    },
    backButton: {
      position: "absolute",
      marginTop: 70,
      marginLeft: 15,
      fontSize: 30,
      backgroundColor: "#AFB4BE",
      padding: 14,
      borderRadius: "50%",
    },
    itemDetailHeadingContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    availabilityStatus: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cadText: {
      fontWeight: "bold",
      color: "#123A65",
    },
  });

  return (
    <>
      <View>
        <Image source={{ uri: item.photo }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={goBackToList}>
          <Icon name="arrow-left" size={25} color="#123A65" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.itemDetailHeadingContainer}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={styles.modelName}>{item.modelName}</Text>
            <Text style={styles.modelType}>{item.modelType}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="star" size={30} color="#FFD700" />
            <Text style={{ marginLeft: 5, fontSize: 20, fontWeight: "bold" }}>
              4.5
            </Text>
          </View>
        </View>
        <Text
          style={
            item.status == "Available" ? styles.status : styles.unavailable
          }
        >
          {item.status}
        </Text>

        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
            Description
          </Text>
          <Text style={{ marginTop: 5 }}>
            The Starseeker I is a sleek and nimble spaceship designed for deep
            space exploration. Equipped with advanced sensors and a spacious
            observation deck, it's perfect for scientists and adventurers
            seeking to uncover the mysteries of the universe. The ship's modular
            design allows for easy customization, making it a popular choice
            among explorers.
          </Text>
        </View>
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rental Price</Text>
          <Text style={{ marginTop: 5, fontWeight: "bold", color: "#123A65" }}>
            <Text style={styles.cadText}>CAD $</Text> {item.amount}
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.backButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SpaceshipDetail;
