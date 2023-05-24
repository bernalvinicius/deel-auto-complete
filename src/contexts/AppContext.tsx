import React, { createContext, useState } from 'react';
import { DataProps, LayoutProps } from 'src/types';

// Context Creation
export const DataContext = createContext<DataProps>({
  inputValue: '',
  setInputValue: () => {},
});

// Creating the Context Provider
export const DataPropsProvider = ({ children }: LayoutProps) => {
  const [inputValue, setInputValue] = useState('');

  // Update input value
  const handleSetInputValue = (value: string) => {
    setInputValue(value);
  };

  // Passing state and context-related functions
  const contextValue: DataProps = {
    inputValue,
    setInputValue: handleSetInputValue,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
