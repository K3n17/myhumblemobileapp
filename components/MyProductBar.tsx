import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyProducts'>;

const MyProductsBar: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

  const navigateToMyProducts = () => {
    navigation.navigate('MyProducts');
  };

  return (
    <TouchableOpacity onPress={navigateToMyProducts} style={styles.container}>
      <Text style={styles.text}>My Products &gt;</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: 'flex-start',
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: '#5D3FD3',
    fontWeight: 'bold',
  },
});

export default MyProductsBar;
