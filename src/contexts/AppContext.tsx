import React, { createContext, useState } from 'react';
import { DataProps, LayoutProps } from 'src/types';

// Crie o contexto
export const DataContext = createContext<DataProps>({
  inputValue: '',
  setInputValue: () => {},
});

// Crie o provedor do contexto
export const DataPropsProvider = ({ children }: LayoutProps) => {
  const [inputValue, setInputValue] = useState('');

  // Atualiza o valor do input
  const handleSetInputValue = (value: string) => {
    setInputValue(value);
  };

  // Passa o estado e as funções relacionadas ao contexto
  const contextValue: DataProps = {
    inputValue,
    setInputValue: handleSetInputValue,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
