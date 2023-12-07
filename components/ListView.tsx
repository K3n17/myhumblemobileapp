import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

const ListView: React.FC<{ products: any[] }> = ({ products }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem {...item } isGridView={false} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});

export default ListView;
