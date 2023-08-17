import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Image, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import useDataContext from "../api/dataContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

    orderCard: {
        marginBottom: 20,
        borderRadius: 10,
        elevation: 3,
    },
    itemContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flexDirection: "column",
        marginBottom: 5,
    },
    orderDate: {
        fontWeight: "bold",
    },
    modelName: {
        width: 200,
        fontSize: 16,
    },
    modelType: {
        marginTop: 5,
        fontSize: 14,
        width: 200,
    },
    amount: {
        paddingTop: 10,
        fontWeight: "bold",
    },
    imageContainer: {
        marginLeft: 10,
    },
    itemPhoto: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const Orders = () => {

    const { user, isLoading, spaceships } = useDataContext();

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
            <ScrollView>
                {orderHistory.length > 0 ? (
                    orderHistory.map((order, index) => {
                        let orderTotalPrice = 0; // Initialize the total price for the order

                        return (
                            <Card key={index} style={styles.orderCard}>
                                <Card.Content>
                                    <Text style={styles.orderDate}>Order Date: {formatDate(order.date)}</Text>
                                    {order.items.map((item, itemIndex) => {
                                        const spaceship = spaceships.find(s => s.id === item.spaceshipId);
                                        orderTotalPrice += spaceship ? spaceship.price : 0; // Add to the total price
                                        return (
                                            <View key={itemIndex} style={styles.itemContainer}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.modelName}>{spaceship ? spaceship.title : 'Unknown Title'}</Text>
                                                    <Text style={styles.modelType}>{spaceship ? spaceship.type : ""}</Text>
                                                    <Text style={styles.amount}>${spaceship ? spaceship.price : ""}</Text>
                                                </View>
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: spaceship ? spaceship.src : "" }}
                                                        style={styles.itemPhoto}
                                                    />
                                                </View>
                                            </View>
                                        );
                                    })}
                                    <Text style={styles.amount}>Total price: ${(orderTotalPrice*1.13).toFixed(2)}</Text>
                                </Card.Content>
                            </Card>
                        );
                    })
                ) : (
                    <View style={styles.centeredContainer}>
                        <Text>No order history available.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Orders;
