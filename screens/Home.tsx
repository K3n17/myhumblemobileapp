import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';
import SearchBar from '../components/SearchBar';
import MyProductBar from '../components/MyProductBar';
import CurrencyDisplay from '../components/CurrencyDisplay';
import ActionEgg from '../components/ActionEgg';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import GridViewIcon from '../assets/GridViewIcon';
import ListViewIcon from '../assets/ListViewIcon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MiniGame'>;

const HomeScreen: React.FC = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => fetchProducts(searchQuery),
    enabled: true, 
  });

  const toggleView = () => {
    setIsGridView((prevIsGridView) => !prevIsGridView);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }
  const navigateToMiniGame = () => {
    navigation.navigate('MiniGame');
  };

  return (
    <View style={styles.container}>
        <SearchBar onSearch={(query) => {
                        setSearchQuery(query);
                        refetch();
                    }} />
        <View style={styles.linksContainer}>
            <MyProductBar />
            <CurrencyDisplay />
        </View>
        <View style={styles.linksContainer}>
            <Text style={styles.availableProductsTitle}>Available Products</Text>
            <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
                {isGridView ? <ListViewIcon /> : <GridViewIcon />}
            </TouchableOpacity>
        </View>
        {products && isGridView ? (
            <GridView products={products.map(item => ({ ...item, mode: 'Buy' }))} />
        ) : (
            <ListView products={products ? products.map(item => ({ ...item, mode: 'Buy' })) : []} />
        )
        }
        <ActionEgg onPress={navigateToMiniGame} />
    </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  availableProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 16
  }  
});

export default HomeScreen;