import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCurrency } from '../CurrencyContext';
const CurrencyDisplay: React.FC = () => {
  const { coins } = useCurrency();

  return (
    <View style={styles.container}>
      <Text style={styles.currencyText}>{coins}</Text>
      <Text style={styles.myCoinsText}>My coins</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 16,
    color: '#5D3FD3',
    fontWeight: 'bold',
    marginRight: 4,
  },
  myCoinsText: {
    fontSize: 16,
  },
});

export default CurrencyDisplay;
