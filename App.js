import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Component from './Component';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
	const [toggleState, setToggleState] = useState(1);
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

/*	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem('@storage_key', JSON.stringify(value));
		} catch (err) {
			console.log(err);
		}
	};
*/
	function handleClick(id) {
		setData((prevState) =>
			prevState.map((element) => ({
				...element,
				isFavorite:
					element.id === id ? !element.isFavorite : element.isFavorite,
			}))
		);
	}

	useEffect(async () => {
		try {
	/*		const storedData = await AsyncStorage.getItem('@storage_key');
			if (storedData) {
				setData(JSON.parse(storedData));
			} else {
	*/			fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
					.then((response) => response.json())
					.then((json) => {
						const fetchedData = json.map((element) => ({
							...element,
							isFavorite: false,
						}));
						setData(fetchedData);
	//					storeData(fetchedData);
					})
					.catch((error) => console.error(error));
	//		}
		} finally {
			setLoading(false);
		}
	}, []);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.tab}>
				<TouchableOpacity
					style={[styles.Tabs, toggleState === 1 && styles.tabActive]}
					onPress={() => toggleTab(1)}>
					<Text style={styles.text}>Photos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.Tabs, toggleState === 2 && styles.tabActive]}
					onPress={() => toggleTab(2)}>
					<Text style={styles.text}>Likes</Text>
				</TouchableOpacity>
			</View>
			{toggleState === 1 ? (
				<Component
					items={data}
					isLoaded={isLoading}
					handleClick={handleClick}
				/>
			) : (
				<Component
					items={data.filter((element) => element.isFavorite === true)}
					isLoaded={isLoading}
					handleClick={handleClick}
				/>
			)}
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 30,
		backgroundColor: '#449CA9',
	},
	tab: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 20,
		borderWidth: 4,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: '#f0f8ff',
	},
	Tabs: {
		width: Dimensions.get('window').width / 3.5,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	tabActive: {
		backgroundColor: '#F6960B',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
});
