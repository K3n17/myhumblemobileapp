import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProvider } from './CurrencyContext';
import { RootStackParamList } from './navigationTypes';
import HomeScreen from './screens/Home';
import MyProductsScreen from './screens/MyProducts';
import DetailsScreen from './screens/Details';
import MinigameScreen from './MiniGame/screens/MiniGame';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/*<InventoryProvider>*/}
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="MyProducts" component={MyProductsScreen} />
                  <Stack.Screen name="Details" component={DetailsScreen} />
                  <Stack.Screen name="MiniGame" component={MinigameScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            {/* </InventoryProvider> */}
            </PersistGate>
          </Provider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
};

export default App;
