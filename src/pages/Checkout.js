import { useEffect, useState } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	Modal,
} from 'react-native';
import useDataContext from '../api/dataContext';

export default function Cart({ route, navigation }) {
	const { user, updateUserData } = useDataContext();
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

	const confirmOrder = () => {
		const orderData = {
			items: [...user.cart],
			shippingInfo,
			paymentInfo,
		};
		console.log(orderData);
		updateUserData({
			...user,
			cart: [],
			orderHistory: orderData,
		});

		setConfirmOrderModal(false);
		setOrderSuccessModal(true);
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
						placeholder="Enter your Phone Number"
						style={styles.input}
						onChangeText={(value) => {
							setShippingInfo({
								...shippingInfo,
								phone: value,
							});
						}}
						value={shippingInfo.phone}
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
