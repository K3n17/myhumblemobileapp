import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { useCurrency } from '../../CurrencyContext';

const MinigameScreen = () => {
    const [gamePlayed, setGamePlayed] = useState(false);
    const [rewardType, setRewardType] = useState('');
    const [isEggCracked, setIsEggCracked] = useState(false);
    const eggShakeAnimation = useState(new Animated.Value(0))[0];
    const [coinScaleAnimation] = useState(new Animated.Value(1));
    const [coinMoveAnimation] = useState(new Animated.Value(0));
    const { addCoins } = useCurrency();
  
    useEffect(() => {
        if (gamePlayed && !isEggCracked) {
          setTimeout(() => {
            setIsEggCracked(true);
            Animated.parallel([
              Animated.timing(coinScaleAnimation, {
                toValue: 1.5,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(coinMoveAnimation, {
                toValue: -50,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]).start();
          }, 1000);
        }
      }, [gamePlayed, isEggCracked]);
  
    const crackEgg = () => {
      const rewards = ['gold', 'silver', 'bronze'];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setRewardType(randomReward);
      const rewardAmount = randomReward === 'gold' ? 100 : randomReward === 'silver' ? 50 : 20;
  
      Animated.sequence([
        Animated.timing(eggShakeAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(eggShakeAnimation, { toValue: -1, duration: 100, useNativeDriver: true }),
        Animated.timing(eggShakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start(() => {
        setGamePlayed(true);
        addCoins(rewardAmount);
        Alert.alert("Congratulations!", `You got a ${randomReward} coin! ${rewardAmount} coins have been added to your balance.`);
      });
    };
    const coinStyle = {
        transform: [
          { translateY: coinMoveAnimation },
          { scale: coinScaleAnimation },
        ],
        opacity: coinScaleAnimation.interpolate({
          inputRange: [1, 1.5],
          outputRange: [0, 1],
        }),
      };
      
    const eggStyle = {
      transform: [
        { translateX: eggShakeAnimation.interpolate({
            inputRange: [-1, 1],
            outputRange: [-5, 5]
          }) 
        }
      ],
    };

    const coinImages = {
        gold: require('../../assets/gold-coin.png'),
        silver: require('../../assets/silver-coin.png'),
        bronze: require('../../assets/bronze-coin.png'),
      };
    return (
      <View style={styles.container}>
        <View style={styles.coinDisplay}>
          <View style={styles.coinItem}>
              <Image source={coinImages['gold']} style={styles.coinLayout} />
              <Text style={styles.coinText}>100</Text>
          </View>
          <View style={styles.coinItem}>
              <Image source={coinImages['silver']} style={styles.coinLayout} />
              <Text style={styles.coinText}>50</Text>
          </View>
          <View style={styles.coinItem}>
              <Image source={coinImages['bronze']} style={styles.coinLayout} />
              <Text style={styles.coinText}>20</Text>
          </View>
      </View>
        {!gamePlayed ? (
          <View style={styles.gameContainer}>
            <TouchableOpacity onPress={crackEgg}>
              <Animated.Image source={require('../../assets/egg-full.png')} style={[styles.eggImage, eggStyle]} />
            </TouchableOpacity>
            <Text style={styles.instructionText}>Click on the egg to get your prize!</Text>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.congratulationsText}>Congratulations! You got a {rewardType} coin!</Text>
            <Image source={isEggCracked ? require('../../assets/egg-broken.png') : require('../../assets/egg-full.png')} style={styles.eggImage} />
            {isEggCracked && (
              <Animated.Image
                source={coinImages[rewardType]}
                style={[styles.coinImage, coinStyle]}
              />
            )}
            <Text style={styles.rewardText}>{rewardType === 'gold' ? 100 : rewardType === 'silver' ? 50 : 20} coins have been added to your balance</Text>
          </View>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },
  coinDisplay: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:50
  },
  coinItem: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5
  },
  coinLayout: {
      height: '100%',
      width: '22%'
  },
  coinText: {
      marginLeft: 1
  },
  coinImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: -100
  },
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  eggImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  instructionText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  rewardText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  congratulationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
})

export default MinigameScreen;
