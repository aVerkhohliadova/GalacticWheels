import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDataContext from '../api/dataContext';

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginRight: 10,
	},
	image: {
		width: '100%',
		height: 380,
		position: 'relative',
	},
	modelName: {
		fontSize: 25,
		fontWeight: 'bold',
		marginTop: 20,
		width: 200,
	},
	modelType: {
		fontSize: 18,
		marginTop: 5,
		width: 200,
	},
	amount: {
		fontSize: 16,
		marginTop: 10,
	},
	status: {
		fontSize: 16,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		color: 'green',
	},
	unavailable: {
		fontSize: 16,
		marginTop: 10,
		color: 'red',
		marginLeft: 10,
		marginRight: 10,
	},
	addButton: {
		marginTop: 20,
		backgroundColor: '#123A65',
		padding: 12,
		borderRadius: 20,
		width: '100%',
	},
	backButtonText: {
		textAlign: 'center',
		color: 'white',
	},
	backButton: {
		position: 'absolute',
		marginTop: 70,
		marginLeft: 15,
		fontSize: 30,
		backgroundColor: '#AFB4BE',
		height: 40,
		width: 40,
		textAlign: 'center',
		borderRadius: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemDetailHeadingContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	availabilityStatus: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cadText: {
		fontWeight: 'bold',
		color: '#123A65',
	},
});

function SpaceshipDetail({ route }) {
	const { item } = route.params;
	const { user, updateUserData } = useDataContext();

	const navigation = useNavigation();

	const goBackToList = () => {
		navigation.goBack();
	};

	const getMonth = (date) => {
		const mth = date.getMonth() + 1;
		if (mth < 10) {
			return `0${mth}`;
		}
		return mth;
	};

	const addToCart = () => {
		const date = new Date();
		let startDate = `${date.getFullYear()}-${getMonth(date)}-${date.getDate()}`;
		let endDate = `${date.getFullYear()}-${getMonth(date)}-${date.getDate() + 1}`;
		updateUserData({
			cart: [
				...(user.cart || []),
				{ spaceshipId: item.id, rent_from: startDate, rent_to: endDate },
			],
		});
	};

	return (
		<>
			<StatusBar barStyle="light-content" />

			<View>
				<Image source={{ uri: item.src }} style={styles.image} />
				<TouchableOpacity style={styles.backButton} onPress={goBackToList}>
					<Text style={{ fontSize: 30, color: '#123A65' }}>&#8249;</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<View style={styles.itemDetailHeadingContainer}>
					<View style={{ marginLeft: 10, marginRight: 10 }}>
						<Text style={styles.modelName}>{item.title}</Text>
						<Text style={styles.modelType}>{item.type}</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<Icon name="star" size={30} color="#FFD700" />
						<Text style={{ marginLeft: 5, fontSize: 20, fontWeight: 'bold' }}>{item.rating}</Text>
					</View>
				</View>
				<Text style={item.available ? styles.status : styles.unavailable}>{item.status}</Text>

				<View style={styles.container}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>Description</Text>
					<Text style={{ marginTop: 5 }}>{item.description}</Text>
				</View>
				<View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rental Price</Text>
					<Text style={{ marginTop: 5, fontWeight: 'bold', color: '#123A65' }}>
						<Text style={styles.cadText}>CAD $ {item.price}</Text> {item.amount}
					</Text>
				</View>

				{item.available && (
					<TouchableOpacity style={styles.addButton} onPress={addToCart}>
						<Text style={styles.backButtonText}>ADD TO CART</Text>
					</TouchableOpacity>
				)}
			</View>
		</>
	);
}

export default SpaceshipDetail;
