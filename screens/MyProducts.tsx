import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ListView from '../components/ListView';

type ProductDetails = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
};
type AppState = {
  inventory: ProductDetails[];
};

const MyProductsScreen: React.FC = () => {
  const inventory = useSelector((state: AppState) => state.inventory);
  console.log('Inventory:', inventory);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
      </View>
      <ListView products={inventory.inventory.map(item => ({ ...item, mode: 'Sell' }))} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  headerTitle: {
    textAlign: 'center',
  }
});

export default MyProductsScreen;
