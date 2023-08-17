import { useEffect, useState } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	Modal,
	ScrollView,
} from 'react-native';
import useDataContext from '../api/dataContext';
import Order from '../DB/Order';

const formatPhoneNumber = (phoneNumber) => {
	if (!phoneNumber) {
		return "";
	}
	// console.log(phoneNumber.length)

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

export default function Cart({ route, navigation }) {
	const { user, updateUserData } = useDataContext();
	const [editingPhone, setEditingPhone] = useState(false);
	let [confirmOrderModal, setConfirmOrderModal] = useState(false);
	let [error, setError] = useState(false);
	let [orderSuccessModal, setOrderSuccessModal] = useState(false);
	let [shippingInfo, setShippingInfo] = useState({
		name: '',
		phone: '',
		address: '',
	});
	let [paymentInfo, setPaymentInfo] = useState({
		cardNo: '',
		code: '',
		expiryDate: '',
	});

	const { subTotal } = route.params;

	useEffect(() => {
		setShippingInfo({
			name: user.name,
			phone: user.phone,
			address: '',
		});
	}, []);

	const getTotalPrice = () => {
		return (Number(subTotal) * 1.13).toFixed(2);
	};

	const confirmOrder = async () => {
		const orderData = {
			items: [...user.cart],
			shippingInfo,
			paymentInfo,
		};

		const newOrder = new Order({
			date: new Date().toISOString(),
			items: orderData.items,
			shippingInfo: orderData.shippingInfo,
			paymentInfo: orderData.paymentInfo,
		});

		const serializedOrder = {
			date: newOrder.date,
			items: newOrder.items,
			shippingInfo: { ...newOrder.shippingInfo },
			paymentInfo: { ...newOrder.paymentInfo },
		};

		try {
			// Check if orderHistory is an array
			const orderHistoryArray = Array.isArray(user.orderHistory)
				? user.orderHistory
				: [];

			// Store serializedOrder in Firestore document
			await updateUserData({
				...user,
				cart: [],
				orderHistory: [...orderHistoryArray, serializedOrder],
			});

			setConfirmOrderModal(false);
			setOrderSuccessModal(true);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	const openOrderConfirmModal = () => {
		setError(false);
		if (
			shippingInfo.name === '' ||
			shippingInfo.phone === '' ||
			shippingInfo.address === '' ||
			paymentInfo.cardNo === '' ||
			paymentInfo.expiryDate === '' ||
			paymentInfo.code === ''
		) {
			setError(true);
			return;
		}
		setConfirmOrderModal(true);
	};

	const onHomePressed = () => {
		navigation.navigate('Home');
	};

	const handlePhoneChange = (input) => {
		// Remove non-digit characters from the input
		const numericInput = input.replace(/\D/g, "");
		// setPhone(numericInput);
		setShippingInfo({
			...shippingInfo,
			phone: numericInput,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={styles.subTotal}>Shipping Information</Text>
				<View style={{ marginTop: 10 }}>
					<Text>Name</Text>
					<TextInput
						placeholder="Enter your Full Name"
						style={styles.input}
						onChangeText={(value) => {
							setShippingInfo({
								...shippingInfo,
								name: value,
							});
						}}
						value={shippingInfo.name}
					/>
				</View>
				<View style={{ marginTop: 10 }}>
					<Text>Phone</Text>
					<TextInput
						style={styles.input}
						placeholder={"Enter your Phone Number"}
						value={editingPhone ? shippingInfo.phone : formatPhoneNumber(shippingInfo.phone)}
						onChangeText={handlePhoneChange}
						onFocus={() => setEditingPhone(true)} // Set editingPhone to true when editing starts
						onBlur={() => setEditingPhone(false)}
					/>
				</View>
				<View style={{ marginTop: 10 }}>
					<Text>Address</Text>
					<TextInput
						placeholder="Enter your Address"
						style={styles.input}
						onChangeText={(value) => {
							setShippingInfo({
								...shippingInfo,
								address: value,
							});
						}}
						value={shippingInfo.address}
					/>
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.subTotal}>Payment</Text>
				<View style={{ marginTop: 10 }}>
					<Text>Card Number</Text>
					<TextInput
						placeholder="Card Number"
						style={styles.input}
						onChangeText={(value) => {
							setPaymentInfo({
								...paymentInfo,
								cardNo: value,
							});
						}}
						value={paymentInfo.cardNo}
					/>
				</View>
				<View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>
					<View style={{ flex: 1, marginRight: 20 }}>
						<Text>Code</Text>
						<TextInput
							placeholder="Code"
							style={styles.input}
							onChangeText={(value) => {
								setPaymentInfo({
									...paymentInfo,
									code: value,
								});
							}}
							value={paymentInfo.code}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Text>Type</Text>
						<TextInput
							placeholder="Expiry Date"
							style={styles.input}
							onChangeText={(value) => {
								setPaymentInfo({
									...paymentInfo,
									expiryDate: value,
								});
							}}
							value={paymentInfo.expiryDate}
						/>
					</View>
				</View>
			</View>
			{error && <Text style={{ fontSize: 12, color: 'red' }}>Please fill all the boxes.</Text>}
			<View style={styles.bottomView}>
				<View style={styles.summary}>
					<View style={styles.summaryRow}>
						<Text>Sub Total: </Text>
						<Text style={styles.subTotal}>$ {subTotal}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text>HST: </Text>
						<Text style={styles.subTotal}>$ {(Number(subTotal) * 0.13).toFixed(2)}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={{ fontWeight: 'bold' }}>Total: </Text>
						<Text style={styles.subTotal}>$ {getTotalPrice()}</Text>
					</View>
				</View>
				<View style={{ padding: 20 }}>
					<TouchableOpacity style={styles.orderBtn} onPress={openOrderConfirmModal}>
						<Text style={styles.orderBtn.text}>Order</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* order confirm modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={confirmOrderModal}
				onRequestClose={() => {
					setConfirmOrderModal(!confirmOrderModal);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalView.modalHeader}>{'Confirm Order!'}</Text>
						<View style={styles.modalView.modalBody}>
							<Text>Are you sure you want to confirm this order?</Text>
						</View>
						<View style={styles.modalView.buttonDiv}>
							<TouchableOpacity style={styles.modalView.button} onPress={confirmOrder}>
								<Text style={styles.modalView.button.textStyle}>YES</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalView.button, styles.modalView.buttonCancel]}
								onPress={() => {
									setConfirmOrderModal(false);
								}}>
								<Text style={styles.modalView.button.textStyle}>NO</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			{/* order success modal */}
			<Modal animationType="slide" transparent={true} visible={orderSuccessModal}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalView.modalHeader}>{'Success'}</Text>
						<View style={styles.modalView.modalBody}>
							<Text>Your order has been placed.Thank you for shopping with us.</Text>
						</View>
						<View style={styles.modalView.buttonDiv}>
							<TouchableOpacity style={styles.modalView.button} onPress={onHomePressed}>
								<Text style={styles.modalView.button.textStyle}>Back to Home</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#eaeaea',
	},
	box: {
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		marginTop: 10,
	},
	inputDisabled: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		marginTop: 10,
		opacity: 0.5,
	},
	summary: {
		borderBottomWidth: 2,
		borderBottomColor: '#eaeaea',
		padding: 24,
	},
	summaryRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 5,
	},
	bottomView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
	},
	orderBtn: {
		padding: 15,
		minWidth: 150,
		backgroundColor: 'black',
		borderRadius: 24,
		text: {
			color: 'white',
			fontWeight: 'bold',
			textAlign: 'center',
		},
	},
	subTotal: {
		fontWeight: 'bold',
		fontSize: 22,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		modalHeader: {
			fontSize: 18,
			fontWeight: 600,
		},
		modalBody: {
			padding: 20,
			box: {
				padding: 8,
				text: {
					padding: 10,
					textAlign: 'center',
				},
			},
		},
		buttonDiv: {
			display: 'flex',
			flexDirection: 'row',
			marginTop: 20,
		},
		button: {
			borderRadius: 20,
			padding: 10,
			elevation: 2,
			backgroundColor: '#2196F3',
			minWidth: 80,
			textStyle: {
				color: 'white',
				textAlign: 'center',
				fontWeight: 600,
			},
		},
		buttonCancel: {
			marginLeft: 10,
			backgroundColor: 'red',
		},
	},
});
