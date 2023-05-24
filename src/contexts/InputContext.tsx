import React, { createContext, useState, ReactNode } from 'react';

// Defina a estrutura do contexto
interface LayoutProps {
  children: ReactNode;
}

interface DataInputContextProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

// Crie o contexto
export const DataInputContext = createContext<DataInputContextProps>({
  inputValue: '',
  setInputValue: () => {},
});

// Crie o provedor do contexto
export const DataInputProvider = ({ children }: LayoutProps) => {
  const [inputValue, setInputValue] = useState('');

  // Atualiza o valor do input
  const handleSetInputValue = (value: string) => {
    setInputValue(value);
  };

  // Passa o estado e as funções relacionadas ao contexto
  const contextValue: DataInputContextProps = {
    inputValue,
    setInputValue: handleSetInputValue,
  };

  return (
    <DataInputContext.Provider value={contextValue}>
      {children}
    </DataInputContext.Provider>
  );
};
