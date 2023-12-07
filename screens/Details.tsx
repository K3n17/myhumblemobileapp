import React, { useState } from 'react';
import { Modal, View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useCurrency } from '../CurrencyContext';
import { useSelector, useDispatch } from 'react-redux';
type ProductDetails = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    description: string;
    mode: string;
  };
type AppState = {
    inventory: ProductDetails[];
};
type DetailsScreenRouteProp = {
    params: {
        product: ProductDetails;
    };
};

const DetailsScreen: React.FC<{ route: RouteProp<DetailsScreenRouteProp, 'params'> }> = ({ route }) => {
  const { product } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { coins, addCoins, subtractCoins } = useCurrency();
  const inventory = useSelector((state: AppState) => state.inventory);
  const dispatch = useDispatch();

  const addProduct = (product: ProductDetails) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const removeProduct = (productId: number) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
  };

  const handleBuySell = (isBuy: boolean) => {
    if (isBuy) {
      if (coins >= product.price) {
        subtractCoins(product.price);
        addProduct(product);
        Alert.alert(`Successful`, `${product.title} was bought successfully\nYour current balance is ${(coins - product.price).toFixed(0)}`);
      } else {
        Alert.alert(`Transaction Failed`, `Not enough coins to buy ${product.title}\nYour current balance is ${coins}`);
      }
    } else {
      const productInInventory = inventory.inventory.find(item => item.id === product.id);
      if (!productInInventory || productInInventory.quantity === 0) {
        Alert.alert("Cannot Sell", `You do not have any ${product.title} to sell.`);
        return;
      }
      addCoins(product.price);
      removeProduct(product.id);
      Alert.alert(`Successful`, `${product.title} was sold successfully\nYour current balance is ${(coins + product.price).toFixed(0)}`);
    }
  };

  const renderSection = (actionLabel: string) => (
    <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={openModal}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
        </TouchableOpacity>
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
            >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={closeModal}>
                <Image source={{ uri: product.image }} style={styles.fullSizeImage} />
            </TouchableOpacity>
        </Modal>
        <View style={styles.productInfo}>
            <View style={styles.divider} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.productPrice}>{product.price.toFixed(0)} Coins</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        <TouchableOpacity style={[styles.actionButton, actionLabel === 'Buy' ? styles.buyButton : styles.sellButton]} onPress={() => handleBuySell(actionLabel === 'Buy')}>
            <Text style={[styles.buttonText, actionLabel === 'Buy' ? {color: 'white'} : {color: 'purple'}]}>{actionLabel}</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
      {renderSection(product.mode)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  sectionContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10
  },
  productInfo: {
    marginTop: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  priceLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5
  },
  productDescription: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10
  },
  actionButton: {
    borderRadius: 5,
    padding: 10,
    position: 'absolute', 
    bottom: 20,           
    left: 0,              
    right: 0,             
    alignItems: 'center',
    justifyContent: 'center' 
  },
  buyButton: {
    backgroundColor: '#800080'
  },
  sellButton: {
    backgroundColor: '#A9A9A9'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default DetailsScreen;