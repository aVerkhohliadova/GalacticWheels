import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import useDataContext from "../api/dataContext";
import Logo from "../components/Logo";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -120,
        width: "80%",
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: 200,
        margin: 10,
    },
    updateButton: {
        marginTop: 10,
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
    }
    console.log(phoneNumber.length)

    if (phoneNumber.startsWith("+")) {
      // Format for international number
      if (phoneNumber.length === 12) {
        // Format: +#-###-###-####
        return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
      } else if (phoneNumber.length === 13) {
        // Format: +##-###-###-####
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
      } else if (phoneNumber.length === 14) {
        // Format: +###-###-###-####
        return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}-${phoneNumber.slice(9)}`;
      } else if (phoneNumber.length === 15) {
        // Format: +####-###-###-####
        return `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}-${phoneNumber.slice(10)}`;
      } else {
        return phoneNumber; // If none of the conditions match, return the original input
      }
    } else {
      // Format for local number
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

const UpdateProfile = ({ navigation }) => {
    const { user, updateUserData, updatePassword } = useDataContext();

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState(""); // New password state
    const [error, setError] = useState("");
    const [editingPhone, setEditingPhone] = useState(false);

    const handleUpdate = async () => {
        setError("");
        try {
            updateUserData({ name, phone, email });
            // Update password if newPassword is provided
            if (newPassword) {
                if (newPassword.length < 6) {
                    setError("Please enter a (min 6 letter) password");
                    return;
                }
                try {
                    await updatePassword(newPassword);
                    setNewPassword(""); // Reset newPassword state
                } catch (error) {
                    console.error("Error updating password:", error.message);
                }
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Logo />
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={`Name`}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Phone`}
                    value={editingPhone ? phone : formatPhoneNumber(phone)}
                    onChangeText={setPhone}
                    onFocus={() => setEditingPhone(true)} // Set editingPhone to true when editing starts
                    onBlur={() => setEditingPhone(false)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`Email`}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder={`New Password`}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <Text style={{ fontSize: 12, fontWeight: "100", marginTop: 20 }}>
                    {error}
                </Text>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UpdateProfile;
