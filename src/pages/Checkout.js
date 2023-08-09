import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Modal } from 'react-native';

export default function Cart() {
	const deliveryFee = 5;
	let [cartItems, setCartItems] = useState([]);
	let [confirmOrderModal, setConfirmOrderModal] = useState(false);
	let [orderSuccessModal, setOrderSuccessModal] = useState(false);
	let [address, setAddress] = useState('');
	let [name, setName] = useState('');
	let [phone, setPhone] = useState('');

	useEffect(() => {
		// TODO: get cart items
		setCartItems([
			{
				id: '1',
				name: '2003 Formula',
				price: '1999.99',
				quantity: '1',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
			{
				id: '2',
				name: '2003 Formula 2',
				price: '1999.99',
				quantity: '1',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
		]);
	}, []);

	const getSubTotalPrice = () => {
		const price = cartItems.reduce((total, val) => {
			return total + Number(val.price);
		}, 0);
		return price.toFixed(2);
	};

	const getTotalPrice = () => {
		return (Number(getSubTotalPrice()) + deliveryFee).toFixed(2);
	};

	const confirmOrder = () => {
		const orderData = {
			items: [...cartItems],
			name,
			phone,
			address,
		};
		console.log(orderData);
		// TODO: call api to confirm order

		setConfirmOrderModal(false)
		setOrderSuccessModal(true)
	};

	const onHomePressed = () => {
		// TODO: redirect to home
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
						onChangeText={setName}
						value={name}
					/>
				</View>
				<View style={{ marginTop: 10 }}>
					<Text>Phone</Text>
					<TextInput
						placeholder="Enter your Phone Number"
						style={styles.input}
						onChangeText={setPhone}
						value={phone}
					/>
				</View>
				<View style={{ marginTop: 10 }}>
					<Text>Address</Text>
					<TextInput
						placeholder="Enter your Address"
						style={styles.input}
						onChangeText={setAddress}
						value={address}
					/>
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.subTotal}>Payment</Text>
				<Text style={{ marginTop: 10 }}>Type</Text>
				<TextInput style={styles.inputDisabled} value={'Pay At Door'} editable={false} />
			</View>
			<View style={styles.bottomView}>
				<View style={styles.summary}>
					<View style={styles.summaryRow}>
						<Text>Sub Total: </Text>
						<Text style={styles.subTotal}>$ {getSubTotalPrice()}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text>Delivery Fee: </Text>
						<Text style={styles.subTotal}>$ {deliveryFee.toFixed(2)}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={{ fontWeight: 'bold' }}>Total: </Text>
						<Text style={styles.subTotal}>$ {getTotalPrice()}</Text>
					</View>
				</View>
				<View style={{ padding: 20 }}>
					<TouchableOpacity
						style={styles.orderBtn}
						onPress={() => {
							setConfirmOrderModal(true);
						}}>
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
		padding: 24,
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
