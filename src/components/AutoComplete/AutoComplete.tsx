import React, { useContext } from 'react';
import { DataInputContext } from 'src/contexts';
import Input from '../Input';

const AutoComplete = () => {
  const { inputValue } = useContext(DataInputContext);

  return (
    <div>
      <Input />
      <br />
      <h3>Valor do inpdut: </h3>
      {inputValue}
    </div>
  );
};

export default AutoComplete;
