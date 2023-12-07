import React, { createContext, useState, useContext, ReactNode } from 'react';

type CurrencyContextType = {
  coins: number;
  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => void;
};

const CurrencyContext = createContext<CurrencyContextType>({
  coins: 500,
  addCoins: () => {},
  subtractCoins: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(500);

  const addCoins = (amount: number) => setCoins(prevCoins => Math.round(prevCoins + amount));
  const subtractCoins = (amount: number) => setCoins(prevCoins => Math.round(prevCoins - amount));

  return (
    <CurrencyContext.Provider value={{ coins, addCoins, subtractCoins }}>
      {children}
    </CurrencyContext.Provider>
  );
};
