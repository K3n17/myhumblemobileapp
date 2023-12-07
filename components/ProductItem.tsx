import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
const ProductItem: React.FC<{
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  mode: string;
  isGridView?: boolean;
}> = ({ id, title, price, image, description, mode, isGridView }) => {
  const containerStyle = isGridView ? styles.gridContainer : styles.listContainer;
  const imageStyle = isGridView ? styles.gridImage : styles.listImage;
  const navigation = useNavigation<NavigationProp>();
  const handlePress = () => {
    navigation.navigate('Details', { 
      product: { id, title, price, image, description, mode }
    });
  };
  console.log({ id, title, price, image, description, mode })
  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
        <Image source={{ uri: image }} style={imageStyle} />
        <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
            </Text>
            <Text style={styles.price}>Price: {price.toFixed(0)} Coins</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    margin: 8,
    padding: 10,
  },
  gridContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  gridImage: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
  },
});

export default ProductItem;
