import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ProductItem from './ProductItem';

const GridView: React.FC<{ products: any[] }> = ({ products }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          {...item} isGridView={true}
         />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
});

export default GridView;