import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Text,
	View,
	Image,
	Pressable,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

function Component({ items, isLoaded, handleClick }) {
	const [value, setValue] = useState('');
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		setFiltered(
			value === ''
				? items
				: items.filter((element) =>
						element.title.toLowerCase().includes(value.toLowerCase())
				  )
		);
	}, [items, value]);

	return (
		<View style={{ flex: 1, padding: 2 }}>
			{isLoaded ? (
				<Text>Loading...</Text>
			) : (
				<View style={styles.view_content}>
					<SearchBar
						containerStyle={{
							borderTopLeftRadius: 12,
							borderTopRightRadius: 12,
							borderBottomLeftRadius: 8,
							borderBottomRightRadius: 8,
						}}
						round
						searchIcon={{ size: 24 }}
						onChangeText={(event) => setValue(event)}
						placeholder='Type Here...'
						value={value}
					/>
					<FlatList
						style={{ margin: 2 }}
						data={filtered}
						keyExtractor={({ id }, index) => id}
						renderItem={({ item }) => (
							<View style={styles.view_block}>
								<Image
									source={{ uri: item.thumbnailUrl }}
									style={{ width: 100, height: 100, margin: 5 }}
								/>
								<Text style={styles.view_text}>{item.title}</Text>
								<Pressable
									style={{ margin: 10 }}
									onPress={() => handleClick(item.id)}>
									<MaterialCommunityIcons
										name={item.isFavorite ? 'heart' : 'heart-outline'}
										size={32}
										color={item.isFavorite ? 'red' : 'black'}
									/>
								</Pressable>
							</View>
						)}
					/>
				</View>
			)}
		</View>
	);
}

export default Component;

const styles = StyleSheet.create({
	view_content: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width / 1.1,
		marginTop: 15,
		marginBottom: 50,
		borderWidth: 4,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: '#C6E0F2',
	},
	view_text: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 15,
		textAlign: 'center',
		flexWrap: 'wrap',
	},
	view_block: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'nowrap',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
});
