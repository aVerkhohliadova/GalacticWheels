import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import useDataContext from '../api/dataContext';

export default function Cart() {
	const { user, setUser, updateUserData } = useDataContext();
	let [deleteModalVisible, setDeleteModalVisible] = useState(false);
	let [deleteItem, setDeleteItem] = useState();

	useEffect(() => {}, []);

	const showDeleteModal = (item) => {
		setDeleteItem(item);
		setDeleteModalVisible(true);
	};

	const removeItemFromCart = () => {
		const newCartItems = [...user.cart.filter((i) => i.product.id !== deleteItem.id)];
		updateUserData({
			...user,
			cart: newCartItems,
		});
		setDeleteModalVisible(false);
	};

	const getTotalPrice = () => {
		const totalPrice = user.cart.reduce((total, val) => {
			return total + Number(val.product.price);
		}, 0);
		return totalPrice.toFixed(2);
	};

	return (
		<View style={styles.container}>
			{user && user.cart && user.cart.length !== 0 ? (
				<>
					<ScrollView style={styles.scrollView}>
						<View style={styles.items}>
							{user.cart.map((item) => {
								return (
									<View key={item.product.id} style={styles.item}>
										<View>
											<Image
												style={styles.item.img}
												source={{
													uri: item.product.imageUrl,
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
														{item.product.name}
													</Text>
													<Text style={styles.item.itemSub}>White</Text>
												</View>
												<TouchableOpacity
													onPress={() => {
														showDeleteModal(item.product);
													}}>
													<Entypo name="cross" size={24} color="red" />
												</TouchableOpacity>
											</View>
											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'space-between',
													alignItems: 'center'
												}}>
												<View>
													<Text style={styles.dateLabel}>From</Text>
													<Text style={styles.date}>{item.startDate}</Text>
												</View>
												<View>
													<Text style={styles.dateLabel}>To</Text>
													<Text style={styles.date}>{item.startDate}</Text>
												</View>
											</View>
											<View>
												<Text style={styles.item.price}>$ {item.product.price}</Text>
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
							<TouchableOpacity style={styles.checkouBtn}>
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
							<Text>Are you sure you wnat to delete item {deleteItem?.name}?</Text>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
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
		minWidth: 50,
	},
	date: {
		marginTop: 4,
		borderWidth: 1,
		padding: 2,
	},
	item: {
		padding: 16,
		borderBottomColor: '#eaeaea',
		borderBottomWidth: 1,
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
			width: 100,
			height: 100,
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
			marginTop: 5,
			fontWeight: 'bold',
			fontSize: 20,
			textAlign: 'right'
		},
		quantity: {
			marginLeft: 10,
			marginRight: 10,
			fontSize: 18,
			fontWeight: 'bold',
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
