import React, { useContext } from 'react';
import { DataContext } from 'src/contexts';
import './index.css';

const Input = () => {
  const { setInputValue } = useContext(DataContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div className="content-input">
      <input type="text" placeholder="Search Country..." onChange={handleInputChange} />
    </div>
  );
};

export default Input;
