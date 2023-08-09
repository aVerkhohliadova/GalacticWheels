import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import useDataContext from "../api/dataContext";

const Orders = () => {

    const { user, isLoading } = useDataContext();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Fetch user's order history here
    const orderHistory = user.orderHistory || []; // Assuming user.orderHistory is an array

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.profileHeader}>
                <Text style={styles.headerText}>Order History</Text>
            </View>
            {orderHistory.length > 0 ? (
                orderHistory.map((order, index) => (
                    <View key={index} style={styles.orderContainer}>
                        <Text style={styles.orderTitle}>Order {index + 1}</Text>
                        <Text>Order Date: {order.date}</Text>
                        <Text>Items: {order.items.join(", ")}</Text>
                    </View>
                ))
            ) : (
                <Text>No order history available.</Text>
            )}
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
    orderContainer: {
        backgroundColor: "#F5F5F5",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
});

export default Orders;
