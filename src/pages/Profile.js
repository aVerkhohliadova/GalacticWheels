import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, TouchableOpacity, SafeAreaView } from "react-native";
import useDataContext from "../api/dataContext";
import Logo from "../components/Logo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    color: "#1E90FF",
  },
  profileHeader: {
    marginBottom: 40,
    marginTop: -120,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
    // marginRight: 8,
    minWidth: 150,
  },
  infoValue: {
    flex: 1,
  },
  viewOrderHistoryButton: {
    marginTop: 30,
    backgroundColor: "#123A65",
    padding: 12,
    borderRadius: 20,
    width: "100%",
  },
  updateProfileButton: {
    marginTop: 30,
    backgroundColor: "#5984b3",
    padding: 12,
    borderRadius: 20,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  } else {
    if (phoneNumber.length === 10) {
      // Default format: ###-###-####
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length === 11) {
      // Format: +#-###-###-####
      return `+${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    } else if (phoneNumber.length === 12) {
      // Format: +##-###-###-####
      return `+${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
    } else if (phoneNumber.length === 13) {
      // Format: +###-###-###-####
      return `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}-${phoneNumber.slice(9)}`;
    } else if (phoneNumber.length >= 14) {
      // Format: +####-###-###-####
      return `+${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}-${phoneNumber.slice(10)}`;
    } else {
      return phoneNumber; // If none of the conditions match, return the original input
    }
  }
};

const Profile = ({ navigation }) => {
  const { user, isLoading } = useDataContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo />
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <View style={styles.profileHeader}>
          <Text style={styles.headerText}>Welcome, {user.name}!</Text>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone number</Text>
            <Text style={styles.infoValue}>{formatPhoneNumber(user.phone)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewOrderHistoryButton}
          onPress={() => navigation.navigate("Orders")}>
          <Text style={styles.buttonText}>VIEW ORDER HISTORY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateProfileButton}
          onPress={() => navigation.navigate("Update Personal Information")}>
          <Text style={styles.buttonText}>UPDATE PERSONAL INFORMATION</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Profile;
