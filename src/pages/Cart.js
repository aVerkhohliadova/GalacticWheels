import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import useDataContext from '../api/dataContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Cart({ navigation }) {
	const { user, updateUserData } = useDataContext();
	const { spaceships } = useDataContext();
	let [cartItems, setCartItems] = useState([]);
	let [deleteModalVisible, setDeleteModalVisible] = useState(false);
	let [editModalVisible, setEditModalVisible] = useState(false);
	let [selectedItem, setSelectedItem] = useState();
	let [editDate, setEditDate] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	useEffect(() => {
		prepareCartData();
	}, []);

	const prepareCartData = () => {
		const items = [];
		user.cart.forEach((item) => {
			if (spaceships.findIndex((i) => i.id === item.spaceshipId) > -1) {
				const spaceship = spaceships[spaceships.findIndex((i) => i.id === item.spaceshipId)];
				items.push({
					...item,
					title: spaceship.title,
					subtitle: spaceship.subtitle,
					src: spaceship.src,
					price: spaceship.price,
					totalPrice: getItemPrice(item.rent_from, item.rent_to, spaceship.price),
				});
			}
		});
		setTimeout(() => {
			setCartItems(items);
		}, 500);
	};

	const showDeleteModal = (item) => {
		setSelectedItem(item);
		setDeleteModalVisible(true);
	};

	const showEditModal = (item) => {
		const startDate = new Date(item.rent_from);
		const endDate = new Date(item.rent_to);

		// // Date issue due to timezone so adding one day
		// // Add one day to the start date
		// startDate.setDate(startDate.getDate() + 1);

		// // Add one day to the end date
		// endDate.setDate(endDate.getDate() + 1);

		setEditDate({
			startDate: startDate,
			endDate: endDate,
		});
		setSelectedItem(item);
		setEditModalVisible(true);
	};

	const onStartDatePickerChange = ({ type }, selectedDate) => {
		if (type == 'set') {
			setEditDate({
				...editDate,
				startDate: selectedDate,
			});
		}
	};

	const onEndDatePickerChange = ({ type }, selectedDate) => {
		if (type == 'set') {
			setEditDate({
				...editDate,
				endDate: selectedDate,
			});
		}
	};

	const editItem = () => {
		const newCartItems = [
			...user.cart.map((i) => {
				if (i.spaceshipId === selectedItem.spaceshipId) {
					return {
						...i,
						rent_from: editDate.startDate.toISOString().split('T')[0],
						rent_to: editDate.endDate.toISOString().split('T')[0],
					};
				}
				return i;
			}),
		];
		updateUserData({
			...user,
			cart: newCartItems,
		});
		prepareCartData();
		setEditModalVisible(false);
	};

	const removeItemFromCart = () => {
		const newCartItems = [...user.cart.filter((i) => i.spaceshipId !== selectedItem.spaceshipId)];
		updateUserData({
			...user,
			cart: newCartItems,
		});
		setDeleteModalVisible(false);
	};

	const getTotalPrice = () => {
		const totalPrice = cartItems.reduce((total, val) => {
			return total + Number(val.totalPrice);
		}, 0);
		return totalPrice.toFixed(2);
	};

	const getItemPrice = (rent_from, rent_to, price) => {
		const rentFrom = Date.parse(rent_from);
		const rentTo = Date.parse(rent_to);
		return price * Math.ceil((rentTo - rentFrom) / (1000 * 3600 * 24));
	};

	const onCheckoutPress = () => {
		navigation.navigate('Checkout');
	};

	return (
		<View style={styles.container}>
			{cartItems && cartItems.length !== 0 ? (
				<>
					<ScrollView style={styles.scrollView}>
						<View style={styles.items}>
							{cartItems.map((item) => {
								return (
									<View
										key={item.spaceshipId}
										style={{
											display: 'flex',
											flexDirection: 'row',
											flex: 1,
											borderBottomColor: '#eaeaea',
											borderBottomWidth: 1,
										}}>
										<View style={styles.item}>
											<View>
												<Image
													style={styles.item.img}
													source={{
														uri: item.src,
													}}
												/>
											</View>
											<View style={styles.item.detail}>
												<View
													style={{
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<View style={{ flex: 1 }}>
														<Text numberOfLines={1} style={styles.item.itemName}>
															{item.title}
														</Text>
														<Text style={styles.item.itemSub}>{item.subtitle}</Text>
													</View>
												</View>
												<View
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
													}}>
													<Text style={styles.date}>{item.rent_from}</Text>
													<Text style={styles.dateLabel}>To</Text>
													<Text style={styles.date}>{item.rent_to}</Text>
												</View>
												<View>
													<Text style={styles.item.price}>$ {item.totalPrice}</Text>
												</View>
											</View>
										</View>
										<View>
											<View style={styles.item.actionBtns}>
												<TouchableOpacity
													onPress={() => {
														showEditModal(item);
													}}>
													<FontAwesome name="edit" size={24} color="green" />
												</TouchableOpacity>
											</View>
											<View style={styles.item.actionBtns}>
												<TouchableOpacity
													onPress={() => {
														showDeleteModal(item);
													}}>
													<FontAwesome name="trash" size={24} color="red" />
												</TouchableOpacity>
											</View>
										</View>
									</View>
								);
							})}
						</View>
					</ScrollView>
					<View style={styles.bottomView}>
						<View>
							<Text style={styles.subTotal}>$ {getTotalPrice()}</Text>
						</View>
						<View>
							<TouchableOpacity style={styles.checkouBtn} onPress={onCheckoutPress}>
								<Text style={styles.checkouBtn.text}>Checkout</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			) : (
				<View style={styles.centeredView}>
					<MaterialCommunityIcons name="cart-remove" size={100} color="black" />
					<Text>No item in cart.</Text>
				</View>
			)}

			{/* Delete modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={deleteModalVisible}
				onRequestClose={() => {
					setDeleteModalVisible(!deleteModalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalView.modalHeader}>{'Delete Item'}</Text>
						<View style={styles.modalView.modalBody}>
							<Text>Are you sure you wnat to delete item {selectedItem?.title}?</Text>
						</View>
						<View style={styles.modalView.buttonDiv}>
							<TouchableOpacity style={styles.modalView.button} onPress={removeItemFromCart}>
								<Text style={styles.modalView.button.textStyle}>YES</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalView.button, styles.modalView.buttonCancel]}
								onPress={() => {
									setDeleteModalVisible(false);
								}}>
								<Text style={styles.modalView.button.textStyle}>NO</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* edit modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={editModalVisible}
				onRequestClose={() => {
					setEditModalVisible(!editModalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalView.modalHeader}>{selectedItem?.title}</Text>
						<View style={styles.modalView.modalBody}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<Text style={{ minWidth: 40 }}>From</Text>
								<DateTimePicker value={editDate.startDate} onChange={onStartDatePickerChange} />
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									marginTop: 10,
								}}>
								<Text style={{ minWidth: 40 }}>To</Text>
								<DateTimePicker value={editDate.endDate} onChange={onEndDatePickerChange} />
							</View>
						</View>
						<View style={styles.modalView.buttonDiv}>
							<TouchableOpacity style={styles.modalView.button} onPress={editItem}>
								<Text style={styles.modalView.button.textStyle}>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalView.button, styles.modalView.buttonCancel]}
								onPress={() => {
									setEditModalVisible(false);
								}}>
								<Text style={styles.modalView.button.textStyle}>Cancel</Text>
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
	scrollView: {
		marginBottom: 80,
	},
	items: {
		backgroundColor: '#fff',
		borderRadius: 12,
	},
	dateLabel: {
		marginStart: 5,
		marginEnd: 5,
	},
	date: {
		marginTop: 4,
		borderWidth: 1,
		padding: 2,
		minWidth: 50,
	},
	item: {
		flex: 1,
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		detail: {
			flex: 1,
			marginLeft: 20,
			display: 'flex',
			justifyContent: 'space-between',
		},
		img: {
			width: 80,
			height: 80,
			borderRadius: 12,
			resizeMode: 'cover',
		},
		quantityDiv: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
		},
		priceQuantity: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		itemName: {
			fontSize: 18,
			fontWeight: 'bold',
			marginRight: 10,
		},
		itemSub: {
			marginTop: 4,
			fontSize: 14,
			color: 'grey',
		},
		price: {
			marginTop: 8,
			fontWeight: 'bold',
			fontSize: 20,
		},
		quantity: {
			marginLeft: 10,
			marginRight: 10,
			fontSize: 18,
			fontWeight: 'bold',
		},
		actionBtns: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 8,
			flex: 1,
		},
	},
	input: {
		height: 30,
		borderWidth: 1,
		paddingStart: 10,
		paddingEnd: 10,
		paddingTop: 5,
		paddingBottom: 5,
	},
	bottomView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
		backgroundColor: 'white',
	},
	checkouBtn: {
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
		fontSize: 24,
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
			width: 80,
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
