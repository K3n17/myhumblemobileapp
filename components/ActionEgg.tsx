import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

interface ActionEggProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<ActionEggProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Image source={require('../assets/egg-full.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  icon: {
    width: '50%',
    height: '70%',
  }
});

export default FloatingActionButton;
