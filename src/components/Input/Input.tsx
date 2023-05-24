import React, { useContext } from 'react';
import { DataContext } from 'src/contexts';

const Input = () => {
  const { setInputValue } = useContext(DataContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return <input type="text" onChange={handleInputChange} />;
};

export default Input;
