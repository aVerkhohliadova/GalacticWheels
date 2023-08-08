import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Cart() {
	let [cartItems, setCartItems] = useState([]);

	useEffect(() => {
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
			{
				id: '3',
				name: '2003 Formula 3',
				price: '3000.00',
				quantity: '2',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
			{
				id: '4',
				name: '2003 Formula 3',
				price: '3000.00',
				quantity: '2',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
			{
				id: '5',
				name: '2003 Formula 3',
				price: '3000.00',
				quantity: '2',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
			{
				id: '6',
				name: '2003 Formula 3',
				price: '3000.00',
				quantity: '2',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
			{
				id: '7',
				name: '2003 Formula 3',
				price: '3000.00',
				quantity: '2',
				imageUrl:
					'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
			},
		]);
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.items}>
					{cartItems.map((item) => {
						return (
							<View key={item.id} style={styles.item}>
								<View>
									<Image
										style={styles.item.img}
										source={{
											uri: item.imageUrl,
										}}
									/>
								</View>
								<View style={styles.item.detail}>
									<View>
										<Text style={styles.item.itemName}>{item.name}</Text>
										<Text style={styles.item.itemSub}>White</Text>
									</View>
									<View style={styles.item.priceQuantity}>
										<Text style={styles.item.price}>$ {item.price}</Text>
										<View style={styles.item.quantityDiv}>
											<TouchableOpacity>
												<View style={styles.item.roundBtn}>
													<FontAwesome name="minus" size={14} color="black" />
												</View>
											</TouchableOpacity>
											<Text style={styles.item.quantity}>{item.quantity}</Text>
											<TouchableOpacity>
												<View style={styles.item.roundBtn}>
													<FontAwesome name="plus" size={14} color="black" />
												</View>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<View>
					<Text style={styles.subTotal}>
						${' '}
						{cartItems.reduce((total, val) => {
							return total + Number(val.price);
						}, 0)}
					</Text>
				</View>
				<View>
					<TouchableOpacity style={styles.checkouBtn}>
						<Text style={styles.checkouBtn.text}>Checkout</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	item: {
		padding: 16,
		borderBottomColor: '#eaeaea',
		borderBottomWidth: 1,
		display: 'flex',
		flexDirection: 'row',
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
		},
		itemSub: {
			marginTop: 4,
			fontSize: 14,
			color: 'grey',
		},
		price: {
			fontWeight: 'bold',
			fontSize: 20,
		},
		roundBtn: {
			width: 30,
			height: 30,
			borderWidth: 1,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 15,
		},
		quantity: {
			marginLeft: 10,
			marginRight: 10,
			fontSize: 18,
			fontWeight: 'bold',
		},
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
});
