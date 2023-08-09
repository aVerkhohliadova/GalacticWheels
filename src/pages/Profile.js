import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import useDataContext from "../api/dataContext";

const Profile = () => {
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
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

            <View style={styles.profileHeader}>
                <Text style={styles.headerText}>Welcome, {user.name}!</Text>
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Phone number</Text>
                    <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        alignItems: "center",
        marginTop: StatusBar.currentHeight + 100,
        marginBottom: 40,
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
        marginBottom: 8,
    },
    infoLabel: {
        fontWeight: "bold",
        marginRight: 8,
        minWidth: 150,
    },
    infoValue: {
        flex: 1,
    },
});

export default Profile;
